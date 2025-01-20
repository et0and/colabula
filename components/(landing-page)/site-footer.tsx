"use client";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { siteFooterContent } from "@/lib/strings";

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
                <Link href="https://cold-sundays.com">
                  {siteFooterContent.copyright.company}
                </Link>
              </span>
            </p>

            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()}{" "}
              {siteFooterContent.copyright.company} All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">
                {siteFooterContent.links.company.title}
              </h3>
              <ul className="space-y-2">
                {siteFooterContent.links.company.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-black"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">
                {siteFooterContent.links.socials.title}
              </h3>
              <ul className="space-y-2">
                {siteFooterContent.links.socials.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-black"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">
                {siteFooterContent.links.legal.title}
              </h3>
              <ul className="space-y-2">
                {siteFooterContent.links.legal.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-black"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
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
