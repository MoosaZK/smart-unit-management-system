"use client";
import { createContext, useContext, useEffect, useState } from "react";

const RoleContext = createContext({ role: null, setRole: () => {}, authenticated: false, setAuthenticated: () => {} });

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Load initial role from localStorage if present
    const stored = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    if (stored) setRole(stored);
  }, []);

  useEffect(() => {
    const storedAuth = typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") : null;
    if (storedAuth === "true") setAuthenticated(true);
  }, []);

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