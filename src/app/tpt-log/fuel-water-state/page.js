"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { waterState, fuelState } from "@/data/fuelWater";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FuelWaterStatePage() {
  return (
    <div className="container mx-auto max-w-7xl py-8 space-y-8">
      <h1 className="text-center text-2xl md:text-3xl font-extrabold underline underline-offset-4">
        WATER &amp; FUEL MANAGEMENT
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Water Column */}
        <div className="space-y-6">
          <StatBox
            label="WATER AVAILABLE"
            value={`${waterState.available.toLocaleString()} Liters`}
          />

          {/* Water Weekly Usage Table */}
          <section className="border rounded-lg p-4 space-y-4 bg-card shadow-sm">
            <h2 className="text-lg font-semibold underline underline-offset-4">
              Water Weekly Usage
            </h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Opening Balance (L)</TableHead>
                  <TableHead>Received (L)</TableHead>
                  <TableHead>Total (L)</TableHead>
                  <TableHead>Supply (L)</TableHead>
                  <TableHead>Closing Balance (L)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waterState.weeklyUsage.map((d) => (
                  <TableRow key={d.day}>
                    <TableCell className="font-medium">{d.day}</TableCell>
                    <TableCell>{d.opening.toLocaleString()}</TableCell>
                    <TableCell>{d.received.toLocaleString()}</TableCell>
                    <TableCell>{d.total.toLocaleString()}</TableCell>
                    <TableCell>{d.supply.toLocaleString()}</TableCell>
                    <TableCell>{d.closing.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Water Trend Chart */}
            <div>
              <Bar
                options={{
                  plugins: {
                    legend: { position: "bottom" },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={{
                  labels: waterState.weeklyUsage.map((d) => d.day.slice(0, 3)),
                  datasets: [
                    {
                      label: "Opening Balance (L)",
                      data: waterState.weeklyUsage.map((d) => d.opening),
                      backgroundColor: "rgba(59, 130, 246, 0.6)",
                    },
                    {
                      label: "Closing Balance (L)",
                      data: waterState.weeklyUsage.map((d) => d.closing),
                      backgroundColor: "rgba(234, 88, 12, 0.6)",
                    },
                  ],
                }}
                height={250}
              />
            </div>
          </section>
        </div>

        {/* Fuel Column */}
        <div className="space-y-6">
          <StatBox
            label="FUEL AVAILABLE"
            value={`${fuelState.available.toLocaleString()} Liters`}
          />

          {/* Fuel Weekly Usage Table */}
          <section className="border rounded-lg p-4 space-y-4 bg-card shadow-sm">
            <h2 className="text-lg font-semibold underline underline-offset-4">
              Fuel Weekly Usage
            </h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Opening Balance (L)</TableHead>
                  <TableHead>Received (L)</TableHead>
                  <TableHead>Supply (L)</TableHead>
                  <TableHead>Closing Balance (L)</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fuelState.weeklyUsage.map((d) => (
                  <TableRow key={d.day}>
                    <TableCell className="font-medium">{d.day}</TableCell>
                    <TableCell>{d.opening.toLocaleString()}</TableCell>
                    <TableCell>{d.received.toLocaleString()}</TableCell>
                    <TableCell>{d.supply.toLocaleString()}</TableCell>
                    <TableCell>{d.closing.toLocaleString()}</TableCell>
                    <TableCell>{d.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Fuel Trend Chart */}
            <div>
              <Bar
                options={{
                  plugins: {
                    legend: { position: "bottom" },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={{
                  labels: fuelState.weeklyUsage.map((d) => d.day.slice(0, 3)),
                  datasets: [
                    {
                      label: "Opening Balance (L)",
                      data: fuelState.weeklyUsage.map((d) => d.opening),
                      backgroundColor: "rgba(59, 130, 246, 0.6)",
                    },
                    {
                      label: "Closing Balance (L)",
                      data: fuelState.weeklyUsage.map((d) => d.closing),
                      backgroundColor: "rgba(234, 88, 12, 0.6)",
                    },
                  ],
                }}
                height={250}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="border rounded-xl p-6 text-center space-y-2 bg-card shadow-sm">
      <h2 className="text-lg font-semibold leading-none">{label}:</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
