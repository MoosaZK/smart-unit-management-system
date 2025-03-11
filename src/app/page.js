'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import Link from 'next/link'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AudioWaveform, Command, GalleryVerticalEnd, PieChart, Anchor, Users, Truck, Stethoscope, Package } from 'lucide-react'

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
      url: "/transportation",
      icon: AudioWaveform,
    },
    {
      name: "Healthcare",
      url: "/healthcare",
      icon: Command,
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
          <InfoCard 
            title="Personnel" 
            value="245" 
            icon={<Users className="h-8 w-8 text-blue-500" />}
            change="+3%"
          />
          <InfoCard 
            title="Vehicles" 
            value="42" 
            icon={<Truck className="h-8 w-8 text-green-500" />}
            change="-1%"
          />
          <InfoCard 
            title="Medical Readiness" 
            value="92%" 
            icon={<Stethoscope className="h-8 w-8 text-red-500" />}
            change="+5%"
          />
          <InfoCard 
            title="Supplies" 
            value="87%" 
            icon={<Package className="h-8 w-8 text-amber-500" />}
            change="-2%"
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
                <CardTitle className="text-lg">Commander&apos;s Directive</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-3">All unit leaders must complete the updated operational readiness report by end of week.</p>
                <p className="text-sm text-gray-500">Issued: April 28, 2023</p>
                <div className="mt-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="font-bold text-blue-700">JD</span>
                  </div>
                  <span className="text-sm font-medium">Capt. James Donovan</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg">Executive Officer&apos;s Notice</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-3">Schedule adjustments for summer training rotations are now available. Review and submit feedback by Friday.</p>
                <p className="text-sm text-gray-500">Issued: April 30, 2023</p>
                <div className="mt-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="font-bold text-green-700">SL</span>
                  </div>
                  <span className="text-sm font-medium">Cmdr. Sarah Lin</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-lg">Operations Officer&apos;s Update</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-3">New equipment maintenance protocols are in effect immediately. Training sessions will be held next week.</p>
                <p className="text-sm text-gray-500">Issued: May 1, 2023</p>
                <div className="mt-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                    <span className="font-bold text-amber-700">RM</span>
                  </div>
                  <span className="text-sm font-medium">Lt. Cmdr. Robert Martinez</span>
                </div>
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
