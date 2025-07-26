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
import { format } from "date-fns";
// Data will be fetched from the backend

export default function PatientDetails({ params }) {
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await fetch(`/api/patients/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch patient");
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPatient();
  }, [params.id]);

  const handleGoBack = () => {
    router.back();
  };

  const formatDate = (d) => {
    try {
      return format(new Date(d), "dd MMM yyyy");
    } catch {
      return d;
    }
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

  // Use history array from backend if provided
  const medicalHistory = patient.history ?? [];

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
              Patient ID: {patient._id}
            </CardDescription>
            <div className="flex justify-center gap-2 mt-4">
              <Button size="sm" variant="secondary" onClick={() => router.push(`/healthcare/patient-history`)}>
                Back to List
              </Button>
              <Button size="sm" onClick={() => router.push(`/healthcare/patient-history?edit=${patient._id}`)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={async () => {
                if (!confirm("Are you sure you want to delete this patient?")) return;
                try {
                  const res = await fetch(`/api/patients/${patient._id}`, { method: "DELETE" });
                  if (!res.ok) throw new Error("Failed");
                  router.push(`/healthcare/patient-history`);
                } catch (err) {
                  console.error(err);
                }
              }}>
                Delete
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Last Visit:</span>
                <span>{formatDate(patient.dateOfAdmission)}</span>
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
                  <TableCell>{formatDate(patient.dateOfAdmission)}</TableCell>
                  <TableCell>{patient.illness}</TableCell>
                  <TableCell>{patient.remarks}</TableCell>
                </TableRow>
                
                {/* Past history */}
                {medicalHistory.length > 0 ? (
                  medicalHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell>{record.illness}</TableCell>
                      <TableCell>{record.remarks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No previous records
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 