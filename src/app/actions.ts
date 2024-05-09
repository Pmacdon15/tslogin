"use server";
import PasswordHasher from "./hasher.ts";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Database from "./db.ts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signUp(email: string, first_name: string, last_name: string, password: string, confirm_password: string) {
  let userSignedUp = false;
 
  const passwordHasher = new PasswordHasher();
  const hashedPassword = await passwordHasher.hash(password);
  const db = new Database();
  try {
    if (password !== confirm_password) {
      throw new Error("Passwords do not match");
    }

    if (await db.register(email, first_name, last_name, hashedPassword)) {
      userSignedUp = true;
    } else throw new Error("Database rejected sign up!");
  } catch (error) {
    console.error(
      "Error registering user: ",
      error instanceof Error ? error.message : error
    );
  }
  if (userSignedUp) {
    applyCookie(email);
    //redirect(`/dashboard/${email}`);
    return true;
  }
  return false;
}
export async function login(email: string, password: string) {
  let userAuthed = false;
  //const email = formData.get("email") as string;
  //const password = formData.get("password") as string;
  try {
    if (await verifyPassword(email, password)) {
      userAuthed = true;
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error(
      "Error logging in user: ",
      error instanceof Error ? error.message : error
    );
  }

  if (userAuthed) {
    applyCookie(email);        
    return true;
  } else {
    return false;
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
