"use client";

import React, { useState } from "react";
import { ComplaintForm } from "@/components/complaint-form";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function NewComplaint() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData) => {
    setIsSubmitting(true);

    // In a real application, you would submit this to an API
    // Here we're simulating an API call with a timeout
    setTimeout(() => {
      // Create a new complaint object
      const newComplaint = {
        id: `comp-${uuidv4().substring(0, 8)}`,
        ...formData,
        status: "pending",
        submittedBy: "Lt. Abdurrahman Dar", // This would come from auth
        submittedDate: new Date().toISOString().split("T")[0],
        dueDate: null, // Would be calculated based on priority or set by admin
        images: [],
        updates: [],
      };

      // In a real app, you would add this to your database
      // For now, we'll just redirect back to the complaints page
      console.log("New complaint created:", newComplaint);

      setIsSubmitting(false);
      router.push("/maintenance/complain-management");
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Submit a New Complaint</h1>

      <div className="max-w-4xl mx-auto">
        <ComplaintForm
          onSubmit={handleSubmit}
          initialData={{ priority: "medium" }}
        />
      </div>
    </div>
  );
}
