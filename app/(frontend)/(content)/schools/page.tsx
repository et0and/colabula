import { SiteHeader } from "@/components/(landing-page)/site-header";
import { Footer } from "@/components/(landing-page)/site-footer";
import { schoolsPageContent } from "@/lib/strings";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center md:text-5xl text-3xl mb-8">
            {schoolsPageContent.title}
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            {schoolsPageContent.sections.map((section) => (
              <p key={section}>{section}</p>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
