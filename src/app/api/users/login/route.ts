import { connect } from "@/dbConfig/mongodb";
import User from "@/models/userModels";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exist
    const user = await User.findOne({ email });
    if (!user.isVerified) {
      return NextResponse.json({
        error: "please verify your email",
        status: 400,
      });
    }

    //   check if password is correct

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        error: "incorrect password",
        status: 400,
      });
    }

    //   create token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    //   create token

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    //   send success response

    const response = NextResponse.json(
      { message: "login success", success: true },
      { status: 200 }
    );

    // set token cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
