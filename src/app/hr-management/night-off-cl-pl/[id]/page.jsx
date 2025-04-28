"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  X,
  Calendar,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - this would be fetched from your backend based on the ID
const MOCK_APPLICATIONS = {
  1: {
    id: 1,
    pNo: "P12345",
    rankAndName: "Cadet John Doe",
    semesterDepartment: "Semester 3 / Computer Science",
    leaveType: "Short Leave/Night Off",
    dateSubmitted: "2023-11-15",
    date: "2023-11-15",
    timingsFrom: "2023-11-18T09:00",
    timingsTo: "2023-11-18T17:00",
    reason: "Family function",
    contactNo: "+92 300 1234567",
    addressPlace: "Lahore, Punjab",
    punishmentWatchDuty: "no",
    status: "Pending",
    remarks: "",
  },
  2: {
    id: 2,
    pNo: "P54321",
    rankAndName: "Cadet Jane Smith",
    semesterDepartment: "Semester 2 / Electrical Engineering",
    leaveType: "Casual Leave/Privilege Leave",
    dateSubmitted: "2023-11-14",
    date: "2023-11-14",
    timingsFrom: "2023-11-20T08:00",
    timingsTo: "2023-11-22T18:00",
    reason: "Medical appointment",
    contactNo: "+92 300 7654321",
    addressPlace: "Karachi, Sindh",
    punishmentWatchDuty: "no",
    status: "Approved",
    remarks: "Approved by JOTO",
  },
  3: {
    id: 3,
    pNo: "P98765",
    rankAndName: "Cadet Alex Johnson",
    semesterDepartment: "Semester 1 / Mechanical Engineering",
    leaveType: "Short Leave/Night Off",
    dateSubmitted: "2023-11-13",
    date: "2023-11-13",
    timingsFrom: "2023-11-16T19:00",
    timingsTo: "2023-11-17T07:00",
    reason: "Personal emergency",
    contactNo: "+92 300 9876543",
    addressPlace: "Islamabad",
    punishmentWatchDuty: "yes",
    status: "Rejected",
    remarks: "Has pending duty assignment",
  },
};

export default function LeaveApplicationDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const application = MOCK_APPLICATIONS[id];

  const [remarks, setRemarks] = useState(application?.remarks || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Application Not Found</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-center text-muted-foreground">
              The requested leave application could not be found.
            </p>
            <Link href="/hr-management/night-off-cl-pl">
              <Button>Back to Applications</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would send this to your backend
    console.log("Updating application status:", {
      id,
      status: newStatus,
      remarks,
    });

    setIsSubmitting(false);

    // Redirect back to the list page
    router.push("/hr-management/night-off-cl-pl");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge variant="success">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/hr-management/night-off-cl-pl">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Leave Application Details</h1>
        <div className="ml-auto">{getStatusBadge(application.status)}</div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle>Application #{application.id}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Submitted on {application.dateSubmitted}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">P No</p>
                    <p className="font-medium">{application.pNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rank & Name</p>
                    <p className="font-medium">{application.rankAndName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Semester/Department
                    </p>
                    <p className="font-medium">
                      {application.semesterDepartment}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact #</p>
                      <p className="font-medium">{application.contactNo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Address/Place to Visit
                      </p>
                      <p className="font-medium">{application.addressPlace}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Punishment/Watch/Duty
                    </p>
                    <p className="font-medium">
                      {application.punishmentWatchDuty === "yes" ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Leave Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Leave Type</p>
                    <p className="font-medium">{application.leaveType}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar
                      size={16}
                      className="text-muted-foreground mt-1"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{application.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Timings</p>
                      <div className="flex gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">From</p>
                          <p className="font-medium">
                            {new Date(application.timingsFrom).toLocaleString(
                              "en-US",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">To</p>
                          <p className="font-medium">
                            {new Date(application.timingsTo).toLocaleString(
                              "en-US",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Reason</h3>
                <p className="bg-gray-50 p-4 rounded-md">
                  {application.reason}
                </p>
              </div>
            </div>
          </div>

          {application.status !== "Pending" && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Official Remarks</h3>
              <p className="bg-gray-50 p-4 rounded-md">
                {application.remarks || "No remarks provided"}
              </p>
            </div>
          )}
        </CardContent>

        {application.status === "Pending" && (
          <CardFooter className="flex flex-col space-y-6 border-t p-6 bg-gray-50">
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4">
                JOTO/COURSE OFFICER/DO Remarks
              </h3>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks (optional)"
                rows={3}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-4 w-full">
              <Button
                variant="destructive"
                onClick={() => handleStatusUpdate("Rejected")}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <X size={16} />
                <span>Reject</span>
              </Button>
              <Button
                variant="default"
                onClick={() => handleStatusUpdate("Approved")}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Check size={16} />
                <span>Approve</span>
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
