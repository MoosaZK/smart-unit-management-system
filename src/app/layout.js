import { Inter } from "next/font/google";
import "./globals.css";
import { NavWrapper } from "@/components/nav-wrapper";
import { RoleProvider } from "@/context/role-context";

const inter = Inter({ subsets: ["latin"] });

const navProjects = [
  { name: "HR Management", url: "/hr-management" },
  { name: "TPT & LOG", url: "/tpt-log" },
  { name: "Healthcare", url: "/healthcare/sickbay" },
  { name: "Maintenance", url: "/maintenance/complain-management" },
];

const navUser = {
  name: "Lt. Abdurrahman Dar",
  email: "abdurrahman.dar@us.navy.mil",
  avatar: "/avatars/shadcn.jpg",
};

export const metadata = {
  title: "Smart Unit Management System",
  description: "A smart unit for the Pakistan Navy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RoleProvider>
          <NavWrapper projects={navProjects} user={navUser} />
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
