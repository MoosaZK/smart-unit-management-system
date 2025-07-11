"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  PieChart,
  Anchor,
  Users,
  Truck,
  Stethoscope,
  Package,
  Wrench,
  Calendar,
  ChevronDown,
} from "lucide-react";

// Import shadcn dropdown components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen p-8 pt-24 bg-gradient-to-br from-slate-50 to-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-center ">
          Smart Unit Management System
        </h1>

        {/* Top row with general information */}
        <div className="flex flex-row gap-6 mb-8 max-w-6xl mx-auto">
          <DropdownCard
            title="FILES"
            icon={<GalleryVerticalEnd className="h-8 w-8 text-navy-700" />}
            items={[
              "OOD Unit files",
              "DSO files",
              "Exercise Check of List",
              "Performas",
            ]}
          />
          <DropdownCard
            title="Activities"
            icon={<Command className="h-8 w-8 text-navy-700" />}
            items={["Academic", "Unit", "Training", "VIP", "Special", "FCTS"]}
          />
          <DropdownCard
            title="Routine"
            icon={<Calendar className="h-8 w-8 text-navy-700" />}
            items={["Daily Routine", "Holiday Routine", "Special Routine"]}
          />
          <DropdownCard
            title="Contact Directory"
            icon={<Users className="h-8 w-8 text-navy-700" />}
            items={["Imp", "Internal Bahadur", "External"]}
          />
        </div>

        {/* Events section */}
        <div className="mb-8 max-w-6xl mx-auto">
          <Card className="overflow-hidden border-2 border-navy-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-navy-700 to-navy-600 text-white">
              <CardTitle className="flex items-center">
                <Anchor className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-navy-100 hover:bg-navy-50 p-2 rounded transition-colors">
                  <div>
                    <h4 className="font-medium text-navy-800">
                      Annual Training Exercise
                    </h4>
                    <p className="text-sm text-gray-500">
                      Preparation for joint operations
                    </p>
                  </div>
                  <div className="text-sm font-medium text-navy-700 bg-navy-100 px-3 py-1 rounded-full">
                    May 15-20
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-navy-100 hover:bg-navy-50 p-2 rounded transition-colors">
                  <div>
                    <h4 className="font-medium text-navy-800">
                      Medical Readiness Assessment
                    </h4>
                    <p className="text-sm text-gray-500">
                      Mandatory for all personnel
                    </p>
                  </div>
                  <div className="text-sm font-medium text-navy-700 bg-navy-100 px-3 py-1 rounded-full">
                    June 3
                  </div>
                </div>
                <div className="flex justify-between items-center hover:bg-navy-50 p-2 rounded transition-colors">
                  <div>
                    <h4 className="font-medium text-navy-800">
                      Equipment Inspection
                    </h4>
                    <p className="text-sm text-gray-500">
                      Quarterly review of all unit equipment
                    </p>
                  </div>
                  <div className="text-sm font-medium text-navy-700 bg-navy-100 px-3 py-1 rounded-full">
                    June 10
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Senior Officers Orders section */}
        <div className="mb-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
            <span>Senior Officers Orders</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-2 border-navy-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-navy-700 to-navy-600 text-white">
                <CardTitle className="text-lg">CO</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 bg-navy-50">
                <p className="text-gray-700 mb-3">
                  All unit leaders must complete the updated operational
                  readiness report by end of week.
                </p>
                <p className="text-sm text-gray-500 bg-white p-2 rounded-md">
                  Issued: April 28, 2023
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-navy-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-navy-700 to-navy-600 text-white">
                <CardTitle className="text-lg">CMWT</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 bg-navy-50">
                <p className="text-gray-700 mb-3">
                  Schedule adjustments for summer training rotations are now
                  available. Review and submit feedback by Friday.
                </p>
                <p className="text-sm text-gray-500 bg-white p-2 rounded-md">
                  Issued: April 30, 2023
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-navy-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-navy-700 to-navy-600 text-white">
                <CardTitle className="text-lg">ExO</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 bg-navy-50">
                <p className="text-gray-700 mb-3">
                  New equipment maintenance protocols are in effect immediately.
                  Training sessions will be held next week.
                </p>
                <p className="text-sm text-gray-500 bg-white p-2 rounded-md">
                  Issued: May 1, 2023
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

/**
 * Updated DropdownCard component using shadcn's DropdownMenu components.
 */
function DropdownCard({ title, icon, items }) {
  // Generate a unique background color based on the title
  const getBgColor = () => {
    const colors = {
      FILES: "bg-navy-50 hover:bg-navy-100 border-navy-200",
      "State board": "bg-navy-50 hover:bg-navy-100 border-navy-200",
      Activities: "bg-navy-50 hover:bg-navy-100 border-navy-200",
      Routine: "bg-navy-50 hover:bg-navy-100 border-navy-200",
      "Contact Directory": "bg-navy-50 hover:bg-navy-100 border-navy-200",
    };
    return colors[title] || "bg-gray-100 hover:bg-gray-200 border-gray-300";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Card
          className={`cursor-pointer flex justify-between p-2 hover:shadow-xl transition-shadow duration-150 ease-in-out rounded-lg w-full ${getBgColor()}`}
        >
          <CardContent className="p-0 flex items-center justify-between w-full">
            <div className="flex items-center">
              {icon && <div className="mr-2">{icon}</div>}
              <p className="text-md font-bold text-gray-800">{title}</p>
            </div>
            <ChevronDown className="h-6 w-6 text-gray-700" />
          </CardContent>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2 p-2 rounded-md border border-gray-200 bg-white shadow-lg">
        {items.map((item, index) => {
          // If this is the contact directory dropdown and item is "Imp",
          // link to the contacts page.
          if (title === "Contact Directory" && item === "Imp") {
            return (
              <DropdownMenuItem
                asChild
                key={index}
                className="cursor-pointer hover:bg-navy-100 rounded px-2 py-1"
              >
                <Link href="/contacts">{item}</Link>
              </DropdownMenuItem>
            );
          }
          // Otherwise, simply point to '#' so it stays on the same page for now.
          return (
            <DropdownMenuItem
              key={index}
              className={`cursor-pointer rounded px-2 py-1 ${
                title === "FILES"
                  ? "hover:bg-navy-100"
                  : title === "State board"
                  ? "hover:bg-navy-100"
                  : title === "Activities"
                  ? "hover:bg-navy-100"
                  : title === "Routine"
                  ? "hover:bg-navy-100"
                  : title === "Contact Directory"
                  ? "hover:bg-navy-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <a href="#">{item}</a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
