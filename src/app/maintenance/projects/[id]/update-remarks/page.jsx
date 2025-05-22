"use client";

import React, { useState } from "react";
import projectsData from "@/data/projectsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export default function UpdateProjectRemarks() {
  const params = useParams();
  const router = useRouter();

  // Find the project with the given ID
  const project = projectsData.find((p) => p.id === params.id);

  const [formData, setFormData] = useState({
    coRemarks: project?.remarks?.co || "",
    exoRemarks: project?.remarks?.exo || "",
    sponsorOfficerRemarks: project?.remarks?.sponsorOfficer || "",
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
                be made to the remarks.
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
      // In a real app, you would update the project remarks in your database
      console.log("Project remarks updated:", {
        id: project.id,
        co: formData.coRemarks,
        exo: formData.exoRemarks,
        sponsorOfficer: formData.sponsorOfficerRemarks,
      });

      setIsSubmitting(false);
      router.push(`/maintenance/projects/${project.id}`);
    }, 1000);
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

        <h1 className="text-3xl font-bold mb-8">Update Official Remarks</h1>

        <Card>
          <CardHeader>
            <CardTitle>Update Remarks for: {project.title}</CardTitle>
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
                    router.push(`/maintenance/projects/${project.id}`)
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
