import { AppSidebar } from "../../_components/app-sidebar";
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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participating schools",
  description: "Learn about the schools participating in the Colabula platform",
  openGraph: {
    title: "Participating schools",
    description:
      "Learn about the schools participating in the Colabula platform",
  },
};

export default function ParticipatingSchoolsPage() {
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
                <BreadcrumbLink>Participating schools</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="container mx-auto px-4 py-8">
          <p className="mb-4">
            Currently, Colabula is conducting a pilot program with the following
            schools:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {/*  <li>Liston College</li>
            <li>Takapuna Grammar School</li>
            <li>Waitakere College</li> */}
          </ul>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
