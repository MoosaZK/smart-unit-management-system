"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  complaintCategories,
  complaintStatus,
  priorityLevels,
  sampleComplaints,
} from "@/data/complaints";
import { ComplaintCard } from "@/components/complaint-card";
import { PlusCircle, Filter, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ComplainManagement() {
  const [complaints, setComplaints] = useState(sampleComplaints);
  const [filteredComplaints, setFilteredComplaints] =
    useState(sampleComplaints);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter complaints based on active tab, search term, and filters
  useEffect(() => {
    let result = [...complaints];

    // Filter by tab (MES/NON-MES)
    if (activeTab === "mes") {
      result = result.filter(
        (complaint) =>
          complaint.category !== "furniture" && complaint.category !== "hvac"
      );
    } else if (activeTab === "non-mes") {
      result = result.filter(
        (complaint) =>
          complaint.category === "furniture" || complaint.category === "hvac"
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (complaint) =>
          complaint.title.toLowerCase().includes(term) ||
          complaint.description.toLowerCase().includes(term) ||
          complaint.submittedBy?.toLowerCase().includes(term) ||
          complaint.assignedTo?.toLowerCase().includes(term) ||
          complaint.location?.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    if (filters.category) {
      result = result.filter(
        (complaint) => complaint.category === filters.category
      );
    }
    if (filters.priority) {
      result = result.filter(
        (complaint) => complaint.priority === filters.priority
      );
    }
    if (filters.status) {
      result = result.filter(
        (complaint) => complaint.status === filters.status
      );
    }

    setFilteredComplaints(result);
  }, [complaints, activeTab, searchTerm, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: "",
      priority: "",
      status: "",
    });
    setSearchTerm("");
  };

  // Get counts for the tabs
  const mesCount = complaints.filter(
    (complaint) =>
      complaint.category !== "furniture" && complaint.category !== "hvac"
  ).length;

  const nonMesCount = complaints.filter(
    (complaint) =>
      complaint.category === "furniture" || complaint.category === "hvac"
  ).length;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Complaint Management</h1>
          <p className="text-gray-500">Manage and track all complaints</p>
        </div>
        <Link href="/maintenance/complain-management/new">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Complaint
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-2 border-blue-300">
          <CardHeader className="bg-blue-100 pb-2">
            <CardTitle className="text-sm">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{complaints.length}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-300">
          <CardHeader className="bg-yellow-100 pb-2">
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {complaints.filter((c) => c.status === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-300">
          <CardHeader className="bg-blue-100 pb-2">
            <CardTitle className="text-sm">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {complaints.filter((c) => c.status === "in-progress").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-300">
          <CardHeader className="bg-green-100 pb-2">
            <CardTitle className="text-sm">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {complaints.filter((c) => c.status === "resolved").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Filters */}
      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">
                All Complaints ({complaints.length})
              </TabsTrigger>
              <TabsTrigger value="mes">MES Complaints ({mesCount})</TabsTrigger>
              <TabsTrigger value="non-mes">
                Non-MES Complaints ({nonMesCount})
              </TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Search and filters */}
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                className="pl-10 pr-4 py-2 w-full border rounded-md border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button variant="ghost" onClick={clearFilters} size="sm">
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-md border-gray-300"
                    >
                      <option value="">All Categories</option>
                      {complaintCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={filters.priority}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-md border-gray-300"
                    >
                      <option value="">All Priorities</option>
                      {priorityLevels.map((priority) => (
                        <option key={priority.id} value={priority.id}>
                          {priority.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-md border-gray-300"
                    >
                      <option value="">All Statuses</option>
                      {complaintStatus.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Complaint listings */}
          <TabsContent value="all">
            <ComplaintListing complaints={filteredComplaints} />
          </TabsContent>
          <TabsContent value="mes">
            <ComplaintListing complaints={filteredComplaints} />
          </TabsContent>
          <TabsContent value="non-mes">
            <ComplaintListing complaints={filteredComplaints} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ComplaintListing({ complaints }) {
  if (complaints.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-md">
        <p className="text-gray-500">No complaints found.</p>
        <p className="text-sm text-gray-400 mt-2">
          Try adjusting your filters or add a new complaint.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {complaints.map((complaint) => (
        <ComplaintCard key={complaint.id} complaint={complaint} />
      ))}
    </div>
  );
}
