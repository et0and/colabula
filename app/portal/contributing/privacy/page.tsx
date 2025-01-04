import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

export default function PrivacyPage() {
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
                <BreadcrumbLink>Community</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/portal/contributing">Contribution guide</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Privacy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex flex-row gap-2">
            <span className="align-middle">Privacy guidelines</span>
          </h1>

          <p className="mb-4">
            Before uploading any student artwork, ensure you have their consent.
            This consent should specifically cover sharing work within the
            Tabula platform for educational, non-commercial purposes.
          </p>

          <p className="mb-4">
            Remove or obscure any personally identifiable information from
            artwork and descriptions, including full names, contact details, or
            location data. Use student IDs or initials when referencing work.
          </p>

          <p className="mb-4">
            When tagging and categorising artwork, focus on artistic elements,
            subject matter and achievement standards rather than personal
            student information. Include only relevant academic context such as
            year level and subject area.
          </p>

          <p className="mb-4">
            Restrict portfolio sharing to verified art educators within the
            Tabula network. Never share direct links to student work outside the
            platform without explicit permission.{" "}
            <a
              href="/portal/contributing/sharing"
              className="link"
              target="_blank"
            >
              Learn more about sharing portfolios
            </a>
            .
          </p>

          <p className="mb-4">
            Respect that students retain copyright of their artwork. The
            platform facilitates educational review while protecting student
            intellectual property rights.
          </p>

          <p className="mb-4">
            Should a student wish to have their work removed from the platform,
            they can email removal@tabula.org.nz. We will then remove the work
            and destroy it from our database permanently.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
