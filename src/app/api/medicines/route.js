import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MedicineIssue from "@/models/MedicineIssue";

// GET /api/medicines - list all medicine issue records
export async function GET() {
  await dbConnect();
  const records = await MedicineIssue.find().sort({ createdAt: -1 });
  return NextResponse.json(records);
}

// POST /api/medicines - create a new medicine issue record
export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const record = await MedicineIssue.create(data);
  return NextResponse.json(record, { status: 201 });
} 