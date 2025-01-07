import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="">
      <div className="px-4 md:px-6 py-12">
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Cold Sundays, Ltd.
            </p>
            <div className="flex gap-4 md:gap-8 mt-4 md:mt-0">
              <Link href="/about" className="link text-sm">
                About us
              </Link>
              <Link href="https://status.aratuku.com" className="link text-sm">
                Status
              </Link>
              <Link
                href="https://github.com/et0and/aratuku"
                className="link text-sm"
              >
                Source code
              </Link>{" "}
              <Link href="/privacy" className="link text-sm">
                Privacy Policy
              </Link>{" "}
              <Link href="/tos" className="link text-sm">
                Terms of Service{" "}
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
