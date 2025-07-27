"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  fleetOverviewData,
  maintenanceOverviewData,
} from "@/data/fleetOverview";

export default function FleetOverviewPage() {
  return (
    <div className="container mx-auto max-w-7xl py-8 space-y-8">
      {/* Page Title */}
      <h1 className="text-center text-2xl md:text-3xl font-extrabold underline underline-offset-4">
        Unit Transport Fleet Overview and Maintenance
      </h1>

      {/* Fleet Overview Section */}
      <section className="border rounded-lg p-4 space-y-4 bg-card shadow-sm">
        <h2 className="text-lg font-semibold underline underline-offset-4">
          Unit Transport Overview:
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Vehicle No</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Make</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fleetOverviewData.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{row.vehicleNo}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.make}</TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Maintenance Overview Section */}
      <section className="border rounded-lg p-4 space-y-4 bg-card shadow-sm">
        <h2 className="text-lg font-semibold underline underline-offset-4">
          Unit Transport Maintenance Overview:
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Vehicle No</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Make</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reported By</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Reffered to</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Inspection Date</TableHead>
              <TableHead>Mileage (km)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceOverviewData.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{row.vehicleNo}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.make}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.requestedBy}</TableCell>
                <TableCell>{row.issue}</TableCell>
                <TableCell>{row.nonOpsPeriod}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      row.status === "Repaired" ||
                      row.status === "Fixed" ||
                      row.status === "Resolved"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                        : row.status === "In Progress" ||
                          row.status === "Diagnosed"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                        : row.status === "Under Repair" ||
                          row.status === "Awaiting Parts"
                        ? "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                        : ""
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.nextInspectionDate}</TableCell>
                <TableCell>{row.mileage.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
