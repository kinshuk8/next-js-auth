import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    if (!requestBody.username || !requestBody.email || !requestBody.password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }
    const { username, email, password } = requestBody;

    // if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { errror: "User already exists" },
        { status: 400 },
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("User created successfully", savedUser);
    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
