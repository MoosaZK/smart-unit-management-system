"use client";
import React from "react";
import {
  BarChart3,
  Users,
  Calendar,
  ClipboardList,
  Database,
  Volleyball,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";

// HR Management specific data
const hrManagementProjects = [
  {
    name: "State",
    url: "/hr-management",
    icon: BarChart3,
  },
  {
    name: "Allied state",
    url: "/hr-management/allied",
    icon: Users,
  },
  {
    name: "NightOff/CL/PL",
    url: "/hr-management/night-off-cl-pl",
    icon: Calendar,
  },
  {
    name: "PET records",
    url: "#",
    icon: ClipboardList,
  },
  {
    name: "Database",
    url: "/hr-management/database",
    icon: Database,
  },
  {
    name: "Report",
    url: "/hr-management/report",
    icon: BarChart3,
  },
  {
    name: "Sports",
    url: "/hr-management/sports",
    icon: Volleyball,
  },
];
export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar projects={hrManagementProjects} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 ">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
