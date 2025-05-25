"use client";
import { useState } from "react";
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

const medicineData = [
  {
    id: 1,
    pNo: "123245",
    rank: "Lt",
    name: "Habib",
    disease: "Migraine",
    medicine: "2x Boxes of Panadole Tablets",
    issueDate: "11/5/2023",
    endDate: "31/5/2023",
    duration: "3x weeks",
    status: "completed",
  },
  {
    id: 2,
    pNo: "24252",
    rank: "Lt Cdr",
    name: "Uzair",
    disease: "Fractured arm",
    medicine: "3x Boxes of buprofen 400 mg\n2x boxes Pantoprazole 40 mg",
    issueDate: "12/5/2023",
    endDate: "12/6/2023",
    duration: "4x weeks",
    status: "completed",
  },
  {
    id: 3,
    pNo: "21432",
    rank: "PO",
    name: "Kamal",
    disease: "Influenza",
    medicine: "1x Box of Paracetamol 500 mg",
    issueDate: "1/10/2024",
    endDate: "15/10/2024",
    duration: "2x weeks",
    status: "active",
  },
  {
    id: 4,
    pNo: "234243",
    rank: "MCPO",
    name: "Waleed",
    disease: "Hypertension",
    medicine: "10x Tablets of Losartan 50 mg",
    issueDate: "2/8/2024",
    endDate: "20/8/2024",
    duration: "2x weeks",
    status: "active",
  },
  {
    id: 5,
    pNo: "758329",
    rank: "S/Lt",
    name: "Tahir",
    disease: "Diabetes",
    medicine: "2x Boxes of Metformin 500 mg",
    issueDate: "3/5/2024",
    endDate: "3/6/2024",
    duration: "4x weeks",
    status: "active",
  },
  {
    id: 6,
    pNo: "85953",
    rank: "Cap",
    name: "Abbas",
    disease: "Allergic reaction",
    medicine: "7x Tablets of Cetirizine 10 mg",
    issueDate: "3/5/2024",
    endDate: "10/5/2024",
    duration: "1x week",
    status: "active",
  },
];

export default function MedicinePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(medicineData);

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
    let filtered = medicineData;

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

          <Button className="w-full md:w-auto">
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
                  filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
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
            Showing {filteredData.length} of {medicineData.length} records
          </div>
        )}
      </div>
    </div>
  );
}
