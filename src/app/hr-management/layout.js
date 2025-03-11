'use client'
import React from 'react'
import {AppSidebar} from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Anchor, Command, PieChart } from 'lucide-react'

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
      url: "/hr-management/sailors",
      icon: Anchor,
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