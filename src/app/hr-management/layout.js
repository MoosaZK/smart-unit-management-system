'use client'
import React from 'react'
import {AppSidebar} from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Anchor, Command, PieChart, FileText, Calendar, ListChecks, Home, ArrowLeftRight } from 'lucide-react'

// HR Management specific data
const hrData = {
  teams: [
    {
      name: "HR Management",
      logo: PieChart,
      plan: "Enterprise",
    }
  ],
  projects: [
    {
      name: "Stats",
      url: "/hr-management",
      icon: PieChart,
    },
    {
      name: "Officers",
      url: "/hr-management/officers",
      icon: Command,
    },
    {
      name: "Sailors",
      url: "#",
      icon: Anchor,
    },
    {
      name: "Morning Brief and Night Report",
      url: "#",
      icon: FileText,
    },
    {
      name: "Sl,Cl,Night off permission management",
      url: "#",
      icon: Calendar,
    },
    {
      name: "State List Officers, CPOs, POs & Sailors",
      url: "#",
      icon: ListChecks,
    },
    {
      name: "Accomondation",
      url: "#",
      icon: Home,
    },
    {
      name: "Drafted In/drafted out",
      url: "#",
      icon: ArrowLeftRight,
    },
    
    
    
  ],
  user: {
    name: "Lt. Cmdr. Abdurrahman Dar",
    email: "abdurrahman.dar@us.navy.mil",
    avatar: "/avatars/shadcn.jpg",
  }
}

export default function Layout({ children }) {
    return (
      <SidebarProvider>
        <AppSidebar 
          teams={hrData.teams}
          projects={hrData.projects}
          user={hrData.user}
        />
        <main className='w-full px-4 '>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    )
  }