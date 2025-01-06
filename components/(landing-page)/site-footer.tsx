import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="Aratuku Logo" className="h-36 w-36" />
            </Link>
            <p className="text-gray-500">Aratuku, a product by Cold Sundays</p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Cold Sundays, Ltd.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                English
              </Button>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Cookie settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinks = [
  {
    title: "Company",
    links: ["About us", "Blog", "Status", "Terms & privacy"],
  },
  {
    title: "Resources",
    links: ["Help center", "Pricing", "Blog"],
  },
  {
    title: "Aratuku for",
    links: ["Schools", "Teachers", "Researchers", "Explore more →"],
  },
];
