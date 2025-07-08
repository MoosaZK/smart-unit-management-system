"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRole } from "@/context/role-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
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
            Normal Login
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
  );
} 