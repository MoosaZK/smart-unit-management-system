"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRole } from "@/context/role-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { setRole, setAuthenticated } = useRole();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNormalLogin = () => {
    setRole(null);
    setAuthenticated(true);
    router.push("/");
  };

  const handleRoleLogin = (selectedRole) => {
    setRole(selectedRole);
    setAuthenticated(true);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Logo section: covers left half on large screens, top on small screens */}
      <div className="w-full lg:w-1/2 min-h-64 h-64 lg:h-auto flex-shrink-0 relative flex items-center justify-center bg-slate-50" >
        <Image
          src="/images/logo.jpeg"
          alt="SUMS Logo"
          fill
          className="object-contain mt-[15vh] lg:mt-0 lg:object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Login form */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 p-4">
        <Card className="w-full max-w-md border-2 border-navy-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleNormalLogin}>
              Login as CO
            </Button>
            <Button className="w-full" onClick={handleNormalLogin}>
              Login as OOD
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleRoleLogin("MENTO")}
            >
              Login as MENTO
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleRoleLogin("SMO")}
            >
              Login as HealthCare Staff
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleRoleLogin("SMO")}
            >
              Login as SMO
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
