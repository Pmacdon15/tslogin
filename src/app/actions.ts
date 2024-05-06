"use server";

import PasswordHasher from "./hasher.ts";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Database from "./db.ts";
import { sql } from "@vercel/postgres";

export async function signUp(
  email: string,
  first_name: string,
  last_name: string,
  password: string
) {
  const passwordHasher = new PasswordHasher();
  const hashedPassword = await passwordHasher.hash(password);
  const db = new Database();
  return db.register(email, first_name, last_name, hashedPassword);
}

export async function login(email: string, password: string) {
  try {
    if (await verifyPassword(email, password)) {
      await applyCookie(email);
      return true;
    }
    throw new Error("Invalid credentials");
  } catch (error) {
    console.error("Error logging in user: ", error);
    return false;
  }
}

export async function verifyToken(email: string) {
  try {
    const token = cookies().get("AuthCookieTracking")?.value; // Access the cookie value as a string
    if (!token) {
      return false;
    }
    const user = jwt.verify(token, process.env.SECRET_KEY_JWT as string)as { username: string }
    console.log("User: ", user);
    return user.username === email;
  } catch (error) {
    console.error("Error verifying token: ", error);
    return false;
  }
}

// Helper functions
async function verifyPassword(email: string, password: string) {
  try {    
    const db = new Database();
    const hash = await db.getHashedPassword(email); 

    const passwordHasher = new PasswordHasher();
    return await passwordHasher.verify(password, hash);
  } catch (error) {
    console.error("Error verifying password: ", error);
    return false;
  }
}
async function applyCookie(email: string) {
  try {
    const user = { username: email };
    const token = jwt.sign(user, process.env.SECRET_KEY_JWT as string, {
      expiresIn: "1h",
    });
    cookies().set({
      name: "AuthCookieTracking",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 3600,
      sameSite: "strict",
    });
  } catch (error) {
    console.error("Error applying cookie: ", error);
  }
}

