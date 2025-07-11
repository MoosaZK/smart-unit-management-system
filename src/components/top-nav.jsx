"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRole } from "@/context/role-context";
import { useRouter } from "next/navigation";

// Top navigation bar component
export function TopNav({ projects = [], user }) {
  const { role, setRole, setAuthenticated } = useRole();
  const router = useRouter();
  let filteredProjects = projects;
  if (role === "MENTO") {
    filteredProjects = projects.filter((p) => p.name === "Maintenance");
  } else if (role === "SMO") {
    filteredProjects = projects.filter((p) => p.name === "Healthcare");
  }
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-navy-700 to-navy-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center text-lg font-semibold tracking-wide gap-2"
        >
          <Image
            src="/images/logo.jpeg"
            alt="Logo"
            width={50}
            height={50}
            className="h-10 w-10"
          />
          Smart Unit Management System
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.name}
                href={project.url}
                className="flex items-center gap-1 text-sm font-medium hover:text-navy-100 transition-colors"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {project.name}
              </Link>
            );
          })}
        </div>

        {/* User dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">
                  {user.name?.split(" ")[0]}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-48 p-2 rounded-md"
            >
              <DropdownMenuItem disabled>{user.name}</DropdownMenuItem>
              <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setRole(null);
                  setAuthenticated(false);
                  router.push("/login");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Mobile hamburger */}
        <div className="md:hidden ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-white/10 focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-44 p-2 rounded-md"
            >
              {filteredProjects.map((project) => (
                <DropdownMenuItem asChild key={project.name}>
                  <Link href={project.url}>{project.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
