import { SiteHeader } from "@/components/(landing-page)/site-header";
import { SiteFooter } from "@/components/(landing-page)/site-footer";
import { HeartHandshake } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center md:text-5xl text-3xl mb-8">
            Aratuku{" "}
            <HeartHandshake className="mx-2 hidden md:inline-block" size={48} />{" "}
            open source
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Many educational technology companies have created products that
              seemed promising at first but eventually disappeared, leaving
              schools and students without the tools they depended on.
            </p>

            <p>
              When schools have to keep switching between different tools
              because old ones stop working, it makes teaching harder and wastes
              money and time.
            </p>

            <p>
              Open-source software like Aratuku, which uses the AGPL 3.0
              license, helps solve this problem by making its code freely
              available to everyone.
            </p>

            <p>
              When schools use regular commercial software, they can&apos;t see
              how it actually works or check if it&apos;s keeping student data
              safe.
            </p>

            <p>
              Since Aratuku&apos;s code is open for anyone to study, people can
              find and fix security problems quickly, and schools can trust that
              their data is being handled properly.
            </p>

            <p>
              Schools can also modify Aratuku to work exactly the way they need
              it to, instead of having to follow what a company decides is best.
            </p>

            <p>
              By sharing our code openly, we help other people who want to
              create educational software, which leads to more innovation and
              better tools for everyone.
            </p>

            <p>
              This approach of working together means schools can create exactly
              the right tools for their specific teaching needs.
            </p>

            <p>
              Aratuku isn&apos;t just making software – we&apos;re building a
              group of people who care about making education better for
              everyone.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
