"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { complaintStatus } from "@/data/complaints";
import { Calendar, MapPin, User } from "lucide-react";
import Link from "next/link";

/**
 * Complaint Card Component
 * Used to display complaint items in a card format
 */
export function ComplaintCard({ complaint }) {
  // Find the status object to get the color
  const status =
    complaintStatus.find((s) => s.id === complaint.status) ||
    complaintStatus[0];

  // Format date to readable format
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
    <Card className="hover:shadow-lg transition-shadow border-2 border-gray-200 overflow-hidden">
      <CardHeader className="pb-2 p-4 flex flex-row justify-between items-center">
        <div className="flex items-start gap-1 flex-col">
          <div className="flex gap-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}
            >
              {status.name}
            </span>
            {complaint.priority === "high" && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800 border-red-300">
                High Priority
              </span>
            )}
            {complaint.priority === "medium" && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-800 border-orange-300">
                Medium Priority
              </span>
            )}
          </div>
          <CardTitle className="text-base mt-1">{complaint.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-4">
        <div className="text-sm text-gray-600 mb-3 line-clamp-2">
          {complaint.description}
        </div>

        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{complaint.assignedTo || "Unassigned"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              Submitted: {formatDate(complaint.submittedDate)}
              {complaint.dueDate && ` | Due: ${formatDate(complaint.dueDate)}`}
            </span>
          </div>
          {complaint.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{complaint.location}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/maintenance/complain-management/${complaint.id}`}
            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
          >
            View Details
          </Link>
          {complaint.status !== "resolved" &&
            complaint.status !== "rejected" && (
              <Link
                href={`/maintenance/complain-management/${complaint.id}/update`}
                className="text-green-600 hover:text-green-800 text-xs font-medium"
              >
                Update Status
              </Link>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
