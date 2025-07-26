"use client";

// NOTE: This file was extracted from page.jsx to isolate the Client Component that
// uses `useSearchParams`. Keeping it separate allows the route-level page to be
// a Server Component that wraps this in a Suspense boundary, preventing the
// static export error.

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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
  TableRow,
} from "@/components/ui/table";
import { UserIcon, PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default function PatientHistory() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const searchParams = useSearchParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dateOfAdmission: "",
    illness: "",
    remarks: "",
    visits: 1,
  });
  const dropdownRef = useRef(null);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), "dd MMM yyyy");
    } catch {
      return dateStr;
    }
  };

  // Fetch patients from the backend on component mount
  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch("/api/patients");
        if (!res.ok) throw new Error("Failed to fetch patients");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPatients();
  }, []);

  // Open edit dialog if ?edit=id present
  useEffect(() => {
    if (!patients.length) return;
    const editId = searchParams.get("edit");
    if (editId) {
      const patient = patients.find((p) => p._id === editId);
      if (patient) {
        openEditDialog(patient);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients, searchParams]);

  // Sort patients by number of visits for the "Frequent Visited" table
  const frequentPatients = [...patients].sort((a, b) => (b.visits ?? 0) - (a.visits ?? 0));

  const openAddDialog = () => {
    setEditingPatient(null);
    setFormData({ name: "", dateOfAdmission: "", illness: "", remarks: "", visits: 1 });
    setIsFormOpen(true);
  };

  const openEditDialog = (patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      dateOfAdmission: patient.dateOfAdmission?.slice(0, 10) || "",
      illness: patient.illness,
      remarks: patient.remarks || "",
      visits: patient.visits ?? 1,
    });
    setIsFormOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingPatient ? "PUT" : "POST";
      const url = editingPatient ? `/api/patients/${editingPatient._id}` : "/api/patients";
      const payload = { ...formData, visits: Number(formData.visits) };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save patient");
      const saved = await res.json();
      if (editingPatient) {
        setPatients((prev) => prev.map((p) => (p._id === saved._id ? saved : p)));
      } else {
        setPatients((prev) => [saved, ...prev]);
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (patientId) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    try {
      const res = await fetch(`/api/patients/${patientId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setPatients((prev) => prev.filter((p) => p._id !== patientId));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePatientClick = (id) => {
    router.push(`/healthcare/patient-history/${id}`);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Patient History</h1>
        <Button onClick={openAddDialog} size="sm" className="gap-1">
          <PlusIcon className="h-4 w-4" /> Add Patient
        </Button>
      </div>

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
                    key={patient._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handlePatientClick(patient._id)}
                  >
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">Last visit: {formatDate(patient.dateOfAdmission)}</p>
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
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date of Admission</TableHead>
                <TableHead>Illness</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="w-24 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient._id} className="hover:bg-gray-50 group">
                  <TableCell onClick={() => handlePatientClick(patient._id)} className="cursor-pointer">
                    {patient.name}
                  </TableCell>
                  <TableCell onClick={() => handlePatientClick(patient._id)} className="cursor-pointer">
                    {formatDate(patient.dateOfAdmission)}
                  </TableCell>
                  <TableCell onClick={() => handlePatientClick(patient._id)} className="cursor-pointer">
                    {patient.illness}
                  </TableCell>
                  <TableCell onClick={() => handlePatientClick(patient._id)} className="cursor-pointer">
                    {patient.remarks}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center opacity-0 group-hover:opacity-100">
                    <Button size="icon" variant="ghost" onClick={() => openEditDialog(patient)}>
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(patient._id)}>
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Frequent visited table */}
      <Card className="mt-8">
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
                <TableRow
                  key={patient._id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handlePatientClick(patient._id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Patient Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPatient ? "Edit Patient" : "Add Patient"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfAdmission">Date of Admission</Label>
              <Input
                id="dateOfAdmission"
                type="date"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="illness">Illness</Label>
              <Input id="illness" name="illness" value={formData.illness} onChange={handleFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input id="remarks" name="remarks" value={formData.remarks} onChange={handleFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visits">Visits (past 6 months)</Label>
              <Input
                id="visits"
                type="number"
                name="visits"
                min="1"
                value={formData.visits}
                onChange={handleFormChange}
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 