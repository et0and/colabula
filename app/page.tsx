import { SiteHeader } from "@/components/(landing-page)/site-header";
import { HeroSection } from "@/components/(landing-page)/(sections)/hero-section";
import { FeaturesSection } from "@/components/(landing-page)/(sections)/features-section";
import { GetStartedSection } from "@/components/(landing-page)/(sections)/get-started-section";
/* import { TemplatesSection } from "@/components/(landing-page)/(sections)/templates-section";
import { ToolsSection } from "@/components/(landing-page)/(sections)/tools-section"; */
import { SiteFooter } from "@/components/(landing-page)/site-footer";
import { ProductShowcase } from "@/components/(landing-page)/(sections)/product-showcase";
/* import { ProductShowcase } from "@/components/(landing-page)/(sections)/product-showcase";
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F2F6F9]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <FeaturesSection />
        <ProductShowcase />{" "}
        {/*         <TemplatesSection />
         */}{" "}
        {/* <ToolsSection /> */}
        <GetStartedSection />
      </main>
      <SiteFooter />
    </div>
  );
}
