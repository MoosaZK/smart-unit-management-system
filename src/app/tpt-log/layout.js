"use client";
import React from "react";
import {
  CarTaxiFront,
  MapPin,
  Droplet,
  ClipboardList,
  BookOpen,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";

// Navigation items specific to the Transport Log module
const tptLogTabs = [
  {
    name: "TMS",
    url: "/tpt-log",
    icon: ClipboardList,
  },
  {
    name: "Fleet Overview",
    url: "/tpt-log/fleet-overview",
    icon: CarTaxiFront,
  },
  {
    name: "Deployment Details",
    url: "/tpt-log/deployment-details",
    icon: MapPin,
  },
  {
    name: "Fuel & Water State",
    url: "/tpt-log/fuel-water-state",
    icon: Droplet,
  },
  {
    name: "Training Aid State",
    url: "/tpt-log/training-aid-state",
    icon: BookOpen,
  },
];

export default function TptLogLayout({ children }) {
  return (
    <SidebarProvider>
      {/* Sidebar navigation */}
      <AppSidebar projects={tptLogTabs} />
      <SidebarInset>
        {/* Top header with breadcrumbs */}
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
