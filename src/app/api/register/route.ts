"use server";

import { NextRequest, NextResponse } from "next/server";
import Database from "../../db.ts";
import PasswordHasher from "../../hasher.ts";


export async function POST(request: NextRequest) {  

  try {
    const { email, first_name, last_name, password } = await request.json();
    console.log("email: ", email);
    console.log("first_name: ", first_name);
    console.log("last_name: ", last_name);
    
    const hasher = new PasswordHasher();
    const hashedPassword = await hasher.hash(password);

    const db = new Database();
    await db.register(email, first_name, last_name, hashedPassword);
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 },
      
    );
  } catch (error) {
    console.error("Internal server error: " + error);
    return NextResponse.json(
      { message: "Internal server error: " + error },
      { status: 500 }
    );
  }
}
