import Link from "next/link";
import { siteFooterContent } from "@/lib/strings";

export function SiteFooter() {
  return (
    <footer className="">
      <div className="px-4 md:px-6 py-12">
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()}{" "}
              {siteFooterContent.copyright.company}
            </p>

            <div className="flex gap-4 md:gap-8 mt-4 md:mt-0">
              {siteFooterContent.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link text-sm"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
