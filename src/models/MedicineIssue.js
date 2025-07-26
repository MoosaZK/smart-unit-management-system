import mongoose from "mongoose";

const MedicineIssueSchema = new mongoose.Schema(
  {
    pNo: { type: String, required: true },
    rank: { type: String, required: true },
    name: { type: String, required: true },
    disease: { type: String, required: true },
    medicine: { type: String, required: true },
    issueDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: String },
    status: { type: String, enum: ["active", "completed"], default: "active" },
  },
  { timestamps: true }
);

export default
  mongoose.models.MedicineIssue ||
  mongoose.model("MedicineIssue", MedicineIssueSchema); 