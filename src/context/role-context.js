"use client";
import { createContext, useContext, useEffect, useState } from "react";

const RoleContext = createContext({ role: null, setRole: () => {}, authenticated: false, setAuthenticated: () => {} });

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("userRole") || null;
  });

  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Effects above replaced with lazy initialization in useState

  // Persist role changes
  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  }, [authenticated]);

  return (
    <RoleContext.Provider value={{ role, setRole, authenticated, setAuthenticated }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
} 