import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    if (!TOKEN_SECRET) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, TOKEN_SECRET) as JwtPayload;

    return NextResponse.json(
      {
        id: decoded._id,
        username: decoded.username,
        email: decoded.email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
