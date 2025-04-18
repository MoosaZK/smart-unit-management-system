"use client";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { ListChecks, ClipboardList, Calendar } from "lucide-react";

const healthcareProjects = [
  {
    name: "Sickbay Admission List",
    url: "/healthcare/sickbay",
    icon: ListChecks,
  },
  {
    name: "Patient History",
    url: "/healthcare/patient-history",
    icon: ClipboardList,
  },
  {
    name: "Hospital Appointment Management",
    url: "#",
    icon: Calendar,
  },
];

export default function HealthcareLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar projects={healthcareProjects} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
