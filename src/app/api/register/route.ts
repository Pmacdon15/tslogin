"use server";

import { NextRequest, NextResponse } from "next/server";
import Database from "../../db.ts";
import PasswordHasher from "../../hasher.ts";


export async function POST(request: NextRequest) {  

  try {
    const { email, first_name, last_name, password } = await request.json();
    const hasher = new PasswordHasher();
    const hashedPassword = await hasher.hash(password);

    const db = new Database();
    await db.register(email, first_name, last_name, hashedPassword);
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 },
      
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error: " + error },
      { status: 500 }
    );
  }
}
