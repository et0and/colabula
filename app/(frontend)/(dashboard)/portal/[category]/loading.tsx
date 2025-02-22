import { AppSidebar } from "@/app/(frontend)/(dashboard)/portal/_components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { PostSkeleton } from "../_components/PostSkeleton";
import { createSkeletonArray } from "@/lib/skeleton";

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
          {createSkeletonArray(3).map((index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
