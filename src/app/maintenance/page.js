"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import MaintenanceLayout from "./layout";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Oct", "Nov", "Dec", "Jan"],
  datasets: [
    {
      label: "New Complaints",
      data: [12, 19, 3, 5],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "Resolved Complaints",
      data: [2, 3, 20, 5],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
  ],
};

export default function Maintenance() {
  return (
      <main className="w-full min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8 text-center ">
          Maintenance Dashboard
        </h1>

        {/* Category Breakdown Section */}
        <div className="mb-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 ">
            Category Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Electrical",
              "Building",
              "Sewerage",
              "Recreational",
              "Furniture",
              "Water",
              "IT",
              "Gas",
            ].map((category) => (
              <div
                key={category}
                className="border-2 border-gray-300 p-4 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-lg font-semibold">{category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
          <Card className="border-2 border-blue-300">
            <CardHeader className="bg-blue-100">
              <CardTitle>Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">10</p>
              <p className="text-sm text-gray-500">Past 30 days</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-300">
            <CardHeader className="bg-green-100">
              <CardTitle>Avg Resolution Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">4 days</p>
              <p className="text-sm text-gray-500">for resolved complaints</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-yellow-300">
            <CardHeader className="bg-yellow-100">
              <CardTitle>Pending Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-500">30% unresolved</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-red-300">
            <CardHeader className="bg-red-100">
              <CardTitle>Resolution Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">40%</p>
              <p className="text-sm text-gray-500">4 out of 10 resolved</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Monthly Trends
          </h2>
          <Card className="border-2 border-gray-300">
            <CardContent>
              <Line data={data} />
            </CardContent>
          </Card>
        </div>
      </main>
  );
}
