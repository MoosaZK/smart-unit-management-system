"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { deploymentOverview, liveDeployments } from "@/data/deployments";

export default function DeploymentDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeployments = useMemo(() => {
    if (!searchTerm.trim()) return liveDeployments;
    const term = searchTerm.toLowerCase();
    return liveDeployments.filter(
      (d) =>
        d.vehicleNo.toLowerCase().includes(term) ||
        d.driverName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto max-w-7xl py-8 space-y-8">
      {/* Title */}
      <h1 className="text-center text-2xl md:text-3xl font-extrabold underline underline-offset-4">
        TRANSPORT DEPLOYMENT MANAGEMENT
      </h1>

      {/* Top actions row: search & add */}
      <div className="flex flex-col md:flex-row gap-4 justify-end">
        <Input
          placeholder="Search by vehicle no / driver name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-md"
        />
        <Button asChild variant="outline" className="whitespace-nowrap">
          <Link href="#">Add New Deployment</Link>
        </Button>
      </div>

      {/* Deployment Overview Boxes */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Group of three boxes */}
        <div className="grid gap-4 md:col-span-3 grid-cols-3">
          <OverviewCard
            title="Total Vehicles"
            value={deploymentOverview.totalVehicles}
          />
          <OverviewCard
            title="Vehicles Deployed"
            value={deploymentOverview.vehiclesDeployed}
          />
          <OverviewCard
            title="Under Maintenance"
            value={deploymentOverview.underMaintenance}
          />
        </div>
        {/* Available vehicles box */}
        <OverviewCard
          title="Available Vehicles"
          value={deploymentOverview.availableVehicles}
          className="md:row-span-1 md:col-span-1"
          rounded="rounded-xl"
        />
      </div>

      {/* Live Deployment Status Table */}
      <section className="border rounded-lg p-4 space-y-4 bg-card shadow-sm">
        <h2 className="text-lg font-semibold underline underline-offset-4">
          Live Deployment Status
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle No</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Driver Name</TableHead>
              <TableHead>Driver Contact</TableHead>
              <TableHead>Gunman Name</TableHead>
              <TableHead>Gunman Contact</TableHead>
              <TableHead>Deployment Location</TableHead>
              <TableHead>Time Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeployments.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.vehicleNo}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.driverName}</TableCell>
                <TableCell>{row.driverContact}</TableCell>
                <TableCell>{row.gunmanName}</TableCell>
                <TableCell>{row.gunmanContact}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.timeOut}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      row.status === "Deployed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                        : row.status === "En Route"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                        : row.status === "Delayed"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                        : row.status === "Standby"
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                        : ""
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}
            {filteredDeployments.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-6">
                  No deployments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

function OverviewCard({
  title,
  value,
  className = "",
  rounded = "rounded-lg",
}) {
  return (
    <div
      className={`border ${rounded} p-4 text-center space-y-1 bg-card shadow-sm ${className}`}
    >
      <h3 className="text-sm font-medium leading-none">{title}:</h3>
      <p className="text-2xl font-bold">{value.toString().padStart(2, "0")}</p>
    </div>
  );
}
