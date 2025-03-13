'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import Link from 'next/link'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AudioWaveform, Command, GalleryVerticalEnd, PieChart, Anchor, Users, Truck, Stethoscope, Package, Wrench, Calendar, ChevronDown } from 'lucide-react'

// Import shadcn dropdown components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

// Main page data with projects for each unit
const mainData = {
  teams: [
    {
      name: "HR Management",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Transportation",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Healthcare and medical readiness",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "HR Management",
      url: "/hr-management",
      icon: PieChart,
    },
    {
      name: "Transportation",
      url: "#",
      icon: AudioWaveform,
    },
    {
      name: "Healthcare",
      url: "#",
      icon: Stethoscope,
    },
    {
      name: "Maintenance",
      url: "#",
      icon: Wrench,
    },
  ],
  user: {
    name: "Lt. Cmdr. Abdurrahman Dar",
    email: "abdurrahman.dar@us.navy.mil",
    avatar: "/avatars/shadcn.jpg",
  }
}

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar 
        teams={mainData.teams}
        projects={mainData.projects}
        user={mainData.user}
      />
      <main className="w-full min-h-screen p-8">
        <SidebarTrigger className="mb-4" />
        <h1 className="text-3xl font-bold mb-8 text-center">Smart Unit Management System</h1>
        
        {/* Top row with general information */}
        <div className="flex flex-row gap-6 mb-8 max-w-6xl mx-auto">
          <DropdownCard 
            title="FILES" 
            icon={<GalleryVerticalEnd className="h-8 w-8 text-indigo-500" />}
            items={[
              "OOD Unit files",
              "DSO files",
              "Exercise Check of List",
              "Performas"
            ]}
          />
          <DropdownCard 
            title="State board" 
            icon={<PieChart className="h-8 w-8 text-purple-500" />}
            items={[
              "In/Out",
              "ROD",
              "FOD",
              "Special orders"
            ]}
          />
          <DropdownCard 
            title="Activities" 
            icon={<Command className="h-8 w-8 text-orange-500" />}
            items={[
              "Academic",
              "Unit",
              "Training",
              "VIP",
              "Special",
              "FCTS"
            ]}
          />
          <DropdownCard 
            title="Routine" 
            icon={<Calendar className="h-8 w-8 text-green-500" />}
            items={[
              "Daily Routine",
              "Holiday Routine",
              "Special Routine"
            ]}
          />
          <DropdownCard 
            title="Contact Directory" 
            icon={<Users className="h-8 w-8 text-blue-500" />}
            items={[
              "Imp",
              "Internal Bahadur",
              "External"
            ]}
          />
          <DropdownCard 
            title="Daily Order" 
            icon={<Anchor className="h-8 w-8 text-teal-500" />}
            items={[
              "Yesterday",
              "Today",
              "Tomorrow",
              "Day after Tomorrow"
            ]}
          />
        </div>
        
        {/* Events section */}
        <div className="mb-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Anchor className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <h4 className="font-medium">Annual Training Exercise</h4>
                    <p className="text-sm text-gray-500">Preparation for joint operations</p>
                  </div>
                  <div className="text-sm font-medium text-blue-600">May 15-20</div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <h4 className="font-medium">Medical Readiness Assessment</h4>
                    <p className="text-sm text-gray-500">Mandatory for all personnel</p>
                  </div>
                  <div className="text-sm font-medium text-blue-600">June 3</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Equipment Inspection</h4>
                    <p className="text-sm text-gray-500">Quarterly review of all unit equipment</p>
                  </div>
                  <div className="text-sm font-medium text-blue-600">June 10</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Senior Officers Orders section */}
        <div className="mb-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Senior Officers Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg">CO</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-3">All unit leaders must complete the updated operational readiness report by end of week.</p>
                <p className="text-sm text-gray-500">Issued: April 28, 2023</p>
                
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg">CMWT</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-3">Schedule adjustments for summer training rotations are now available. Review and submit feedback by Friday.</p>
                <p className="text-sm text-gray-500">Issued: April 30, 2023</p>
                
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-lg">ExO</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-3">New equipment maintenance protocols are in effect immediately. Training sessions will be held next week.</p>
                <p className="text-sm text-gray-500">Issued: May 1, 2023</p>
                
              </CardContent>
            </Card>
          </div>
        </div>

      </main>
    </SidebarProvider>
  )
}

function UnitCard({ title, content }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{content}</p>
      </CardContent>
    </Card>
  )
}

function InfoCard({ title, value, icon, change }) {
  const isPositive = change && change.startsWith('+');
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {change && (
              <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change} from last month
              </p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-gray-100">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Updated DropdownCard component using shadcn's DropdownMenu components.
 */
function DropdownCard({ title, icon, items }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Card className="cursor-pointer flex justify-between  p-2 hover:shadow-xl transition-shadow duration-150 ease-in-out border border-gray-200 rounded-lg w-full">
          <CardContent className="p-0 flex justify-between items-center">
            <p className="text-lg font-bold text-gray-700">{title}</p>
            <ChevronDown className="h-6 w-6 text-gray-500" />

          </CardContent>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2 p-2 rounded-md border border-gray-200 bg-white shadow-lg">
        {items.map((item, index) => (
          <DropdownMenuItem 
            key={index} 
            className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
