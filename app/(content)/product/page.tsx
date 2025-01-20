import { SiteHeader } from "@/components/(landing-page)/site-header";
import { Footer } from "@/components/(landing-page)/site-footer";
import { productPageContent } from "@/lib/strings";

export default function ProductPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center md:text-5xl text-3xl mb-8">
            {productPageContent.title}
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            {productPageContent.sections.map((section, index) => (
              <div key={index}>
                {section.heading && (
                  <h2 className="text-lg font-semibold">{section.heading}</h2>
                )}
                {section.content && typeof section.content === "string" && (
                  <p>{section.content}</p>
                )}
                {section.list && (
                  <ul className="list-disc list-inside">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
