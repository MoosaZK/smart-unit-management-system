"use client";
import { useState, useEffect } from "react";
import { Search, Plus, CalendarIcon, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TrashIcon, PencilIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

// Data will now be loaded from the backend – no more hard-coded array.

export default function MedicinePage() {
  const [medicines, setMedicines] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    pNo: "",
    rank: "",
    name: "",
    disease: "",
    medicine: "",
    issueDate: "",
    endDate: "",
    duration: "",
    status: "active",
  });

  const openAddDialog = () => {
    setEditingRecord(null);
    setFormData({
      pNo: "",
      rank: "",
      name: "",
      disease: "",
      medicine: "",
      issueDate: "",
      endDate: "",
      duration: "",
      status: "active",
    });
    setIsFormOpen(true);
  };

  const openEditDialog = (record) => {
    setEditingRecord(record);
    setFormData({
      pNo: record.pNo,
      rank: record.rank,
      name: record.name,
      disease: record.disease,
      medicine: record.medicine,
      issueDate: record.issueDate ? record.issueDate.slice(0, 10) : "",
      endDate: record.endDate ? record.endDate.slice(0, 10) : "",
      duration: record.duration,
      status: record.status,
    });
    setIsFormOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingRecord ? "PUT" : "POST";
      const url = editingRecord ? `/api/medicines/${editingRecord._id}` : "/api/medicines";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save record");
      const saved = await res.json();
      if (editingRecord) {
        setMedicines((prev) => prev.map((m) => (m._id === saved._id ? saved : m)));
      } else {
        setMedicines((prev) => [saved, ...prev]);
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`/api/medicines/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setMedicines((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Load medicines on mount
  useEffect(() => {
    async function fetchMedicines() {
      try {
        const res = await fetch("/api/medicines");
        if (!res.ok) throw new Error("Failed to fetch medicines");
        const data = await res.json();
        setMedicines(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMedicines();
  }, []);

  // Re-apply filters whenever underlying data or filter criteria change
  useEffect(() => {
    applyFilters(searchQuery, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicines, searchQuery, statusFilter]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    applyFilters(searchQuery, status);
  };

  const applyFilters = (query, status) => {
    let filtered = medicines;

    // Apply search query filter
    if (query.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.medicine.toLowerCase().includes(query) ||
          item.disease.toLowerCase().includes(query) ||
          item.rank.toLowerCase().includes(query) ||
          item.pNo.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="text-gray-500">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicine Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all medicines for patients
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search by name, medicine, disease or ID"
                className="w-full pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filter by Status</h4>
                  <Separator />
                  <div className="flex flex-col gap-1 pt-1">
                    <Button
                      variant={statusFilter === "all" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => handleStatusFilter("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={statusFilter === "active" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => handleStatusFilter("active")}
                    >
                      Active
                    </Button>
                    <Button
                      variant={
                        statusFilter === "completed" ? "default" : "ghost"
                      }
                      className="justify-start"
                      onClick={() => handleStatusFilter("completed")}
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button className="w-full md:w-auto" onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Record
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Medicine Issue History</CardTitle>
                <CardDescription>
                  Manage all medicine records for patients
                </CardDescription>
              </div>
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="ml-auto">
                  Filtered: {statusFilter === "active" ? "Active" : "Completed"}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>P.No</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Disease</TableHead>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <TableRow key={row._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.pNo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{row.rank}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.disease}</TableCell>
                      <TableCell className="whitespace-pre-line max-w-[200px]">
                        {row.medicine}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                          {row.issueDate}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                          {row.endDate}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(row.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(row)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(row._id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredData.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {medicines.length} records
          </div>
        )}

        {/* Medicine Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRecord ? "Edit Record" : "Add Record"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pNo">P.No</Label>
                <Input id="pNo" name="pNo" value={formData.pNo} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rank">Rank</Label>
                <Input id="rank" name="rank" value={formData.rank} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disease">Disease</Label>
                <Input id="disease" name="disease" value={formData.disease} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicine">Medicine</Label>
                <Input id="medicine" name="medicine" value={formData.medicine} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input id="issueDate" type="date" name="issueDate" value={formData.issueDate} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" name="endDate" value={formData.endDate} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" value={formData.duration} onChange={handleFormChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="border rounded-md w-full p-2"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
