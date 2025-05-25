"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import CategoryCard from "@/components/category-card";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function GunroomMaintenancePage() {
  const categories = [
    "Electrical",
    "Building",
    "Recreational",
    "Furniture",
    "IT",
  ];

  // Data for Complaints by Category pie chart
  const categoryData = {
    labels: ["Building", "Electrical", "Furniture"],
    datasets: [
      {
        label: "Complaints by Category",
        data: [3, 2, 2, 1, 1],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(54, 162, 235, 0.4)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Status Distribution pie chart
  const statusData = {
    labels: ["Pending", "In Progress", "Resolved", "Rejected"],
    datasets: [
      {
        label: "Status Distribution",
        data: [4, 2, 2, 1],
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Monthly Trends bar chart
  const monthlyTrendsData = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Complaints",
        data: [12, 6, 9, 13, 14, 5],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Resolved",
        data: [10, 5, 10, 8, 11, 8],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Data for Resolution Time by Category bar chart
  const resolutionTimeData = {
    labels: ["Building", "Electrical", "Furniture", "Sewerage", "Water"],
    datasets: [
      {
        label: "Average Days to Resolve",
        data: [5.2, 3.8, 2.5, 4.7, 3.2],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Breakdown Section */}
      <CategoryCard categories={categories} source="gunroom" />

      {/* Analytics Dashboard Section */}
      <div className="mb-8  mx-auto">
        <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Monitor performance metrics and trends across all Gunroom activities
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Total Complaints */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Complaints
                </h3>
                <p className="text-3xl font-bold mt-1">9</p>
                <p className="text-xs text-gray-500 mt-1">Past 30 days</p>
              </div>
              <div className="text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Average Resolution Time */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Average Resolution Time
                </h3>
                <p className="text-3xl font-bold mt-1">4.2 days</p>
                <p className="text-xs text-gray-500 mt-1">
                  For resolved complaints
                </p>
              </div>
              <div className="text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Complaints */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Pending Complaints
                </h3>
                <p className="text-3xl font-bold mt-1">4</p>
                <p className="text-xs text-gray-500 mt-1">44.4% of total</p>
              </div>
              <div className="text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Resolution Rate */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Resolution Rate
                </h3>
                <p className="text-3xl font-bold mt-1">55.6%</p>
                <p className="text-xs text-gray-500 mt-1">
                  5 out of 9 resolved
                </p>
              </div>
              <div className="text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Detail */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
          <p className="text-sm text-gray-500 mb-4">
            Detailed statistics by category
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Building */}
            <div className="p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-lg">B</span>
                </div>
                <span className="font-medium">Building</span>
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-gray-500">33.3% of total</p>
            </div>

            {/* Electrical */}
            <div className="p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                  <span className="text-orange-600 text-lg">E</span>
                </div>
                <span className="font-medium">Electrical</span>
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-gray-500">22.2% of total</p>
            </div>

            {/* Water */}
            <div className="p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-lg">W</span>
                </div>
                <span className="font-medium">Water</span>
              </div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs text-gray-500">11.1% of total</p>
            </div>

            {/* Furniture */}
            <div className="p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <span className="text-green-600 text-lg">F</span>
                </div>
                <span className="font-medium">Furniture</span>
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-gray-500">22.2% of total</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Complaints by Category Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">
              Complaints by Category
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Distribution of complaints across different categories
            </p>
            <div className="h-64 flex items-center justify-center">
              <Pie data={categoryData} options={pieOptions} />
            </div>
          </div>

          {/* Status Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Status Distribution</h2>
            <p className="text-sm text-gray-500 mb-4">
              Current status of all complaints
            </p>
            <div className="h-64 flex items-center justify-center">
              <Pie data={statusData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Monthly Trends and Resolution Time */}
        <div className="grid grid-cols-1 gap-6">
          {/* Monthly Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold mb-2">Monthly Trends</h2>
            <p className="text-sm text-gray-500 mb-4">
              New vs. resolved complaints over time
            </p>
            <div className="h-64 flex items-center justify-center">
              <Bar data={monthlyTrendsData} options={barOptions} />
            </div>
          </div>

          {/* Resolution Time by Category */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">
              Resolution Time by Category
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Average days to resolve complaints by category
            </p>
            <div className="h-64 flex items-center justify-center">
              <Bar data={resolutionTimeData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
