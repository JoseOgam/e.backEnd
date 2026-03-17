import { connect } from "@/dbConfig/mongodb";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //  let check if user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        error: "user already exist",
        status: 400,
      });
    }

    //   hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verifyToken = crypto.randomBytes(32).toString("hex");

    // save user to database

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hrs
    });

    const saveUser = await newUser.save();

    return NextResponse.json({
      message: "user created successfully",
      success: true,
      saveUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
