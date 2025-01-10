import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
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
              <BreadcrumbPage>
                <Skeleton className="h-4 w-24" />
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="mb-6">
              <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </CardHeader>

              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </CardContent>

              <CardFooter className="space-y-2">
                {/* Comment input skeleton */}
                <Skeleton className="h-10 w-full mb-4" />

                {/* Multiple comment skeletons */}
                {[1, 2].map((commentIndex) => (
                  <div key={commentIndex} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>

                    {/* Reply skeleton */}
                    <div className="ml-8 space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-2 w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
