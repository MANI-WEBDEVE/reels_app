import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import User from "@/Schema/User.Schema";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    console.log({email,password})
    if (!email || !password) {
      return NextResponse.json({
        message: "email and password are rqeuired",
        status: 400,
      });
    }
    const db=await connectDB();

    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    if (existingUser) {
      return NextResponse.json({
        message: "User Already exists",
        status: 301,
      });
    }
    const createdUser = await User.create({
      email,
      password,
    });
    console.log(createdUser)
    return NextResponse.json({
      message: "User Created Successfully",
      status: 200,
      result: createdUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "User Not created Some thing went wrong",
      status: 500,
      error,
    });
  }
};
