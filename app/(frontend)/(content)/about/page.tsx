import { SiteHeader } from "@/components/(landing-page)/site-header";
import { Footer } from "@/components/(landing-page)/site-footer";
import { aboutPageContent, companyInfo } from "@/lib/strings";

export const metadata = {
  title: "About",
  description: "About Colabula",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center md:text-5xl text-3xl mb-8">
            {aboutPageContent.title}
          </h1>

          <p className="mb-4">
            {aboutPageContent.mainContent}{" "}
            <a
              href={companyInfo.coldSundays.url}
              className="link"
              target="_blank"
            >
              {companyInfo.coldSundays.name}
            </a>{" "}
            (a subsidiary of{" "}
            <a href={companyInfo.yufugumi.url} className="link" target="_blank">
              {companyInfo.yufugumi.name}
            </a>
            )
          </p>

          <h2 className="font-semibold text-xl">
            {aboutPageContent.sections.mission.title}
          </h2>
          <p className="mb-4">{aboutPageContent.sections.mission.content}</p>

          <h2 id="promise" className="font-semibold text-xl">
            {aboutPageContent.sections.promise.title}
          </h2>
          <p className="mb-4">{aboutPageContent.sections.promise.content}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
