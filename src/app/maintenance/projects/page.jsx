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
          <ProjectListing title="Minor Projects" projects={filteredProjects} />
        </TabsContent>
        <TabsContent value="major-projects">
          <ProjectListing title="Major Projects" projects={filteredProjects} />
        </TabsContent>
        <TabsContent value="upcoming-projects">
          <ProjectListing
            title="Upcoming Projects"
            projects={filteredProjects}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProjectListing({ title, projects }) {
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "planned":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

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

  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-gray-200 overflow-hidden">
      <CardHeader className="pb-2 p-4">
        <div className="flex items-start gap-2 flex-col">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
              project.status
            )}`}
          >
            {project.status === "in-progress"
              ? "In Progress"
              : project.status.charAt(0).toUpperCase() +
                project.status.slice(1)}
          </span>
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-4">
        <div className="text-sm text-gray-600 mb-3">{project.description}</div>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4 text-blue-500" />
            <span className="font-medium">
              {formatCurrency(project.budget)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>{formatDate(project.startDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Due: {formatDate(project.endDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>{project.location}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/maintenance/projects/${project.id}`}
            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
          >
            View Details
          </Link>
          {project.status !== "completed" && (
            <Link
              href={`/maintenance/projects/${project.id}/manage`}
              className="text-green-600 hover:text-green-800 text-xs font-medium"
            >
              Manage
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
