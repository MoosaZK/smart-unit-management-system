import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfAdmission: { type: Date, required: true },
    illness: { type: String, required: true },
    remarks: { type: String },
    visits: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema); 