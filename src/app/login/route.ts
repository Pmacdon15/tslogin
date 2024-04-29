"use server";

import { NextRequest, NextResponse } from "next/server";

import { Pool } from "pg";

import {cookies} from 'next/headers';
import jwt from 'jsonwebtoken';

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

export async function POST(request: NextRequest) {
    try {
        // Get the request body
        const requestBody = await request.json(); // Get the request body
        const { email, password } = requestBody; // Extract email and password from the request body
        
        // Set up Token
        const user = {username: email};
        const token = jwt.sign(user, process.env.SECRET_KEY_JWT  as string, {
            expiresIn: "1h",
        });      

        const query = {
            text: 'SELECT * FROM tsloginUsers WHERE email = $1 AND password = $2',
            values: [email, password],
        };

        const result = await pool.query(query);
        if (result.rows.length === 0) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }); // Use NextResponse.json() to set the status code and response body
        } else {
            // Set the cookie
            cookies().set({
                name: "AuthCookieTracking",
                value: token,
                httpOnly: true,
                path: "/",
                maxAge: 3600,
                sameSite: "strict",
              });
    
              return NextResponse.json({
                message: 'Logged in and cookie set',
                userEmail: email, // add userEmail to the response
                status: 200
              });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error: ' + error }, { status:500}); // Use NextResponse.json() to set the status code and response body
    }
}