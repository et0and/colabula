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

export default function SharingPage() {
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
                <BreadcrumbPage>Sharing</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex flex-row gap-2">
            <span className="align-middle">Sharing</span>
          </h1>
          <h2 className="text-xl font-semibold mb-3">
            General Consent and Permissions
          </h2>
          <p className="mb-4">
            All sharing of student work outside of the Colabula platform
            requires explicit written permission from the student and their
            parent/guardian if the student is under 18 years of age. The
            original consent given for uploading work to Colabula does not
            extend to any external platforms, websites, or physical
            reproduction. Teachers must obtain separate documented approval
            before sharing student work in any format outside of Colabula.
          </p>
          <h2 className="text-xl font-semibold mb-3">
            Social Media and External Platforms
          </h2>
          <p className="mb-4">
            Student portfolios and work may not be distributed on social media
            platforms (including but not limited to Instagram, Facebook,
            Twitter, TikTok, LinkedIn) without:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Written consent from the student (and parent/guardian if
              applicable)
            </li>
            <li>Explicit permission from the supervising teacher</li>
            <li>
              Clear documentation of how the work will be used and displayed{" "}
            </li>
          </ul>
          <p className="mb-4">
            Any sharing permissions granted are specific to the stated purpose
            and platform and do not transfer to other uses or platforms.
          </p>
          <h2 className="text-xl font-semibold mb-3">
            Educational Use and Professional Sharing
          </h2>
          <p className="mb-4">
            Educators wishing to share student work with other education
            professionals must:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {" "}
            <li>
              Obtain prior written permission from the student and teacher
            </li>{" "}
            <li>Maintain strict control over any copies or reproductions </li>
            <li>
              Use the work solely for educational or professional development
              purposes{" "}
            </li>
            <li>
              Ensure the work is shared only within secure, professional
              educational contexts
            </li>
            <li>
              Commercial use of student work is strictly prohibited without
              explicit written agreement from all parties involved.
            </li>{" "}
          </ul>
          <h2 className="text-xl font-semibold mb-3">
            Student Rights and Control
          </h2>
          <p className="mb-4">
            Students retain full intellectual property rights over their work.
          </p>
          <p className="mb-4">
            Students may share their own portfolios and work as they choose,
            provided:
          </p>{" "}
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {" "}
            <li>
              The work does not contain collaborative elements requiring other
              students&apos; permission
            </li>{" "}
            <li>Their teacher has approved the portfolio for public viewing</li>{" "}
            <li>
              They link directly to their Colabula portfolio rather than
              creating external copies
            </li>{" "}
            <li>
              Students have the right to request removal or restriction of their
              work at any time
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-3">
            Modifications and Adaptations
          </h2>
          <p className="mb-4">
            No alterations, edits, or modifications to student work are
            permitted without:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Written permission from the student (and parent/guardian if
              applicable){" "}
            </li>
            <li>Clear documentation of the intended changes</li>
            <li>Approval from the supervising teacher</li>
          </ul>
          <p className="mb-4">
            Any approved modifications must maintain the integrity of the
            original work and credit the student appropriately.
          </p>
          <h2 className="text-xl font-semibold mb-3">
            Copyright and Ownership
          </h2>{" "}
          <p className="mb-4">
            Students retain full intellectual copyright of their work. Colabula
            and Cold Sundays Ltd serve solely as platform providers and content
            custodians.
          </p>
          <p className="mb-4">
            The open-source nature of the Colabula platform does not extend to
            any user-generated content. Teachers and schools may not claim
            ownership of student work uploaded to the platform.
          </p>
          <h2 className="text-xl font-semibold mb-3">
            Enforcement and Liability
          </h2>
          <p className="mb-4">
            Colabula monitors for potential misuse but cannot guarantee
            prevention of unauthorised sharing. Users found violating these
            sharing guidelines may have their platform access restricted or
            terminated. While Colabula will assist in addressing violations,
            ultimate responsibility for proper sharing lies with the user. Users
            who share content in violation of these guidelines may be held
            legally responsible for any resulting damages.
          </p>
          <p className="mb-4">
            For any questions regarding sharing permissions or to report
            unauthorised use of student work, please contact Colabula&apos;s
            support team immediately at support@colabula.com.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
