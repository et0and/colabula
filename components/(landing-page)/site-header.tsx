import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="ml-6 font-bold">Aratuku</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="flex items-center gap-2">
              Product
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              Schools
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              Open Source
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost">Pricing</Button>
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Button variant="ghost" className="hidden md:flex">
            Request a demo
          </Button>
          <Button variant="secondary" className="flex" asChild>
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button
            asChild
            className="bg-orange-600 hover:bg-orange-800 font-medium"
          >
            <Link href="sign-up">Get Aratuku</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
