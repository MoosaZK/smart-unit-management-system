"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TopNav } from "@/components/top-nav";
import { useRole } from "@/context/role-context";

export function NavWrapper({ projects, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const { authenticated } = useRole();

  // Redirect logic
  useEffect(() => {
    if (!authenticated && pathname !== "/login") {
      router.replace("/login");
    } else if (authenticated && pathname === "/login") {
      router.replace("/");
    }
  }, [authenticated, pathname, router]);

  // Hide nav on login page
  if (pathname === "/login") {
    return null;
  }

  return <TopNav projects={projects} user={user} />;
} 