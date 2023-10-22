import db from "@/db/db";
import { NextResponse } from "next/server";
import { like } from "@/db/schema";

export async function GET(request,content) {
    db();
    let email = content.params.findSong;
    let data = await like.findOne({email})
    return NextResponse.json(data)
} 