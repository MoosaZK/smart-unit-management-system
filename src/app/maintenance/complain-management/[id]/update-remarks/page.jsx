"use client";

import React, { useState } from "react";
import { sampleComplaints } from "@/data/complaints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export default function UpdateRemarks() {
  const params = useParams();
  const router = useRouter();

  // Find the complaint with the given ID
  const complaint = sampleComplaints.find((c) => c.id === params.id);

  const [formData, setFormData] = useState({
    coRemarks: complaint?.remarks?.co || "",
    exoRemarks: complaint?.remarks?.exo || "",
    sponsorOfficerRemarks: complaint?.remarks?.sponsorOfficer || "",
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real application, you would submit this to an API
    // Here we're simulating an API call with a timeout
    setTimeout(() => {
      // In a real app, you would update the complaint in your database
      console.log("Remarks updated:", {
        id: complaint.id,
        co: formData.coRemarks,
        exo: formData.exoRemarks,
        sponsorOfficer: formData.sponsorOfficerRemarks,
      });

      setIsSubmitting(false);
      router.push(`/maintenance/complain-management/${complaint.id}`);
    }, 1000);
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

        <h1 className="text-3xl font-bold mb-8">Update Official Remarks</h1>

        <Card>
          <CardHeader>
            <CardTitle>Update Remarks for: {complaint.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CO Remarks */}
              <div className="space-y-2">
                <label
                  htmlFor="coRemarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Commanding Officer Remarks
                </label>
                <textarea
                  id="coRemarks"
                  name="coRemarks"
                  rows={3}
                  placeholder="Enter CO remarks..."
                  className="w-full p-2 border rounded-md border-gray-300"
                  value={formData.coRemarks}
                  onChange={handleChange}
                />
              </div>

              {/* EXO Remarks */}
              <div className="space-y-2">
                <label
                  htmlFor="exoRemarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Executive Officer Remarks
                </label>
                <textarea
                  id="exoRemarks"
                  name="exoRemarks"
                  rows={3}
                  placeholder="Enter EXO remarks..."
                  className="w-full p-2 border rounded-md border-gray-300"
                  value={formData.exoRemarks}
                  onChange={handleChange}
                />
              </div>

              {/* Sponsor Officer Remarks */}
              <div className="space-y-2">
                <label
                  htmlFor="sponsorOfficerRemarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sponsor Officer Remarks
                </label>
                <textarea
                  id="sponsorOfficerRemarks"
                  name="sponsorOfficerRemarks"
                  rows={3}
                  placeholder="Enter Sponsor Officer remarks..."
                  className="w-full p-2 border rounded-md border-gray-300"
                  value={formData.sponsorOfficerRemarks}
                  onChange={handleChange}
                />
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
                  className="bg-purple-500 hover:bg-purple-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Remarks"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
