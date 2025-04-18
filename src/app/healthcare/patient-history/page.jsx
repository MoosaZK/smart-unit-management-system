"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { patients } from "@/data/patients";
import { UserIcon } from "lucide-react";

export default function PatientHistory() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort patients by number of visits for the "Frequent Visited" table
  const frequentPatients = [...patients].sort((a, b) => b.visits - a.visits);

  const handlePatientClick = (patientId) => {
    router.push(`/healthcare/patient-history/${patientId}`);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Patient History</h1>
      
      {/* Search bar with dropdown */}
      <div className="mb-8 relative" ref={dropdownRef}>
        <div className="flex max-w-md">
          <Input
            placeholder="Search patient by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            className="mr-2"
          />
          <Button>Search</Button>
        </div>
        
        {/* Patient dropdown */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            {filteredPatients.length > 0 ? (
              <ul className="max-h-60 overflow-auto py-1">
                {filteredPatients.map((patient) => (
                  <li 
                    key={patient.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handlePatientClick(patient.id)}
                  >
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">Last visit: {patient.dateOfAdmission}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-gray-500">No patients found</div>
            )}
          </div>
        )}
      </div>

      {/* Patient history table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Admission Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date of Admission</TableHead>
                <TableHead>Illness</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handlePatientClick(patient.id)}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dateOfAdmission}</TableCell>
                  <TableCell>{patient.illness}</TableCell>
                  <TableCell>{patient.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Frequent visited table */}
      <Card>
        <CardHeader>
          <CardTitle>Frequent Visited</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>No of Visits (Past 6 months)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {frequentPatients.map((patient, index) => (
                <TableRow key={patient.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handlePatientClick(patient.id)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
