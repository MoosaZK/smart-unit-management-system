"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Calendar, MapPin, User, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import projectsData from "@/data/projectsData";
import AddProjectForm from "@/components/forms/AddProjectForm";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData);
  const [activeTab, setActiveTab] = useState("minor-projects");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Format currency
  const formatCurrency = (amount) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle adding a new project
  const handleProjectAdded = (newProject) => {
    setProjects([...projects, newProject]);
  };

  // Filter projects based on active tab
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "minor-projects") return project.type === "minor";
    if (activeTab === "major-projects") return project.type === "major";
    if (activeTab === "upcoming-projects") return project.status === "planned";
    return true;
  });

  return (
    <div className="w-full min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Management and Tracking</h1>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => setAddDialogOpen(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <p className="text-gray-600 mb-8">Manage and track all projects</p>

      {/* Add Project Dialog */}
      <AddProjectForm
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onProjectAdded={handleProjectAdded}
      />

      {/* Tabs */}
      <Tabs
        defaultValue="minor-projects"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="minor-projects">Minor Projects</TabsTrigger>
          <TabsTrigger value="major-projects">Major Projects</TabsTrigger>
          <TabsTrigger value="upcoming-projects">Upcoming Projects</TabsTrigger>
        </TabsList>

        {/* All Tabs Content */}
        <TabsContent value="minor-projects">
          <ProjectTable title="Minor Projects" projects={filteredProjects} />
        </TabsContent>
        <TabsContent value="major-projects">
          <ProjectTable title="Major Projects" projects={filteredProjects} />
        </TabsContent>
        <TabsContent value="upcoming-projects">
          <ProjectTable title="Upcoming Projects" projects={filteredProjects} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProjectTable({ title, projects }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-md">
        <p className="text-gray-500">No projects found in this category.</p>
        <p className="text-sm text-gray-400 mt-2">
          Add a new project to get started.
        </p>
      </div>
    );
  }

  // Format status text
  const getStatusText = (status) => {
    switch (status) {
      case "in-progress":
        return "In progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending Approval";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">S No</th>
              <th className="border px-4 py-2 text-left">Project</th>
              <th className="border px-4 py-2 text-left">Priority</th>
              <th className="border px-4 py-2 text-left">Progress</th>
              <th className="border px-4 py-2 text-left">Cost Estimate</th>
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-left">Submission Date</th>
              <th className="border px-4 py-2 text-left">Resolution Date</th>
              <th className="border px-4 py-2 text-left">Sponsor Officer</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => {
              // Determine priority based on budget or status
              let priority = "Medium";
              if (
                project.budget > 2000000 ||
                project.status === "in-progress"
              ) {
                priority = "High";
              } else if (
                project.budget < 500000 ||
                project.status === "completed"
              ) {
                priority = "Low";
              }

              return (
                <tr
                  key={project.id}
                  className="border hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/maintenance/projects/${project.id}`)
                  }
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 font-medium">
                    {project.title}
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        priority === "High"
                          ? "bg-red-100 text-red-800"
                          : priority === "Medium"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {priority}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {getStatusText(project.status)}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    Rs {project.budget.toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {project.type.toUpperCase()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(project.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {project.resolutionDate === "In progress"
                      ? project.resolutionDate
                      : new Date(project.resolutionDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{project.sponsorOfficer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
