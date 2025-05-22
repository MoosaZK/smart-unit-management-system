"use client";

import React from "react";
import projectsData from "@/data/projectsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  FileText,
  ArrowLeft,
  Tag,
  DollarSign,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function ProjectDetail() {
  const params = useParams();

  // Find the project with the given ID
  const project = projectsData.find((p) => p.id === params.id);

  // If project not found, show error
  if (!project) {
    return (
      <div className="w-full min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/maintenance/projects">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>

          <Card className="border-red-300">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-700">Project Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The project with ID {params.id} could not be found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

  // Determine status color and text
  const getStatusInfo = (status) => {
    switch (status) {
      case "in-progress":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-300",
          text: "In Progress",
        };
      case "completed":
        return {
          color: "bg-green-100 text-green-800 border-green-300",
          text: "Completed",
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
          text: "Pending Approval",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-300",
          text: status.charAt(0).toUpperCase() + status.slice(1),
        };
    }
  };

  const statusInfo = getStatusInfo(project.status);

  // Determine priority based on budget
  let priority = "Medium";
  if (project.budget > 2000000) {
    priority = "High";
  } else if (project.budget < 500000) {
    priority = "Low";
  }

  const priorityColor =
    priority === "High"
      ? "bg-red-100 text-red-800"
      : priority === "Medium"
      ? "bg-orange-100 text-orange-800"
      : "bg-green-100 text-green-800";

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/maintenance/projects">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          {project.status !== "completed" && (
            <Link href={`/maintenance/projects/${project.id}/manage`}>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Manage Project
              </Button>
            </Link>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
          >
            {statusInfo.text}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColor}`}
          >
            {priority} Priority
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800`}
          >
            {project.type.toUpperCase()}
          </span>
        </div>

        {/* Main Details Card */}
        <Card className="mb-6 border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Description
                </h3>
                <p className="text-gray-800">{project.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Budget
                  </h3>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Rs {project.budget.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Location
                  </h3>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dates and Status Card */}
        <Card className="mb-6 border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Start Date
                  </h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{formatDate(project.startDate)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Due Date
                  </h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{formatDate(project.endDate)}</span>
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
                    <span>{formatDate(project.submissionDate)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Sponsor Officer
                  </h3>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{project.sponsorOfficer}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remarks Card */}
        <Card className="border-2 border-gray-200 mt-6">
          <CardHeader>
            <CardTitle>Official Remarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* CO Remarks */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Commanding Officer Remarks
                </h3>
                {project.remarks?.co ? (
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <p className="text-blue-800">{project.remarks.co}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-500 italic">No remarks provided</p>
                  </div>
                )}
              </div>

              {/* EXO Remarks */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Executive Officer Remarks
                </h3>
                {project.remarks?.exo ? (
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <p className="text-green-800">{project.remarks.exo}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-500 italic">No remarks provided</p>
                  </div>
                )}
              </div>

              {/* Sponsor Officer Remarks */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Sponsor Officer Remarks
                </h3>
                {project.remarks?.sponsorOfficer ? (
                  <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                    <p className="text-purple-800">
                      {project.remarks.sponsorOfficer}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-500 italic">No remarks provided</p>
                  </div>
                )}
              </div>
            </div>

            {project.status !== "completed" && (
              <div className="mt-6">
                <Link
                  href={`/maintenance/projects/${project.id}/update-remarks`}
                >
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    Update Remarks
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
