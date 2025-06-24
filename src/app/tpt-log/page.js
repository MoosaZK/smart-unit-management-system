"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { requisitionData } from "@/data/requisitions";

export default function TmsPage() {
  const [data, setData] = useState(requisitionData);

  return (
    <div className="container mx-auto max-w-7xl py-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border rounded-xl p-6 shadow-sm bg-card">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center w-full md:w-auto">
          Transport Management System
        </h1>
        {/* Link to create a new requisition */}
        <Button asChild className="ml-auto whitespace-nowrap">
          <Link
            href="/tpt-log/requisition/create"
            className="inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Generate New
          </Link>
        </Button>
      </div>

      {/* Requisitions Section */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold underline underline-offset-4">
          Requisitions:
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>P.No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.pNo}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.rank}</Badge>
                  </TableCell>
                  <TableCell>{row.vehicle}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.approvalDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                <TableCell colSpan={9} className="h-24 text-center">
                  No Requisitions Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
