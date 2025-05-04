"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { Search, Plus, FileText } from "lucide-react";
import { nightReports } from "@/data/nightReports";

export default function ReportPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = nightReports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.pNo.includes(searchTerm) ||
      report.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.date.includes(searchTerm)
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Night Reports</h1>
          <p className="text-muted-foreground mt-1">
            View and create OOD night reports
          </p>
        </div>
        <Link href="/hr-management/report/create">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Report</span>
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, P No, rank or date..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="overflow-hidden border shadow">
        <CardHeader className="bg-muted/50 py-4">
          <CardTitle className="text-xl">
            Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>P No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow
                      key={report.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/hr-management/report/${report.id}`)
                      }
                    >
                      <TableCell className="font-medium">
                        {report.pNo}
                      </TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.rank}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/hr-management/report/${report.id}`}>
                          <Button variant="ghost" size="icon">
                            <FileText size={16} />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No reports found. Try a different search or create a new
                      report.
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
