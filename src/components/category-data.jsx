"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryData() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const source = searchParams.get("source") || "gunroom";

  const [data, setData] = useState({
    headers: [],
    rows: [],
  });

  // Categories and their associated data
  const categoryData = {
    // Building category data
    Building: {
      gunroom: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Sewerage Lines", 30, 28, 2, 2, "Under Progress"],
          ["Water Supply Pipes", 80, 75, 5, 4, "3 Resolved & 1 Under Progress"],
          ["Gas Pipelines", 40, 38, 2, 1, "Resolved"],
          ["Manholes", 20, 18, 2, 2, "2 Resolved"],
          ["Water Pumps", 10, 9, 1, 1, "Under Maintenance"],
          ["Drainage Covers", 50, 48, 2, 2, "2 Resolved"],
        ],
      },
      unit: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Sewerage Lines", 35, 30, 5, 3, "2 Resolved & 1 Under Progress"],
          ["Water Supply Pipes", 70, 65, 5, 4, "3 Resolved & 1 Under Progress"],
          ["Gas Pipelines", 45, 40, 5, 2, "Resolved"],
          ["Manholes", 25, 22, 3, 3, "3 Resolved"],
          ["Water Pumps", 15, 12, 3, 2, "1 Resolved & 1 Under Maintenance"],
          ["Drainage Covers", 55, 50, 5, 3, "2 Resolved & 1 Under Progress"],
        ],
      },
    },

    // Electrical category data
    Electrical: {
      gunroom: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Bulb", 100, 98, 2, 2, "under progress"],
          ["Tube lights", 50, 40, 10, 10, "5 Resolved & 5 under progress"],
          ["Fans", 30, 27, 3, 3, "3 Resolved"],
          ["switches", 400, 360, 40, 30, "25 resolved & 5 Pending"],
          ["Exhauste Fans", 15, 13, 2, 2, "2 resolved"],
          ["Sockets", 50, 45, 5, 3, "3 Resolved"],
        ],
      },
      unit: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Bulb", 120, 110, 10, 5, "3 Resolved & 2 under progress"],
          ["Tube lights", 60, 50, 10, 8, "5 Resolved & 3 under progress"],
          ["Fans", 40, 35, 5, 4, "4 Resolved"],
          ["switches", 450, 400, 50, 35, "30 resolved & 5 Pending"],
          ["Exhauste Fans", 20, 18, 2, 2, "2 resolved"],
          ["Sockets", 60, 55, 5, 4, "4 Resolved"],
        ],
      },
    },

    // Furniture category data
    Furniture: {
      gunroom: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Beds", 120, 110, 10, 5, "3 Resolved & 2 Under Review"],
          ["Tables", 60, 58, 2, 1, "Resolved"],
          ["Cupboards", 45, 42, 3, 2, "1 Resolved & 1 Pending"],
          ["Chairs", 80, 78, 2, 1, "Under Review"],
          ["Sofas", 20, 18, 2, 2, "2 Resolved"],
          ["Mess Tables", 10, 9, 1, 1, "Under Progress"],
        ],
      },
      unit: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Beds", 150, 140, 10, 6, "4 Resolved & 2 Under Review"],
          ["Tables", 70, 65, 5, 3, "2 Resolved & 1 Pending"],
          ["Cupboards", 55, 50, 5, 3, "2 Resolved & 1 Pending"],
          ["Chairs", 100, 95, 5, 3, "2 Resolved & 1 Under Review"],
          ["Sofas", 25, 22, 3, 3, "3 Resolved"],
          ["Mess Tables", 15, 12, 3, 2, "1 Resolved & 1 Under Progress"],
        ],
      },
    },

    // IT category data
    IT: {
      gunroom: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Desktop PCs", 70, 65, 5, 5, "4 Resolved & 1 Under Review"],
          ["Laptops", 50, 48, 2, 2, "2 Resolved"],
          ["Printers", 30, 27, 3, 2, "2 Resolved"],
          ["Scanners", 15, 14, 1, 1, "Under Maintenance"],
          ["Network Switches", 20, 18, 2, 2, "1 Resolved & 1 Under Progress"],
          ["Wi-Fi Routers", 25, 23, 2, 2, "2 Resolved"],
        ],
      },
      unit: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Desktop PCs", 85, 80, 5, 6, "5 Resolved & 1 Under Review"],
          ["Laptops", 60, 55, 5, 4, "3 Resolved & 1 Pending"],
          ["Printers", 35, 30, 5, 3, "3 Resolved"],
          ["Scanners", 20, 18, 2, 2, "1 Resolved & 1 Under Maintenance"],
          ["Network Switches", 25, 22, 3, 3, "2 Resolved & 1 Under Progress"],
          ["Wi-Fi Routers", 30, 28, 2, 3, "3 Resolved"],
        ],
      },
    },

    // Recreational category data
    Recreational: {
      gunroom: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Table Tennis Tables", 4, 4, 0, 0, "Fully Operational"],
          ["Gym Equipment Sets", 15, 13, 2, 2, "2 Resolved"],
          ["Treadmills", 5, 4, 1, 1, "Under Maintenance"],
          ["Pool Tables", 3, 2, 1, 1, "Under Progress"],
          ["Sound Systems", 10, 9, 1, 1, "Resolved"],
          ["Projectors", 6, 5, 1, 1, "Under Review"],
        ],
      },
      unit: {
        headers: [
          "Class",
          "Total",
          "OPS",
          "NON OPS",
          "Complaints Filed",
          "Status",
        ],
        rows: [
          ["Table Tennis Tables", 6, 6, 0, 0, "Fully Operational"],
          ["Gym Equipment Sets", 20, 17, 3, 3, "3 Resolved"],
          ["Treadmills", 8, 7, 1, 1, "Under Maintenance"],
          ["Pool Tables", 4, 3, 1, 1, "Under Progress"],
          ["Sound Systems", 12, 11, 1, 1, "Resolved"],
          ["Projectors", 8, 7, 1, 2, "1 Resolved & 1 Under Review"],
        ],
      },
    },
  };

  useEffect(() => {
    if (category && categoryData[category]) {
      setData(categoryData[category][source]);
    }
  }, [category, source]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{category} Maintenance Data</h1>
        <p className="text-gray-600 mb-6">
          Detailed maintenance information for {category} category
        </p>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        {/* Data Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {data.headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        cellIndex === 0
                          ? "font-medium text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
