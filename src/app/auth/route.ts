const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = cookies().get("AuthCookieTracking")?.value ?? "";
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT) as {
      username: string;
    };

    return NextResponse.json({ userEmail: decoded.username });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error: " + error },
      { status: 500 }
    );
  }
}
