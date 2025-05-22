"use client";

import React, { useState } from "react";
import projectsData from "@/data/projectsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function ManageProject() {
  const params = useParams();
  const router = useRouter();

  // Find the project with the given ID
  const project = projectsData.find((p) => p.id === params.id);

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    budget: project?.budget || 0,
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    location: project?.location || "",
    status: project?.status || "pending",
    sponsorOfficer: project?.sponsorOfficer || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  // Cannot update if already completed
  if (project.status === "completed") {
    return (
      <div className="w-full min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Link href={`/maintenance/projects/${project.id}`}>
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
          </Link>

          <Card className="border-yellow-300">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-yellow-700">Cannot Update</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This project has already been completed. No further updates can
                be made.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle budget specially to ensure it's a number
    if (name === "budget") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = "Valid budget is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
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
        // In a real app, you would update the project in your database
        console.log("Project updated:", {
          id: project.id,
          ...formData,
        });

        // Update resolution date if status changed to completed
        let resolutionUpdate = {};
        if (formData.status === "completed" && project.status !== "completed") {
          resolutionUpdate = {
            resolutionDate: new Date().toISOString().split("T")[0],
          };
        }

        setIsSubmitting(false);
        router.push(`/maintenance/projects/${project.id}`);
      }, 1000);
    }
  };

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`/maintenance/projects/${project.id}`}>
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Manage Project</h1>

        <Card>
          <CardHeader>
            <CardTitle>Update Details for: {project.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className={`w-full p-2 border rounded-md ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className={`w-full p-2 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.description}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Budget (Rs)
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="1000"
                  className={`w-full p-2 border rounded-md ${
                    errors.budget ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.budget}
                  onChange={handleChange}
                />
                {errors.budget && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.budget}
                  </p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className={`w-full p-2 border rounded-md ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.startDate}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expected Completion Date
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className={`w-full p-2 border rounded-md ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className={`w-full p-2 border rounded-md ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.location}
                  </p>
                )}
              </div>

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
                  <option value="pending">Pending Approval</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.status}
                  </p>
                )}
              </div>

              {/* Sponsor Officer */}
              <div className="space-y-2">
                <label
                  htmlFor="sponsorOfficer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sponsor Officer
                </label>
                <input
                  id="sponsorOfficer"
                  name="sponsorOfficer"
                  type="text"
                  className="w-full p-2 border rounded-md border-gray-300"
                  value={formData.sponsorOfficer}
                  onChange={handleChange}
                />
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    router.push(`/maintenance/projects/${project.id}`)
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
