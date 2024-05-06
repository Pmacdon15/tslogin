"use server";

import PasswordHasher from "./hasher.ts";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function signUp(
  email: string,
  first_name: string,
  last_name: string,
  password: string
) {
  const passwordHasher = new PasswordHasher();
  try {
    const { rows } = await sql`
      INSERT INTO tsloginUsers (email, first_name, last_name, password) 
      VALUES (${email}, ${first_name}, ${last_name}, ${await passwordHasher.hash(
      password
    )})
    `;
    if (Array.isArray(rows) && rows.length === 0) {
      console.log("User registered");
      console.log(rows);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error registering user: ", error);
    return false;
  }
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
    const passwordHasher = new PasswordHasher();
    const { rows } = await sql`
      SELECT password FROM tsloginUsers WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return false; // User not found
    }

    const hashedPassword = rows[0].password;
    return await passwordHasher.verify(password, hashedPassword);
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

