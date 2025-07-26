"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HospitalAppointmentPage() {
  const [activeTab, setActiveTab] = useState("rahat");

  const rahatReferData = [
    {
      sNo: 1,
      pNo: 123245,
      rank: "Lt",
      name: "Habib",
      department: "Navigation",
      reason: "Migraine",
      refDate: "11/22/2023",
      disposal: "2 Days Attc",
      followUp: "Nil",
    },
    {
      sNo: 2,
      pNo: 24252,
      rank: "Lt Cdr",
      name: "Uzair",
      department: "Hydrography",
      reason: "Fractured arm",
      refDate: "12/5/2023",
      disposal: "2 weeks SickLeave",
      followUp: "After 2 weeks",
    },
    {
      sNo: 3,
      pNo: 21432,
      rank: "PO",
      name: "Kamal",
      department: "Alpha Romeo",
      reason: "Influenza",
      refDate: "1/10/2024",
      disposal: "3 days PT Prade Ex",
      followUp: "Nil",
    },
    {
      sNo: 4,
      pNo: 234243,
      rank: "MCPO",
      name: "Waleed",
      department: "Music School",
      reason: "Hypertension",
      refDate: "2/18/2024",
      disposal: "3 Days Attc",
      followUp: "After 1 week",
    },
    {
      sNo: 5,
      pNo: 758329,
      rank: "S/Lt",
      name: "Tahir",
      department: "Communication",
      reason: "Diabetes",
      refDate: "3/5/2024",
      disposal: "5 Days Soft diet",
      followUp: "After 2 weeks",
    },
    {
      sNo: 6,
      pNo: 85953,
      rank: "Cap",
      name: "Abbas",
      department: "Bravo Charlie",
      reason: "Allergic reaction",
      refDate: "3/20/2024",
      disposal: "1 week Uniform Ex",
      followUp: "After 1 week",
    },
  ];

  const shifaReferData = [
    {
      sNo: 1,
      pNo: 438721,
      rank: "Cdr",
      name: "Ahmed",
      department: "Operations",
      reason: "Lower back pain",
      refDate: "2/15/2024",
      disposal: "1 week rest",
      followUp: "After 10 days",
    },
    {
      sNo: 2,
      pNo: 562134,
      rank: "Lt",
      name: "Saad",
      department: "Supply",
      reason: "Acute bronchitis",
      refDate: "3/1/2024",
      disposal: "5 days rest",
      followUp: "After 1 week",
    },
    {
      sNo: 3,
      pNo: 183945,
      rank: "Lt Cdr",
      name: "Kamran",
      department: "Technical",
      reason: "Ankle sprain",
      refDate: "3/10/2024",
      disposal: "2 weeks SickLeave",
      followUp: "After 2 weeks",
    },
    {
      sNo: 4,
      pNo: 291735,
      rank: "CPO",
      name: "Imran",
      department: "Engineering",
      reason: "Acute gastritis",
      refDate: "3/18/2024",
      disposal: "3 days rest",
      followUp: "After 5 days",
    },
    {
      sNo: 5,
      pNo: 763452,
      rank: "S/Lt",
      name: "Farhan",
      department: "Weapons",
      reason: "Stress induced IBS",
      refDate: "3/22/2024",
      disposal: "1 week restricted diet",
      followUp: "After 10 days",
    },
  ];

  const ReferForm = () => (
    <div className="p-6 border rounded-md space-y-4">
      <h2 className="text-xl font-bold text-center mb-6">
        RAHAT/SHIFA REFER FORM
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">P No</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Rank & Name</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Semester/Department</label>
        <input type="text" className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Reason for Refer</label>
        <input type="text" className="w-full p-2 border rounded" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Place of Refer</label>
          <select className="w-full p-2 border rounded">
            <option>Rahat</option>
            <option>Shifa</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Referred By</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Specialty</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Age/Sex</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Clinical Notes</label>
        <textarea className="w-full p-2 border rounded h-24"></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Ref Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Contact #</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button>Submit</Button>
      </div>
    </div>
  );

  const RahatOPDSchedule = () => (
    <Card className="p-4 rounded-md mb-6">
      <h2 className="text-lg font-bold text-center">
        OPD SCHEDULE RAHAT HOSPITAL
      </h2>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>OPD</TableHead>
              <TableHead>OFFICERS & FAMILIES</TableHead>
              <TableHead>CPOs/SAILORS/CIVILIAN & FAMILIES</TableHead>
              <TableHead>REMARKS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>MEDICAL OPD 53619</TableCell>
              <TableCell>MONDAY & WEDNESDAY</TableCell>
              <TableCell>TUESDAY & THURSDAY</TableCell>
              <TableCell>FRI (ECG & OPINION DAY)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CT COUNTER 53619</TableCell>
              <TableCell>MONDAY & WEDNESDAY</TableCell>
              <TableCell>TUESDAY & THURSDAY</TableCell>
              <TableCell>FRI (RECORD MAINTENANCE)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SURGICAL 53640</TableCell>
              <TableCell>FRI</TableCell>
              <TableCell>MONDAY & WEDNESDAY</TableCell>
              <TableCell>TUESDAY & THURSDAY (OT DAYS)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EYE 53630</TableCell>
              <TableCell>MONDAY & THURSDAY</TableCell>
              <TableCell>MONDAY & THURSDAY</TableCell>
              <TableCell>TUES, WED & FRI (OT DAYS)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ENT 53679</TableCell>
              <TableCell>FRIDAY</TableCell>
              <TableCell>MONDAY & WEDNESDAY</TableCell>
              <TableCell>FRI (OFFICERS + OPINION DAY)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  const ShifaOPDSchedule = () => (
    <Card className="p-4 rounded-md mb-6">
      <h2 className="text-lg font-bold text-center">
        OPD DAYS SCHEDULE (PNS SHIFA)
      </h2>
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SPECIALIST</TableHead>
              <TableHead>OFFICER DAYS</TableHead>
              <TableHead>CPOs / SAILORS & CIVILIAN DAYS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">
                MEDICINE & ALLIED
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MEDICAL SPECIALIST</TableCell>
              <TableCell>MONDAY / WEDNESDAY</TableCell>
              <TableCell>TUESDAY / THURSDAY</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CARDIOLOGIST</TableCell>
              <TableCell>MONDAY</TableCell>
              <TableCell>THURSDAY ETT-ECHO/BY APP</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NEPHROLOGIST</TableCell>
              <TableCell>WEDNESDAY</TableCell>
              <TableCell>TUESDAY</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NEURO PHYSICIAN</TableCell>
              <TableCell>WEDNESDAY</TableCell>
              <TableCell>THURSDAY</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">
                SURGICAL & ALLIED
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SURGICAL SPLT (GEN)</TableCell>
              <TableCell>TUESDAY & THURSDAY</TableCell>
              <TableCell>MONDAY & WEDNESDAY</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NEURO SURGEON</TableCell>
              <TableCell>TUESDAY & THURSDAY</TableCell>
              <TableCell>TUESDAY & THURSDAY</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  const ReferList = ({ data, hospital }) => (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">{hospital} REFER LIST:</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>P.No</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Ref Date</TableHead>
              <TableHead>Disposal</TableHead>
              <TableHead>Follow up</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.sNo}>
                <TableCell>{item.sNo}</TableCell>
                <TableCell>{item.pNo}</TableCell>
                <TableCell>{item.rank}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>{item.refDate}</TableCell>
                <TableCell>{item.disposal}</TableCell>
                <TableCell>{item.followUp}</TableCell>
              </TableRow>
            ))}
            {Array.from({ length: 10 - data.length }).map((_, index) => (
              <TableRow key={`empty-${index}`}>
                <TableCell>{data.length + index + 1}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-6 items-center">
        <Button
          className={`mx-2 ${
            activeTab === "rahat" ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-100 text-gray-800"
          }`}
          onClick={() => setActiveTab("rahat")}
        >
          RAHAT REFER MANAGEMENT
        </Button>
        <div className="flex items-center mx-4">
          <hr className="w-20 border-t-2 border-gray-300" />
          <span className="mx-2">Buttons to switch</span>
          <hr className="w-20 border-t-2 border-gray-300" />
        </div>
        <Button
          className={`mx-2 ${
            activeTab === "shifa" ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-100 text-gray-800"
          }`}
          onClick={() => setActiveTab("shifa")}
        >
          SHIFA REFER MANAGEMENT
        </Button>
      </div>

      <div className="w-full">
        {activeTab === "rahat" ? (
          <>
            <RahatOPDSchedule />
            <div className="flex justify-end mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Create new Refer form
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Create New Refer Form</DialogTitle>
                  </DialogHeader>
                  <ReferForm />
                </DialogContent>
              </Dialog>
            </div>
            <ReferList data={rahatReferData} hospital="RAHAT" />
          </>
        ) : (
          <>
            <ShifaOPDSchedule />
            <div className="flex justify-end mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Create new Refer form
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Create New Refer Form</DialogTitle>
                  </DialogHeader>
                  <ReferForm />
                </DialogContent>
              </Dialog>
            </div>
            <ReferList data={shifaReferData} hospital="SHIFA" />
          </>
        )}
      </div>
    </div>
  );
}
