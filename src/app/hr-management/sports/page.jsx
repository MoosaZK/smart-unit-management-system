"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const SportsPage = () => {
  const [ptRecordsSearch, setPtRecordsSearch] = useState("");

  // Sample data for officer PT records
  const officerPtRecords = [
    {
      id: 1,
      sNo: 1,
      pNo: "175463",
      rankName: "LT HASHIM",
      department: "ALPHA SCHOOL",
      km26: "11 Min 41 Sec (PASS)",
      pushups: "40 (PASS)",
    },
    {
      id: 2,
      sNo: 2,
      pNo: "35165",
      rankName: "SLT UZAIR",
      department: "DLOPS",
      km26: "10 Min 5 Sec (PASS)",
      pushups: "50 (PASS)",
    },
    {
      id: 3,
      sNo: 3,
      pNo: "332754",
      rankName: "SLT QAISER",
      department: "BRAVO SCHOOL",
      km26: "9 Min 15 Sec (PASS)",
      pushups: "50 (PASS)",
    },
    {
      id: 4,
      sNo: 4,
      pNo: "6128736",
      rankName: "CDR HABIB",
      department: "HYDROGRAPHY",
      km26: "15 Min 30 Sec (FAIL)",
      pushups: "15 (FAIL)",
    },
    {
      id: 5,
      sNo: 5,
      pNo: "17242",
      rankName: "LT JHON",
      department: "CHARLIE SCHOOL",
      km26: "15 Min 29 Sec (FAIL)",
      pushups: "20 (PASS)",
    },
  ];

  // Sample data for PT state and muster state
  const ptStateData = [
    {
      id: 1,
      class: "2021-A",
      total: 78,
      present: 60,
      away: 18,
      leave: 5,
      duty: 4,
      excuse: 5,
      medCat: 1,
      ty: 4,
    },
    {
      id: 2,
      class: "2021-B",
      total: 98,
      present: 87,
      away: 11,
      leave: 4,
      duty: 3,
      excuse: 1,
      medCat: 0,
      ty: 2,
    },
    {
      id: 3,
      class: "SSC 24-A",
      total: 15,
      present: 11,
      away: 4,
      leave: 1,
      duty: 1,
      excuse: 1,
      medCat: 0,
      ty: 3,
    },
    {
      id: 4,
      class: "SSC 24-B",
      total: 25,
      present: 19,
      away: 6,
      leave: 3,
      duty: 2,
      excuse: 1,
      medCat: 2,
      ty: 4,
    },
  ];

  // Total calculations for PT state
  const getTotals = (data) => {
    return data.reduce(
      (acc, curr) => {
        return {
          total: acc.total + curr.total,
          present: acc.present + curr.present,
          away: acc.away + curr.away,
          leave: acc.leave + curr.leave,
          duty: acc.duty + curr.duty,
          excuse: acc.excuse + curr.excuse,
          medCat: acc.medCat + curr.medCat,
          ty: acc.ty + curr.ty,
        };
      },
      {
        total: 0,
        present: 0,
        away: 0,
        leave: 0,
        duty: 0,
        excuse: 0,
        medCat: 0,
        ty: 0,
      }
    );
  };

  // Filter PT records based on search
  const filteredPtRecords = officerPtRecords.filter(
    (record) =>
      record.rankName.toLowerCase().includes(ptRecordsSearch.toLowerCase()) ||
      record.pNo.includes(ptRecordsSearch) ||
      record.department.toLowerCase().includes(ptRecordsSearch.toLowerCase())
  );

  // Get result class based on test result
  const getResultClass = (result) => {
    return result.includes("PASS")
      ? "text-green-600 font-medium"
      : "text-red-600 font-medium";
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Sports Management</h1>

      {/* OFFICER PT RECORDS Table */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">OFFICER PT RECORDS</h2>
        <div className="mb-4">
          <Input
            placeholder="Search by name, P-Number or department..."
            value={ptRecordsSearch}
            onChange={(e) => setPtRecordsSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table>
          <TableCaption>Physical Training Records for Officers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>P.No</TableHead>
              <TableHead>RANK & NAME</TableHead>
              <TableHead>DEPARTMENT/CLASS</TableHead>
              <TableHead>2.6 KM</TableHead>
              <TableHead>PUSHUPS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPtRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.sNo}</TableCell>
                <TableCell>{record.pNo}</TableCell>
                <TableCell className="font-medium">{record.rankName}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell className={getResultClass(record.km26)}>
                  {record.km26}
                </TableCell>
                <TableCell className={getResultClass(record.pushups)}>
                  {record.pushups}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* MORNING PT STATE Table */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">MORNING PT STATE</h2>

        <Table>
          <TableCaption>Morning Physical Training Attendance</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>CLASS</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PRESENT</TableHead>
              <TableHead>AWAY</TableHead>
              <TableHead>LEAVE</TableHead>
              <TableHead>DUTY</TableHead>
              <TableHead>EXCUSE</TableHead>
              <TableHead>MED CAT</TableHead>
              <TableHead>TY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ptStateData.map((state) => (
              <TableRow key={state.id}>
                <TableCell className="font-medium">{state.class}</TableCell>
                <TableCell>{state.total}</TableCell>
                <TableCell>{state.present}</TableCell>
                <TableCell>{state.away}</TableCell>
                <TableCell>{state.leave}</TableCell>
                <TableCell>{state.duty}</TableCell>
                <TableCell>{state.excuse}</TableCell>
                <TableCell>{state.medCat}</TableCell>
                <TableCell>{state.ty}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>TOTAL</TableCell>
              <TableCell>{getTotals(ptStateData).total}</TableCell>
              <TableCell>{getTotals(ptStateData).present}</TableCell>
              <TableCell>{getTotals(ptStateData).away}</TableCell>
              <TableCell>{getTotals(ptStateData).leave}</TableCell>
              <TableCell>{getTotals(ptStateData).duty}</TableCell>
              <TableCell>{getTotals(ptStateData).excuse}</TableCell>
              <TableCell>{getTotals(ptStateData).medCat}</TableCell>
              <TableCell>{getTotals(ptStateData).ty}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* SPORTS MUSTER STATE Table */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">SPORTS MUSTER STATE</h2>

        <Table>
          <TableCaption>Sports Muster Attendance</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>CLASS</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PRESENT</TableHead>
              <TableHead>AWAY</TableHead>
              <TableHead>LEAVE</TableHead>
              <TableHead>DUTY</TableHead>
              <TableHead>EXCUSE</TableHead>
              <TableHead>MED CAT</TableHead>
              <TableHead>TY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ptStateData.map((state) => (
              <TableRow key={state.id}>
                <TableCell className="font-medium">{state.class}</TableCell>
                <TableCell>{state.total}</TableCell>
                <TableCell>{state.present}</TableCell>
                <TableCell>{state.away}</TableCell>
                <TableCell>{state.leave}</TableCell>
                <TableCell>{state.duty}</TableCell>
                <TableCell>{state.excuse}</TableCell>
                <TableCell>{state.medCat}</TableCell>
                <TableCell>{state.ty}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>TOTAL</TableCell>
              <TableCell>{getTotals(ptStateData).total}</TableCell>
              <TableCell>{getTotals(ptStateData).present}</TableCell>
              <TableCell>{getTotals(ptStateData).away}</TableCell>
              <TableCell>{getTotals(ptStateData).leave}</TableCell>
              <TableCell>{getTotals(ptStateData).duty}</TableCell>
              <TableCell>{getTotals(ptStateData).excuse}</TableCell>
              <TableCell>{getTotals(ptStateData).medCat}</TableCell>
              <TableCell>{getTotals(ptStateData).ty}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default SportsPage;
