'use client'
import React from 'react'
import {AppSidebar} from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full px-4 '>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    )
  }