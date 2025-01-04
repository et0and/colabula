import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardLink,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Handshake } from "lucide-react";

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
                <BreadcrumbLink>Community</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Contribution guide</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex flex-row gap-2">
            <Handshake className="w-8 h-8 align-middle inline-block hidden md:block" />
            <span className="align-middle">Contributing on Tabula</span>
          </h1>

          <p className="mb-6">
            Tabula is a shared collaborative platform. For getting the most out
            of your time here, we have a few small house-keeping rules.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:bg-muted">
              <CardLink href="/portal/contributing/etiquette">
                <CardHeader>
                  <CardTitle>Etiquette</CardTitle>
                  <CardDescription>
                    Communicating with other teachers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn how to provide constructive feedback and engage
                    professionally with fellow art educators on the platform.
                  </p>
                </CardContent>
              </CardLink>
            </Card>

            <Card className="hover:bg-muted">
              <CardLink href="/portal/contributing/privacy">
                <CardHeader>
                  <CardTitle>Privacy</CardTitle>
                  <CardDescription>
                    Ensuring student privacy is respected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Understand our guidelines for handling student artwork and
                    personal information with appropriate care and consent.
                  </p>
                </CardContent>
              </CardLink>
            </Card>

            <Card className="hover:bg-muted">
              <CardLink href="/portal/contributing/sharing">
                <CardHeader>
                  <CardTitle>Sharing</CardTitle>
                  <CardDescription>
                    Seeking permissions for sharing content outside of Tabula
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Follow our process for obtaining proper permissions before
                    sharing any student work outside of the Tabula platform.
                  </p>
                </CardContent>
              </CardLink>
            </Card>

            <Card className="hover:bg-muted">
              <CardLink href="/portal/contributing/format">
                <CardHeader>
                  <CardTitle>Uploading</CardTitle>
                  <CardDescription>
                    How to ensure the best outcome when adding a portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Get guidance on image formats, file sizes, and metadata
                    requirements for optimal portfolio submissions.
                  </p>
                </CardContent>
              </CardLink>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
