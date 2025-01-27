import { AppSidebar } from "../../../_components/app-sidebar";
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

export default function EtiquettePage() {
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
                <BreadcrumbPage>Etiquette</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex flex-row gap-2">
            <span className="align-middle">Etiquette</span>
          </h1>

          <h2 className="font-semibold text-xl">Focus on the work</h2>
          <p className="mb-4">
            When providing feedback, focus your comments on the artwork and
            portfolio elements rather than the student or teacher. Frame your
            critique around the visual and technical aspects of the work being
            presented.
          </p>

          <h2 className="font-semibold text-xl">Constructive communication</h2>
          <p className="mb-4">
            Personal attacks or negative comments about individuals have no
            place on Colabula. Keep discussions professional and centered on
            artistic development.
          </p>

          <h2 className="font-semibold text-xl">
            Keep feedback aligned to Achievement Standards
          </h2>
          <p className="mb-4">
            Structure your feedback around NCEA Achievement Standards rather
            than personal preferences. Instead of &quot;I would do this
            differently,&quot; explain how certain choices align with or could
            better meet the standards.
          </p>

          <h2 className="font-semibold text-xl">The feedback sandwich</h2>
          <p className="mb-4">
            Use the proven &quot;praise sandwich&quot; approach when giving
            feedback:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Begin with specific positive aspects of the work</li>
            <li>Address areas for improvement or development</li>
            <li>Conclude with encouraging observations and potential</li>
          </ul>

          <h2 className="font-semibold text-xl">Be specific</h2>
          <p className="mb-4">
            Provide specific, actionable feedback rather than general comments.
            Explain exactly what elements are successful and why they work well
            in the context of the portfolio.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
