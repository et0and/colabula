import { SiteHeader } from "@/components/(landing-page)/site-header";
import { SiteFooter } from "@/components/(landing-page)/site-footer";
import { School } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center md:text-5xl text-3xl mb-8">
            Aratuku <School className="mx-2 hidden md:inline-block" size={48} />{" "}
            for schools{" "}
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Aratuku enables art teachers across New Zealand to collaborate and
              provide feedback on student work throughout the entire creative
              process, from initial sketches to final portfolios.
            </p>

            <p>
              Teachers can upload students&apos; initial concepts and sketches,
              allowing colleagues from other schools to provide early guidance
              and suggestions. This early feedback can help identify promising
              directions and potential challenges before significant time is
              invested.
            </p>

            <p>
              As students develop their work, teachers can share updates and
              receive ongoing feedback. This iterative feedback process helps
              ensure students are on track with assessment criteria and enables
              them to benefit from diverse perspectives across the New Zealand
              art education community.
            </p>

            <p>
              Using Aratuku&apos;s structured assessment tools, teachers can
              provide indicative grades and detailed feedback, helping to ensure
              consistency in assessment across different schools and regions.
            </p>

            <p>
              Through collaborative feedback and discussion, teachers can engage
              in ongoing professional development, sharing best practices and
              staying current with assessment standards and artistic trends.
            </p>

            <p className="mt-8">
              By fostering this collaborative environment, Aratuku helps create
              a more connected and supportive art education community across New
              Zealand, ultimately benefiting both teachers and students in their
              artistic journey.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
