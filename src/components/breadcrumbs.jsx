"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React from "react"

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Start with Dashboard as the first breadcrumb
  const breadcrumbs = [];
  breadcrumbs.push({ title: "Dashboard", href: "/" });

  // Split the URL and generate breadcrumbs for remaining segments
  const segments = pathname.split('/').filter(segment => segment !== '');
  let currentPath = "";
  segments.forEach(segment => {
    // Skip numeric segments and any unnecessary segments
    if (!isNaN(Number(segment))) return;
    if (["classrooms", "assignments", "submissions"].includes(segment)) return;
    
    currentPath += `/${segment}`;
    const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({ title, href: currentPath });
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>
                  {crumb.title}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
} 