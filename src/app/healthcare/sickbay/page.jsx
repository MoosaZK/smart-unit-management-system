"use client";
import { useMemo, useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
  const categories = ["ATTE", "PEFER", "OTAC", "STL", "MEDICATION"];

  // Admissions fetched from backend
  const [tableData, setTableData] = useState([]);

  // Helper to load admissions from API
  const fetchAdmissions = async () => {
    try {
      const res = await fetch("/api/sickbay");
      const data = await res.json();
      // Map MongoDB _id to id for UI convenience
      setTableData(data.map((item) => ({ ...item, id: item._id })));
    } catch (err) {
      console.error("Failed to fetch admissions", err);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    time: "",
    illness: "",
    remarks: "",
    category: categories[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  const openForAdd = () => {
    resetForm();
    setOpen(true);
  };

  // Derived statistics for cards
  const categoryCounts = useMemo(() => {
    const counts = {};
    tableData.forEach((row) => {
      counts[row.category] = (counts[row.category] || 0) + 1;
    });
    return counts;
  }, [tableData]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      department: "",
      time: "",
      illness: "",
      remarks: "",
      category: categories[0],
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing admission
        await fetch(`/api/sickbay/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new admission
        await fetch("/api/sickbay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      await fetchAdmissions();
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error saving admission", err);
    }
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData({
      name: row.name,
      department: row.department,
      time: row.time,
      illness: row.illness,
      remarks: row.remarks,
      category: row.category,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/sickbay/${id}`, { method: "DELETE" });
      await fetchAdmissions();
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Failed to delete admission", err);
    }
  };

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
        <h2 className="text-xl text-gray-600 mt-2">
          Daily Sickbay Admission List
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">TOTAL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{tableData.length}</p>
          </CardContent>
        </Card>

        {categories.map((cat) => (
          <Card key={cat}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{cat}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{categoryCounts[cat] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Admission Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={openForAdd}>Add Admission</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Update Admission" : "Add Admission"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Department */}
              <div className="space-y-1">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Time */}
              <div className="space-y-1">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="HH:MM AM"
                  required
                />
              </div>
              {/* Illness */}
              <div className="space-y-1">
                <Label htmlFor="illness">Illness</Label>
                <Input
                  id="illness"
                  name="illness"
                  value={formData.illness}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Category dropdown */}
              <div className="space-y-1">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem value={cat} key={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Remarks */}
              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Input
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {editingId ? "Update" : "Add"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="rounded-md border max-h-80 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Depart</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Illness</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.illness}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
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
