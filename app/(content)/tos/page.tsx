import { SiteHeader } from "@/components/(landing-page)/site-header";
import { SiteFooter } from "@/components/(landing-page)/site-footer";
import { termsOfServiceContent } from "@/lib/strings";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">
            {termsOfServiceContent.title}
          </h1>

          <div className="space-y-8">
            {termsOfServiceContent.sections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <h2 className="text-2xl font-semibold">{section.heading}</h2>
                <div className="text-lg leading-relaxed">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
