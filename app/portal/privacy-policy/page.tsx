import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>Privacy Policy</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex flex-row gap-2">
            <span className="align-middle">Privacy Policy</span>
          </h1>

          <h2 className="font-semibold text-xl">Introduction</h2>
          <p className="mb-4 ">
            This Privacy Policy explains how Tabula, operated by{" "}
            <a href="https://cold-sundays.com" className="link" target="_blank">
              Cold Sundays Ltd
            </a>{" "}
            (a subsidiary of{" "}
            <a href="https://yufugumi.com" className="link" target="_blank">
              Yufugumi Holdings
            </a>
            ), collects, uses, and protects your information when you use our
            platform.
          </p>

          <h2 className="font-semibold text-xl">
            Data Collection and Analytics
          </h2>
          <p className="mb-4 ">
            We use{" "}
            <a href="https://posthog.com" className="link" target="_blank">
              Posthog
            </a>{" "}
            as our analytics provider to collect non-identifiable information
            about platform usage. This helps us improve our services and user
            experience. The collected data is anonymized and used solely for
            analytical purposes.
          </p>

          <h2 className="font-semibold text-xl">
            Content Ownership and Rights
          </h2>
          <p className="mb-4 ">
            Tabula, Cold Sundays Ltd, and Yufugumi Holdings do not claim
            ownership of any content uploaded to the platform. All rights remain
            with the respective copyright holders and authors.
          </p>

          <h2 className="font-semibold text-xl">
            Teacher Responsibilities and Consent
          </h2>
          <p className="mb-4 ">
            Teachers must obtain explicit consent and permission from students
            (and their guardians where applicable) before uploading any student
            work to Tabula. This includes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Written consent for sharing student artwork</li>
            <li>Permission to use work for educational purposes</li>
            <li>Clear communication about how the work will be used</li>
          </ul>

          <h2 className="font-semibold text-xl">Data Storage and Security</h2>
          <p className="mb-4 ">
            We store data using secure cloud infrastructure through Cloudflare
            R2. All data transmissions are encrypted, and we implement
            industry-standard security measures to protect your information.
          </p>

          <h2 className="font-semibold text-xl">User Data and Privacy</h2>
          <p className="mb-4">We collect and store:</p>
          <ul className="mb-4 list-disc list-inside">
            <li>Email addresses for authentication</li>
            <li>User-generated content (artwork, comments, feedback)</li>
            <li>Basic usage data for platform functionality</li>
          </ul>

          <h2 className="font-semibold text-xl">Open Source Commitment</h2>
          <p className="mb-4 ">
            Tabula is an open-source platform licensed under{" "}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html#license-text"
              className="link"
              target="_blank"
            >
              AGPL-3.0
            </a>
            . Our commitment to transparency extends to our privacy practices,
            and our source code is publicly available for review.
          </p>

          <h2 className="font-semibold text-xl">Changes to Privacy Policy</h2>
          <p className="mb-4 ">
            We reserve the right to update this privacy policy as needed. Users
            will be notified of any significant changes.
          </p>

          <h2 className="font-semibold text-xl">Contact Information</h2>
          <p className="mb-4 ">
            For privacy-related inquiries, please contact us at
            privacy@tabula.org.nz.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
