import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { departments } from "@/data/departments"

export default function DepartmentDetails({ params }) {
  const { deptSlug } = params;
  const department = departments.find(dep => dep.slug === deptSlug);

  if (!department) {
    return (
      <main className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-red-600">Department not found.</p>
          <div className="mt-4 text-center">
            <Link href="/hr-management" className="inline-flex items-center text-blue-500 hover:text-blue-700 text-xl font-bold">
              <span className="mr-2 text-2xl">←</span> Back
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Helper to display a friendly title for each detail key
  const getDetailTitle = (key) => {
    switch (key) {
      case "cl":
        return "CL";
      case "nightOff":
        return "Night Off";
      case "shifa":
        return "Shifa";
      case "ty":
        return "TY";
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/hr-management" className="inline-flex items-center text-blue-500 hover:text-blue-700 text-xl font-bold">
            <span className="mr-2 text-2xl">←</span> Back
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          {department.name} - Department Details
        </h1>
        
        {/* Department Summary */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Department Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center border p-4 rounded-lg bg-white">
                <span className="font-semibold">Total</span>
                <span className="text-2xl">{department.total}</span>
              </div>
              <div className="flex flex-col items-center border p-4 rounded-lg bg-white">
                <span className="font-semibold">Present</span>
                <span className="text-2xl">{department.present}</span>
              </div>
              <div className="flex flex-col items-center border p-4 rounded-lg bg-white">
                <span className="font-semibold">Away</span>
                <span className="text-2xl">{department.away}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Department Detailed Records */}
        <div className="space-y-8">
          {Object.entries(department.details).map(([key, detail]) => (
            <Card key={key} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  {getDetailTitle(key)}
                  <span className="ml-2 text-sm text-gray-500">(Count: {detail.count})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {detail.records && detail.records.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Start</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">End</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {detail.records.map((record, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{record.from}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{record.to}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No records available.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
} 