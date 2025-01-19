"use client";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";

function Footer() {
  return (
    <footer className="pt-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-8" />
              <p className="text-lg font-bold">Colabula</p>
            </Link>

            <p className="mt-4">
              A product by{" "}
              <span>
                <Link href="https://cold-sundays.com">Cold Sundays</Link>
              </span>
            </p>

            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} Cold Sundays. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-black"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://status.colabula.com"
                    className="text-gray-600 hover:text-black"
                  >
                    Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/et0and/colabula"
                    className="text-gray-600 hover:text-black"
                  >
                    Source code
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/et0and/colabula"
                    className="text-gray-600 hover:text-black"
                  >
                    Github
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://x.com/tomhackshaw"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-black"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tos"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-8 items-center justify-center">
          <p className="text-center text-3xl md:text-5xl lg:text-[20rem] font-medium bg-clip-text text-transparent bg-gradient-to-t from-neutral-700 via-neutral-400 to-transparent select-none">
            colabula*
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
