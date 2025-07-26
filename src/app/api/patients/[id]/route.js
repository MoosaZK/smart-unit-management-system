import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Patient from "@/models/Patient";

export async function GET(_request, { params }) {
  await dbConnect();
  const patient = await Patient.findById(params.id);
  if (!patient) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(patient);
}

export async function PUT(request, { params }) {
  await dbConnect();
  const updates = await request.json();
  const patient = await Patient.findByIdAndUpdate(params.id, updates, { new: true });
  if (!patient) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(patient);
}

export async function DELETE(_request, { params }) {
  await dbConnect();
  const patient = await Patient.findByIdAndDelete(params.id);
  if (!patient) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
} 