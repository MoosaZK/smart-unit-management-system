import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MedicineIssue from "@/models/MedicineIssue";

export async function GET(_request, { params }) {
  await dbConnect();
  const record = await MedicineIssue.findById(params.id);
  if (!record) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(record);
}

export async function PUT(request, { params }) {
  await dbConnect();
  const updates = await request.json();
  const record = await MedicineIssue.findByIdAndUpdate(params.id, updates, { new: true });
  if (!record) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(record);
}

export async function DELETE(_request, { params }) {
  await dbConnect();
  const record = await MedicineIssue.findByIdAndDelete(params.id);
  if (!record) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
} 