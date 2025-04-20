"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { navyPersonnel } from "@/data/navyPersonnel";

export default function DatabasePage() {
  const [officersSearchTerm, setOfficersSearchTerm] = useState("");
  const [sailorsSearchTerm, setSailorsSearchTerm] = useState("");
  const router = useRouter();
  const { officers, sailors } = navyPersonnel;

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(officersSearchTerm.toLowerCase()) ||
      officer.pNumber
        .toLowerCase()
        .includes(officersSearchTerm.toLowerCase()) ||
      officer.state.toLowerCase().includes(officersSearchTerm.toLowerCase())
  );

  const filteredSailors = sailors.filter(
    (sailor) =>
      sailor.name.toLowerCase().includes(sailorsSearchTerm.toLowerCase()) ||
      sailor.pNumber.toLowerCase().includes(sailorsSearchTerm.toLowerCase()) ||
      sailor.state.toLowerCase().includes(sailorsSearchTerm.toLowerCase())
  );

  const handleOfficerRowClick = (officerId) => {
    router.push(`/hr-management/officers/${officerId}`);
  };

  const handleSailorRowClick = (sailorId) => {
    router.push(`/hr-management/sailors/${sailorId}`);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Navy Personnel Database</h1>

      {/* Officers Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Officers</h2>
        <div className="mb-4">
          <Input
            placeholder="Search officers by name, P-Number or state..."
            value={officersSearchTerm}
            onChange={(e) => setOfficersSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table>
          <TableCaption>List of Navy Officers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>P-Number</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Next of Kin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOfficers.map((officer) => (
              <TableRow
                key={officer.id}
                onClick={() => handleOfficerRowClick(officer.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="font-medium">{officer.name}</TableCell>
                <TableCell>{officer.pNumber}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStateColor(
                      officer.state
                    )}`}
                  >
                    {officer.state}
                  </span>
                </TableCell>
                <TableCell>{officer.contactNumber}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {officer.address}
                </TableCell>
                <TableCell>{officer.nextOfKin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Sailors Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Sailors</h2>
        <div className="mb-4">
          <Input
            placeholder="Search sailors by name, P-Number or state..."
            value={sailorsSearchTerm}
            onChange={(e) => setSailorsSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table>
          <TableCaption>List of Navy Sailors</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>P-Number</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Next of Kin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSailors.map((sailor) => (
              <TableRow
                key={sailor.id}
                onClick={() => handleSailorRowClick(sailor.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="font-medium">{sailor.name}</TableCell>
                <TableCell>{sailor.pNumber}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStateColor(
                      sailor.state
                    )}`}
                  >
                    {sailor.state}
                  </span>
                </TableCell>
                <TableCell>{sailor.contactNumber}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {sailor.address}
                </TableCell>
                <TableCell>{sailor.nextOfKin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

// Helper function to get color based on state
function getStateColor(state) {
  switch (state) {
    case "Present":
      return "bg-green-100 text-green-800";
    case "TY":
      return "bg-blue-100 text-blue-800";
    case "CL":
      return "bg-yellow-100 text-yellow-800";
    case "SL":
      return "bg-orange-100 text-orange-800";
    case "Night Off":
      return "bg-purple-100 text-purple-800";
    case "Detained":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
