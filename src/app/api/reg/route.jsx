import { NextResponse } from "next/server";
import db from "@/db/db";
import { UserSc } from "@/db/schema";
import bcrypt from "bcryptjs"; // ya "bcrypt" agar tumne wahi install kiya ho
import { like } from "@/db/schema";


// utils/generateRandomString.js
 function generateRandomString(length = 12) {
  if (typeof window === 'undefined' || !window.crypto) {
    // Fallback in case running on server (like during SSR)
    return Math.random().toString(36).substring(2, 2 + length);
  }

  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  return Array.from(array, (byte) => charset[byte % charset.length]).join('');
}


// Registration API
export async function POST(request) {
  db();
  const { email, phone, password } = await request.json(); // Request se data le rahe hain
console.log(email,phone,password);

  // Validation check
  if (!password || (!email && !phone)) {
    return NextResponse.json({ error: "Missing required fields",message:"Missing required fields" }, { status: 400 });
  }
// return NextResponse.json({as:"as"})
  // Check if user already exists
  const userExists = email? await UserSc.findOne({email}) : await UserSc.findOne({phone});
  if (userExists) {
    console.log(userExists);
    
    return NextResponse.json({user: userExists ,message:"please login , user already exiest"},{status:401});
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await UserSc.create({ email:email?email:phone, phone:phone?phone:generateRandomString(16), password: hashedPassword });
  let a = await new like({
    email:email?email:phone,
    img:"logind.png"
   }) 
  let b = await a.save();   // post
  return NextResponse.json({ message: "User created, please login", user: { email: user.email, phone: user.phone } },{status:201});
}
 