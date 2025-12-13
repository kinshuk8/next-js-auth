import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    if (!requestBody.email || !requestBody.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const { email, password } = requestBody;
    console.log(request.body);

    // if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 },
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
