"use server";
import PasswordHasher from "./hasher.ts";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Database from "./db.ts";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  let userSignedUp = false;
  let email = "";
  try {
    email = formData.get("email") as string;
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const password = formData.get("password") as string;

    const passwordHasher = new PasswordHasher();
    const hashedPassword = await passwordHasher.hash(password);
    const db = new Database();

    if (await db.register(email, first_name, last_name, hashedPassword))
      userSignedUp = true;
  } catch (error) {
    console.error("Error registering user: ", error);
  }
  if (userSignedUp) {
    applyCookie(email);
    redirect(`/dashboard/${email}`);
    return;
  }
}

export async function login(formData: FormData) {
  let userAuthed = false;
  let email: string = "";
  try {
    email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const db = new Database();
    const hash = await db.getHashedPassword(email);
    const passwordHasher = new PasswordHasher();
    if (await passwordHasher.verify(password, hash)) userAuthed = true;
  } catch (error) {
    console.error("Error logging in user: ", error);
  }

  if (userAuthed) {
    applyCookie(email);
    redirect(`/dashboard/${email}`);
  }
}

export async function verifyToken(email: string) {
  try {
    const token = cookies().get("AuthCookieTracking")?.value; // Access the cookie value as a string
    if (!token) {
      return false;
    }
    const user = jwt.verify(token, process.env.SECRET_KEY_JWT as string) as {
      username: string;
    };
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
