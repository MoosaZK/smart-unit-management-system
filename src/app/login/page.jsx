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
    // For demo purposes we do not check credentials
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
      {/* Left side with full-height logo */}
      <div className="relative hidden lg:block lg:w-1/2 bg-slate-50">
        <Image
          src="/images/logo.jpeg"
          alt="SUMS Logo"
          fill
          className="object-contain "
          priority
        />
      </div>

      {/* Right side with login card */}
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
              Login as SMO
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}