import mongoose from "mongoose";

const SickbayAdmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    time: { type: String, required: true },
    illness: { type: String, required: true },
    remarks: { type: String },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default
  mongoose.models.SickbayAdmission ||
  mongoose.model("SickbayAdmission", SickbayAdmissionSchema); 