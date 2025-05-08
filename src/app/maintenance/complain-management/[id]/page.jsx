"use client";

import React from "react";
import {
  sampleComplaints,
  complaintCategories,
  complaintSubcategories,
  complaintStatus,
} from "@/data/complaints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  FileText,
  Info,
  ArrowLeft,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function ComplaintDetail() {
  const params = useParams();

  // Find the complaint with the given ID
  const complaint = sampleComplaints.find((c) => c.id === params.id);

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

  // Get category and subcategory names
  const category =
    complaintCategories.find((c) => c.id === complaint.category)?.name ||
    "Unknown";
  const subcategory =
    complaintSubcategories[complaint.category]?.find(
      (s) => s.id === complaint.subcategory
    )?.name || "Unknown";

  // Find status
  const status =
    complaintStatus.find((s) => s.id === complaint.status) ||
    complaintStatus[0];

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/maintenance/complain-management">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaints
          </Button>
        </Link>

        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{complaint.title}</h1>
          {complaint.status !== "resolved" &&
            complaint.status !== "rejected" && (
              <Link
                href={`/maintenance/complain-management/${complaint.id}/update`}
              >
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Update Status
                </Button>
              </Link>
            )}
        </div>

        <div className="flex gap-2 mb-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
          >
            {status.name}
          </span>
          {complaint.priority === "high" && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              High Priority
            </span>
          )}
          {complaint.priority === "medium" && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              Medium Priority
            </span>
          )}
          {complaint.priority === "low" && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Low Priority
            </span>
          )}
        </div>

        {/* Main Details Card */}
        <Card className="mb-6 border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Complaint Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Description
                </h3>
                <p className="text-gray-800">{complaint.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Category
                  </h3>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-blue-500" />
                    <span>
                      {category} &gt; {subcategory}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Location
                  </h3>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{complaint.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status and Assignment Card */}
        <Card className="mb-6 border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Status Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Submitted By
                  </h3>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{complaint.submittedBy}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Assigned To
                  </h3>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{complaint.assignedTo || "Unassigned"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Submission Date
                  </h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{formatDate(complaint.submittedDate)}</span>
                  </div>
                </div>

                {complaint.dueDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Due Date
                    </h3>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{formatDate(complaint.dueDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates Card */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Updates</CardTitle>
          </CardHeader>
          <CardContent>
            {complaint.updates.length === 0 ? (
              <p className="text-gray-500 italic">No updates yet.</p>
            ) : (
              <div className="space-y-4">
                {complaint.updates.map((update, index) => (
                  <div key={update.id} className="relative pl-6 pb-4">
                    {index < complaint.updates.length - 1 && (
                      <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gray-200" />
                    )}
                    <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-blue-100 border-2 border-blue-500" />
                    <div className="mb-1">
                      <span className="font-medium">{update.by}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {formatDate(update.date)}
                      </span>
                    </div>
                    <p>{update.text}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
