"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function LeaveApplicationForm() {
  const router = useRouter();
  const [date, setDate] = useState();
  const [formData, setFormData] = useState({
    unit: "UNIT ALPHA",
    leaveType: "",
    pNo: "",
    rankAndName: "",
    semesterDepartment: "",
    timingsFrom: "",
    timingsTo: "",
    reason: "",
    contactNo: "",
    addressPlace: "",
    punishmentWatchDuty: "no",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setFormData((prev) => ({
      ...prev,
      date: newDate ? format(newDate, "yyyy-MM-dd") : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);

    // Redirect back to the night-off-cl-pl page after submission
    router.push("/hr-management/night-off-cl-pl");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="space-y-1 text-center border-b pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight">
            UNIT ALPHA
          </CardTitle>
          <CardDescription className="text-lg">
            Leave Application Form
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="leaveType">LEAVE TYPE</Label>
              <Select
                required
                value={formData.leaveType}
                onValueChange={(value) =>
                  handleSelectChange("leaveType", value)
                }
              >
                <SelectTrigger id="leaveType" className="w-full">
                  <SelectValue placeholder="Select Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Short Leave/Night Off">
                    Short Leave/Night Off
                  </SelectItem>
                  <SelectItem value="Casual Leave/Privilege Leave">
                    Casual Leave/Privilege Leave
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pNo">P No</Label>
                <Input
                  id="pNo"
                  name="pNo"
                  value={formData.pNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rankAndName">Rank & Name</Label>
                <Input
                  id="rankAndName"
                  name="rankAndName"
                  value={formData.rankAndName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="semesterDepartment">Semester/Department</Label>
              <Input
                id="semesterDepartment"
                name="semesterDepartment"
                value={formData.semesterDepartment}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timingsFrom">Timings (From)</Label>
                <Input
                  id="timingsFrom"
                  type="datetime-local"
                  name="timingsFrom"
                  value={formData.timingsFrom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timingsTo">Timings (To)</Label>
                <Input
                  id="timingsTo"
                  type="datetime-local"
                  name="timingsTo"
                  value={formData.timingsTo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact #</Label>
                <Input
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressPlace">Address/Place to Visit</Label>
                <Input
                  id="addressPlace"
                  name="addressPlace"
                  value={formData.addressPlace}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="punishmentWatchDuty">Punishment/Watch/Duty</Label>
              <Select
                value={formData.punishmentWatchDuty}
                onValueChange={(value) =>
                  handleSelectChange("punishmentWatchDuty", value)
                }
              >
                <SelectTrigger id="punishmentWatchDuty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <div className="flex items-center justify-between w-full">
              <Link href="/hr-management/night-off-cl-pl">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  <span>Cancel</span>
                </Button>
              </Link>

              <Button type="submit" className="w-24">
                SUBMIT
              </Button>
            </div>

            <div className="text-sm text-muted-foreground w-full text-center">
              <p>Note: Form forwarded to JOTO/Exo/PRO secretary ID</p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
