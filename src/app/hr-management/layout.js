'use client'
import React from 'react'
import {AppSidebar} from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { Anchor, Command, PieChart, FileText, Calendar, ListChecks, Home, ArrowLeftRight } from 'lucide-react'
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Separator } from "@/components/ui/separator"

// HR Management specific data

export default function Layout({ children }) {
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    )
  }