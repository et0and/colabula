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

export default function UploadingPage() {
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
                <BreadcrumbPage>Uploading</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex flex-row gap-2">
            <span className="align-middle">Uploading</span>
          </h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Supported formats</h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Accepted formats: JPG, PNG, or WEBP</li>
                <li>Maximum file size: 50MiB per image</li>
                <li>
                  Prefer high resolution images - we handle optimisation
                  automatically
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Image compression</h2>
              <p>For files exceeding 50MiB, use these tools to compress:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Adobe Photoshop</li>
                <li>GIMP (Free)</li>
                <li>Squoosh.app (Web-based)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Photography tips</h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Capture one full-frame shot of the entire portfolio board
                </li>
                <li>Ensure even lighting across the work</li>
                <li>Take additional close-up photos of important details</li>
              </ul>
            </section>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
