"use server";

import { NextRequest, NextResponse } from "next/server";

import { Pool } from "pg";

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432"), // default to 5432 if not provided
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: {
      rejectUnauthorized: true,
    },
  });

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const requestBody = await request.json(); // Get the request body
        const { email, password } = requestBody; // Extract email and password from the request body

        const query = {
            text: 'SELECT * FROM tsloginUsers WHERE email = $1 AND password = $2',
            values: [email, password],
        };

        const result = await pool.query(query);
        if (result.rows.length === 0) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }); // Use NextResponse.json() to set the status code and response body
        } else {
            return NextResponse.json({ message: 'Logged in' }, { status:200}); // Use NextResponse.json() to set the status code and response body
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server. error: ' + error }, { status:500}); // Use NextResponse.json() to set the status code and response body
    }
}