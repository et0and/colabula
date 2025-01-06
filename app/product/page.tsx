import { SiteHeader } from "@/components/(landing-page)/site-header";
import { SiteFooter } from "@/components/(landing-page)/site-footer";
import { Brain } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center text-5xl mb-8">
            Aratuku <Brain className="mx-2" size={48} /> product features
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              The Aratuku platform is designed to facilitate collaboration and
              feedback among art teachers across New Zealand. Here are its key
              features:
            </p>
            <h2 className="text-lg font-semibold">
              Progress tracking and sharing
            </h2>
            <p>
              {" "}
              Teachers can upload student artwork at various stages, from
              initial concepts to final portfolios. The platform supports
              various image formats with a file size limit of up to 50MiB per
              image, allowing for the sharing of high-resolution work. This
              feature enables colleagues to provide early guidance and iterative
              feedback, ensuring students are on track with assessment criteria.
            </p>
            <h2 className="text-lg font-semibold">
              Collaborative feedback and discussion
            </h2>{" "}
            <p>
              Aratuku fosters a national network of art educators, promoting
              ongoing professional development and the sharing of best
              practices. Teachers can engage in discussions, offer constructive
              critiques, and provide indicative grades using structured
              assessment tools, helping to maintain consistency in assessment
              across different schools and regions.
            </p>
            <h2 className="text-lg font-semibold">Privacy and consent</h2>
            <p>
              The platform emphasizes the importance of student privacy.
              Teachers are required to obtain explicit consent from students and
              their guardians before uploading any artwork. Personal
              identifiable information is to be removed or obscured, and sharing
              is restricted to verified art educators within the network.
              Students retain the right to request the removal of their work,
              and the platform ensures the protection of their intellectual
              property.
            </p>
            <h2 className="text-lg font-semibold">Technical features</h2>
            <ul className="list-disc list-inside">
              <li>
                Built using Next.js 15 and React 19 with App Router and
                TypeScript.
              </li>
              <li>Frontend design built using Tailwind CSS and Shadcn UI.</li>
              <li>
                PostgreSQL with Prisma ORM and Supabase for database management.
              </li>
              <li>Cloudflare R2 for secure cloud data storage.</li>
              <li>Licensed AGPL-3.0.</li>
            </ul>
            <p>
              These features collectively aim to create a supportive and
              connected art education community, ultimately benefiting both
              teachers and students in New Zealand.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
