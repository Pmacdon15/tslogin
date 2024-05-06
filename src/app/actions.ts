'use server';

import PasswordHasher from "./hasher.ts";
import { sql } from "@vercel/postgres";

export async function signUp(email: string, first_name: string, last_name: string, password: string) {
  const passwordHasher = new PasswordHasher();
  try {
    const { rows } = await sql`
      INSERT INTO tsloginUsers (email, first_name, last_name, password) 
      VALUES (${email}, ${first_name}, ${last_name}, ${await passwordHasher.hash(password)})
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