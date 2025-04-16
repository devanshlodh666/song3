import { NextResponse } from "next/server";
import db from "@/db/db";
import { UserSc } from "@/db/schema";
import bcrypt from "bcryptjs"; // ya "bcrypt" agar tumne wahi install kiya ho
// 


// Login API
export async function POST(request) {
  db();
  const { email, phone, password } = await request.json(); // Request se data le rahe hain

  // Find user by email or phone
  const user = await UserSc.findOne({ $or: [{ email }, { phone }] });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return NextResponse.json({ message: "Login successful",  user: { email: user.email, phone: user.phone } },{status:200});
}
