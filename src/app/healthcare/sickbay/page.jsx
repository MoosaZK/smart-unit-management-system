"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SickbayPage() {
  // Sample data for the table
  const tableData = [
    { id: 1, name: "John Doe", department: "Infantry", time: "09:30 AM", illness: "Fever", remarks: "Under observation" },
    { id: 2, name: "Alice Smith", department: "Artillery", time: "10:15 AM", illness: "Headache", remarks: "Medication prescribed" },
    { id: 3, name: "Bob Johnson", department: "Logistics", time: "11:45 AM", illness: "Sprain", remarks: "Rest advised" },
    { id: 4, name: "Emma Wilson", department: "Communications", time: "01:30 PM", illness: "Cold", remarks: "Follow-up tomorrow" },
    { id: 5, name: "Mike Brown", department: "Engineering", time: "02:45 PM", illness: "Diarrhea", remarks: "Hydration advised" },
  ];

  // Chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Fever",
        data: [12, 19, 8, 15, 12, 6],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Diarrhea",
        data: [8, 15, 12, 5, 10, 3],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Dengue",
        data: [5, 2, 1, 3, 7, 4],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Other",
        data: [15, 10, 13, 8, 9, 11],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Diseases Analytics",
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Healthcare Dashboard</h1>
        <h2 className="text-xl text-gray-600 mt-2">Daily Sickbay Admission List</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ATTE</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">02</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">PEFER</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">03</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OTAC</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">02</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SIL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">04</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">MEDICATION</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">04</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Depart</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Illness</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.illness}</TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Chart */}
      <Card className="p-4">
        <div className="h-[400px]">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Card>
    </div>
  );
}

