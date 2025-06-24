"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { trainingAidStats, trainingAidInventory } from "@/data/trainingAids";

export default function TrainingAidStatePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("All");

  const filteredInventory = useMemo(() => {
    return trainingAidInventory.filter((item) => {
      const matchesSearch = item.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCondition =
        conditionFilter === "All" || item.condition === conditionFilter;
      return matchesSearch && matchesCondition;
    });
  }, [searchTerm, conditionFilter]);

  const conditionOptions = [
    "All",
    ...Array.from(new Set(trainingAidInventory.map((i) => i.condition))),
  ];

  return (
    <div className="container mx-auto max-w-7xl py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            TRAINING AID STATE
          </h1>
          <p className="text-sm text-muted-foreground">
            Presented By: {trainingAidStats.presentedBy}
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1 md:text-right">
          <p>Presented By: {trainingAidStats.presentedBy}</p>
          <p>
            Unit: {trainingAidStats.unit} &nbsp; Date: {trainingAidStats.date}
          </p>
        </div>
      </div>

      {/* Stat boxes */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox label="Total Training Aids" value={trainingAidStats.total} />
        <StatBox
          label="Serviceable Aids"
          value={trainingAidStats.serviceable}
        />
        <StatBox
          label="Unserviceable Aids"
          value={trainingAidStats.unserviceable}
        />
        <StatBox label="In Use Today" value={trainingAidStats.inUseToday} />
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 md:justify-end">
        <Input
          placeholder="Search by item name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-md"
        />
        <Select value={conditionFilter} onValueChange={setConditionFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            {conditionOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Detailed Inventory */}
      <section className="border rounded-lg p-4 space-y-4 bg-card shadow-sm">
        <h2 className="text-lg font-semibold">Detailed Inventory</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Item Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.description}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <ConditionBadge condition={item.condition} />
                </TableCell>
                <TableCell>{item.lastUsed}</TableCell>
                <TableCell>{item.remarks}</TableCell>
              </TableRow>
            ))}
            {filteredInventory.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="border rounded-lg p-6 text-center space-y-2 bg-card shadow-sm">
      <h3 className="text-sm font-medium leading-none">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ConditionBadge({ condition }) {
  const colorClasses =
    condition === "Serviceable"
      ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      : condition === "Unserviceable"
      ? "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      : condition === "In Use"
      ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200";
  return (
    <Badge variant="outline" className={colorClasses}>
      {condition}
    </Badge>
  );
}
