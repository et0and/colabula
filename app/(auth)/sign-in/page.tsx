"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 py-8">
      <Card className="z-50 rounded-xl max-w-md w-full mx-4">
        <CardHeader>
          <div className="flex justify-center items-center">
            <img src="/logo.svg" alt="Aratuku Logo" className="w-48 h-48" />
          </div>
          <CardTitle className="text-lg md:text-xl">Welcome back</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to{" "}
            <span className="font-semibold">Aratuku</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              if (form.checkValidity()) {
                // Existing sign in logic
              } else {
                form.reportValidity();
              }
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  onClick={() => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                onClick={async () => {
                  if (!email || !password) {
                    toast.error("Please enter both email and password");
                    return;
                  }

                  setLoading(true);
                  try {
                    await signIn.email({
                      email,
                      password,
                      callbackURL: "/portal/painting",
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>

              <div
                className={cn(
                  "w-full gap-2 flex items-center",
                  "justify-between flex-col",
                )}
              ></div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center w-full border-t py-4">
            <p className="text-center text-xs text-neutral-500">
              No account?{" "}
              <Link href="/sign-up" className="link">
                Create one.
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
