"use client";

import React, { useState } from "react";
import { sampleComplaints, complaintStatus } from "@/data/complaints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export default function UpdateComplaint() {
  const params = useParams();
  const router = useRouter();

  // Find the complaint with the given ID
  const complaint = sampleComplaints.find((c) => c.id === params.id);

  const [formData, setFormData] = useState({
    status: complaint?.status || "pending",
    assignedTo: complaint?.assignedTo || "",
    updateText: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // If complaint not found, show error
  if (!complaint) {
    return (
      <div className="w-full min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/maintenance/complain-management">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Complaints
            </Button>
          </Link>

          <Card className="border-red-300">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-700">
                Complaint Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>The complaint with ID {params.id} could not be found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Cannot update if already resolved or rejected
  if (complaint.status === "resolved" || complaint.status === "rejected") {
    return (
      <div className="w-full min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Link href={`/maintenance/complain-management/${complaint.id}`}>
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Complaint
            </Button>
          </Link>

          <Card className="border-yellow-300">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-yellow-700">Cannot Update</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This complaint has already been {complaint.status}. No further
                updates can be made.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (!formData.updateText.trim()) {
      newErrors.updateText = "Update text is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // In a real application, you would submit this to an API
      // Here we're simulating an API call with a timeout
      setTimeout(() => {
        // In a real app, you would update the complaint in your database
        console.log("Complaint updated:", {
          id: complaint.id,
          status: formData.status,
          assignedTo: formData.assignedTo,
          updateText: formData.updateText,
        });

        setIsSubmitting(false);
        router.push(`/maintenance/complain-management/${complaint.id}`);
      }, 1000);
    }
  };

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`/maintenance/complain-management/${complaint.id}`}>
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaint
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Update Complaint</h1>

        <Card>
          <CardHeader>
            <CardTitle>Update Status for: {complaint.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status */}
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className={`w-full p-2 border rounded-md ${
                    errors.status ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.status}
                  onChange={handleChange}
                >
                  {complaintStatus.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.status}
                  </p>
                )}
              </div>

              {/* Assigned To */}
              <div className="space-y-2">
                <label
                  htmlFor="assignedTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Assigned To
                </label>
                <input
                  type="text"
                  id="assignedTo"
                  name="assignedTo"
                  placeholder="Name of person assigned to this complaint"
                  className="w-full p-2 border rounded-md border-gray-300"
                  value={formData.assignedTo}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  Leave blank if not assigned to anyone
                </p>
              </div>

              {/* Update Text */}
              <div className="space-y-2">
                <label
                  htmlFor="updateText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update
                </label>
                <textarea
                  id="updateText"
                  name="updateText"
                  rows={4}
                  placeholder="Provide details about this status update"
                  className={`w-full p-2 border rounded-md ${
                    errors.updateText ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.updateText}
                  onChange={handleChange}
                />
                {errors.updateText && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.updateText}
                  </p>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    router.push(
                      `/maintenance/complain-management/${complaint.id}`
                    )
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Complaint"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
