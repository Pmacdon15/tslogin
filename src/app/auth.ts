
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import Database from './db.ts';

class Auth {
  async login(request: NextRequest) {
    try {
      const requestBody = await request.json(); // Get the request body
      const { email, password } = requestBody; // Extract email and password from the request body

      const db = new Database();
      const result = await db.query('SELECT * FROM tsloginUsers WHERE email = $1 AND password = $2', [email, password]);

      if (result.length === 0) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }); // Use NextResponse.json() to set the status code and response body
      } else {
        // Set up Token
        const user = { username: email };
        const token = jwt.sign(user, process.env.SECRET_KEY_JWT as string, {
          expiresIn: "1h",
        });      

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
}

export default Auth;