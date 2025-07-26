import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Patient from "@/models/Patient";

// GET /api/patients - list all patients
export async function GET() {
  await dbConnect();
  const patients = await Patient.find().sort({ createdAt: -1 });
  return NextResponse.json(patients);
}

// POST /api/patients - create a new patient record
export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const patient = await Patient.create(data);
  return NextResponse.json(patient, { status: 201 });
} 