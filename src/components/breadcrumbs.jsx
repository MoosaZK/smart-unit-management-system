"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Skip rendering breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  // Split the pathname into segments
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      name: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      href: `/${segment}`,
      isCurrentPage: pathname === `/${segment}`,
    }));

  // For nested routes, calculate the full path for each segment
  segments.forEach((segment, index) => {
    if (index > 0) {
      segment.href = segments
        .slice(0, index + 1)
        .map((s) => s.name.toLowerCase().replace(/ /g, "-"))
        .join("/");
      segment.href = `/${segment.href}`;
      segment.isCurrentPage = pathname === segment.href;
    }
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => (
          <React.Fragment key={segment.href}>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </li>
            <li>
              {segment.isCurrentPage || index === segments.length - 1 ? (
                <span className="font-medium text-foreground">
                  {segment.name}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {segment.name}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
