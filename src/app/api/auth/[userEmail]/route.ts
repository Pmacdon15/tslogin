import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import Auth from '../../../auth'; 

type Prop = {
  params: {
    userEmail: string;
  };
};



export async function GET(request: NextRequest, props: Prop) {
  try {
    const auth = new Auth(); // Create an instance of the Auth class
    // Pass the props to the verifyToken method
    const userEmail = await auth.verifyToken(request, props);

    if (userEmail) {
      return NextResponse.json({ userEmail, status: 200 });
    }
    throw new Error("User not authenticated");
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error: " + error,
      status: 500,
    });
  }
}