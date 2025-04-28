"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileText, Search, Plus, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data - this would typically come from your backend
const MOCK_APPLICATIONS = [
  {
    id: 1,
    pNo: "P12345",
    rankAndName: "Cadet John Doe",
    leaveType: "Short Leave/Night Off",
    dateSubmitted: "2023-11-15",
    timingsFrom: "2023-11-18T09:00",
    timingsTo: "2023-11-18T17:00",
    status: "Pending",
  },
  {
    id: 2,
    pNo: "P54321",
    rankAndName: "Cadet Jane Smith",
    leaveType: "Casual Leave/Privilege Leave",
    dateSubmitted: "2023-11-14",
    timingsFrom: "2023-11-20T08:00",
    timingsTo: "2023-11-22T18:00",
    status: "Approved",
  },
  {
    id: 3,
    pNo: "P98765",
    rankAndName: "Cadet Alex Johnson",
    leaveType: "Short Leave/Night Off",
    dateSubmitted: "2023-11-13",
    timingsFrom: "2023-11-16T19:00",
    timingsTo: "2023-11-17T07:00",
    status: "Rejected",
  },
  {
    id: 4,
    pNo: "P23456",
    rankAndName: "Cadet Sarah Wilson",
    leaveType: "Casual Leave/Privilege Leave",
    dateSubmitted: "2023-11-12",
    timingsFrom: "2023-11-19T10:00",
    timingsTo: "2023-11-19T18:00",
    status: "Pending",
  },
  {
    id: 5,
    pNo: "P34567",
    rankAndName: "Cadet Michael Brown",
    leaveType: "Short Leave/Night Off",
    dateSubmitted: "2023-11-11",
    timingsFrom: "2023-11-17T20:00",
    timingsTo: "2023-11-18T08:00",
    status: "Approved",
  },
];

export default function NightOffCLPLPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredApplications = MOCK_APPLICATIONS.filter((app) => {
    const matchesSearch =
      app.rankAndName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.pNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType = typeFilter === "all" || app.leaveType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge variant="success">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Leave Applications
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all leave applications in one place
          </p>
        </div>
        <Link href="/leave-application">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Application</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or P No..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    statusFilter === "Approved"
                      ? "bg-green-500"
                      : statusFilter === "Rejected"
                      ? "bg-red-500"
                      : statusFilter === "Pending"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                ></div>
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[200px]">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} className="text-muted-foreground" />
                <SelectValue placeholder="Leave Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leave Types</SelectItem>
              <SelectItem value="Short Leave/Night Off">
                Short Leave/Night Off
              </SelectItem>
              <SelectItem value="Casual Leave/Privilege Leave">
                Casual Leave/Privilege Leave
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden border shadow">
        <CardHeader className="bg-muted/50 py-4">
          <CardTitle className="text-xl">
            Applications ({filteredApplications.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>P No</TableHead>
                  <TableHead>Rank & Name</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <TableRow
                      key={application.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/hr-management/night-off-cl-pl/${application.id}`)
                      }
                    >
                      <TableCell className="font-medium">
                        {application.pNo}
                      </TableCell>
                      <TableCell>{application.rankAndName}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center">
                          <CalendarIcon
                            size={14}
                            className="mr-1 text-muted-foreground"
                          />
                          {application.leaveType}
                        </span>
                      </TableCell>
                      <TableCell>
                        {formatDate(application.timingsFrom)}
                      </TableCell>
                      <TableCell>{formatDate(application.timingsTo)}</TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-more-horizontal"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link
                              href={`/hr-management/night-off-cl-pl/${application.id}`}
                            >
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Filter size={36} strokeOpacity={0.5} />
                        <p>No applications found matching your filters</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                            setTypeFilter("all");
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
