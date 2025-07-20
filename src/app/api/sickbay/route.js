import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SickbayAdmission from "@/models/SickbayAdmission";

export async function GET() {
  await dbConnect();
  const admissions = await SickbayAdmission.find().sort({ createdAt: -1 });
  return NextResponse.json(admissions);
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const admission = await SickbayAdmission.create(data);
  return NextResponse.json(admission, { status: 201 });
} 