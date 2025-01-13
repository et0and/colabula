"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { whitelistEmails } from "@/lib/constants";
import { NoticeBanner } from "./_components/notice";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <NoticeBanner />
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 py-8">
        <Card className="z-50 rounded-xl max-w-md w-full mx-4">
          <CardHeader>
            <div className="flex justify-center items-center">
              <img src="/logo.svg" alt="Aratuku Logo" className="w-48 h-48" />
            </div>
            <CardTitle className="text-lg md:text-xl">
              Create an account
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your information to create a{" "}
              <span className="font-semibold">Aratuku</span> account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                if (form.checkValidity()) {
                  // Existing signup logic
                } else {
                  form.reportValidity();
                }
              }}
            >
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="Miki"
                      required
                      autoComplete="given-name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Yufu"
                      required
                      autoComplete="family-name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Profile image (optional)</Label>
                  <div className="flex items-end gap-4">
                    {imagePreview && (
                      <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Profile preview"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 w-full">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                      />
                      {imagePreview && (
                        <X
                          className="cursor-pointer"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  onClick={async () => {
                    if (
                      !email ||
                      !password ||
                      !firstName ||
                      !lastName ||
                      !passwordConfirmation
                    ) {
                      toast.error("Please fill in all required fields");
                      return;
                    }

                    if (password !== passwordConfirmation) {
                      toast.error("Passwords do not match");
                      return;
                    }

                    const domain = email.split("@")[1];
                    if (!whitelistEmails.includes(domain)) {
                      toast.error(
                        "Only authorised schools are allowed to register"
                      );
                      return;
                    }

                    setLoading(true);
                    try {
                      await signUp.email({
                        email,
                        password,
                        name: `${firstName} ${lastName}`,
                        image: image ? await convertImageToBase64(image) : "",
                        callbackURL: "/portal/painting",
                        fetchOptions: {
                          onResponse: () => {
                            setLoading(false);
                          },
                          onRequest: () => {
                            setLoading(true);
                          },
                          onError: (ctx) => {
                            toast.error(ctx.error.message);
                          },
                          onSuccess: async () => {
                            toast.success(
                              "A verification link has been sent to your email"
                            );
                          },
                        },
                      });
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Create an account"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex justify-center w-full border-t py-4">
              <p className="text-center text-xs text-neutral-500">
                Have an account?{" "}
                <Link href="/sign-in" className="link">
                  Login instead.
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
