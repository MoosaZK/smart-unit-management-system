import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { departments } from "@/data/departments";

export default function HRManagement() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase">
        Human Resource Management
      </h1>

      {/* Officer States Dashboard */}
      <div className="mb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Personnel Status Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <StateCard
            title="T"
            count={900}
            color="bg-green-100 border-green-300 text-green-800"
          />
          <StateCard
            title="P"
            count={800}
            color="bg-blue-100 border-blue-300 text-blue-800"
          />
          <StateCard
            title="A"
            count={100}
            color="bg-yellow-100 border-yellow-300 text-yellow-800"
          />
          <StateCard
            title="CL/PL"
            count={3}
            color="bg-orange-100 border-orange-300 text-orange-800"
          />
          <StateCard
            title="Night Off"
            count={10}
            color="bg-purple-100 border-purple-300 text-purple-800"
          />
          <StateCard
            title="Shifa"
            count={2}
            color="bg-red-100 border-red-300 text-red-800"
          />
          <StateCard
            title="Rahat"
            count={4}
            color="bg-teal-100 border-teal-300 text-teal-800"
          />
          <StateCard
            title="TY"
            count={5}
            color="bg-indigo-100 border-indigo-300 text-indigo-800"
          />
          <StateCard
            title="Sick leave"
            count={2}
            color="bg-pink-100 border-pink-300 text-pink-800"
          />
        </div>
      </div>

      {/* Personnel Summary */}
      <div className="mb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Personnel Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Officers"
            count={84}
            details={[
              { label: "Captains", value: 12 },
              { label: "Commanders", value: 18 },
              { label: "Lieutenants", value: 54 },
            ]}
            linkTo="/hr-management/officers"
          />
          <SummaryCard
            title="Sailors"
            count={156}
            details={[
              { label: "Chief Petty Officers", value: 22 },
              { label: "Petty Officers", value: 45 },
              { label: "Seamen", value: 89 },
            ]}
            linkTo="/hr-management/sailors"
          />
          <SummaryCard
            title="Civilian Staff"
            count={38}
            details={[
              { label: "Administrative", value: 15 },
              { label: "Technical", value: 18 },
              { label: "Support", value: 5 },
            ]}
            linkTo="/hr-management/civilian"
          />
        </div>
      </div>

      {/* Departmental States */}
      <div className="mb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Departmental States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard key={department.slug} department={department} />
          ))}
        </div>
      </div>
    </main>
  );
}

function StateCard({ title, count, color }) {
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <h3 className="font-medium">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}

function SummaryCard({ title, count, details, linkTo }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <span className="text-2xl font-bold">{count}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-500">{detail.label}</span>
              <span className="font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href={linkTo}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function DepartmentCard({ department }) {
  return (
    <Link
      href={`/hr-management/department/${department.slug}`}
      className="block"
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{department.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total</span>
              <span>{department.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Present</span>
              <span>{department.present}</span>
            </div>
            <div className="flex justify-between">
              <span>Away</span>
              <span>{department.away}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
