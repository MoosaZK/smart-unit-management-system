"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { patients } from "@/data/patients";

export default function PatientDetails({ params }) {
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the patient with the matching ID
    const patientData = patients.find(p => p.id === parseInt(params.id));
    
    if (patientData) {
      setPatient(patientData);
    }
    setLoading(false);
  }, [params.id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[60vh]">
        <p>Loading patient data...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto p-6">
        <Button onClick={handleGoBack} variant="outline" className="mb-4">
          &larr; Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p>Patient not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dummy data for medical history - in a real app, this would come from the API
  const medicalHistory = [
    { date: "2023-10-15", illness: "Pneumonia", remarks: "Prescribed antibiotics" },
    { date: "2023-08-22", illness: "Regular checkup", remarks: "All vitals normal" },
    { date: "2023-05-10", illness: "Influenza", remarks: "Bed rest advised" },
  ];

  return (
    <div className="container mx-auto p-6">
      <Button onClick={handleGoBack} variant="outline" className="mb-4">
        &larr; Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-6 rounded-full">
                <UserIcon className="h-16 w-16" />
              </div>
            </div>
            <CardTitle className="text-center">{patient.name}</CardTitle>
            <CardDescription className="text-center">
              Patient ID: {patient.id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Last Visit:</span>
                <span>{patient.dateOfAdmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Visits:</span>
                <span>{patient.visits}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Current Illness:</span>
                <span>{patient.illness}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date of Admission</TableHead>
                  <TableHead>Illness</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Current illness */}
                <TableRow>
                  <TableCell>{patient.dateOfAdmission}</TableCell>
                  <TableCell>{patient.illness}</TableCell>
                  <TableCell>{patient.remarks}</TableCell>
                </TableRow>
                
                {/* Past history */}
                {medicalHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.illness}</TableCell>
                    <TableCell>{record.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 