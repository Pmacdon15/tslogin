const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Prop = {
  params: {
    userEmail: string;
  };
};

export async function GET(request: NextRequest, props: Prop) {
  try {
    const token = cookies().get("AuthCookieTracking")?.value ?? "";
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT) as {
      username: string;
    };

    const userEmail = props.params.userEmail;
    console.log("User Email from api: ", userEmail);

    if (decoded.username === userEmail) {
      return NextResponse.json({ userEmail: decoded.username, status: 200 });
    }
    throw new Error("User not authenticated");
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error: " + error,
      status: 500,
    });
  }
}
