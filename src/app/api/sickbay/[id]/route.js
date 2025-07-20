import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SickbayAdmission from "@/models/SickbayAdmission";

export async function GET(_request, { params }) {
  await dbConnect();
  const admission = await SickbayAdmission.findById(params.id);
  if (!admission) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(admission);
}

export async function PUT(request, { params }) {
  await dbConnect();
  const updates = await request.json();
  const admission = await SickbayAdmission.findByIdAndUpdate(params.id, updates, {
    new: true,
  });
  if (!admission) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(admission);
}

export async function DELETE(_request, { params }) {
  await dbConnect();
  const admission = await SickbayAdmission.findByIdAndDelete(params.id);
  if (!admission) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
} 