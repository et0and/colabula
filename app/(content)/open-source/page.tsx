import { SiteHeader } from "@/components/(landing-page)/site-header";
import { SiteFooter } from "@/components/(landing-page)/site-footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="font-bold flex items-center md:text-5xl text-3xl mb-8">
            Aratuku is an open platform
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Many educational technology companies have created products that
              seemed promising at first but eventually disappeared, leaving
              schools and students without the tools they depended on.
            </p>

            <p>
              Consider Pond - a shared education resources platform run by
              Network for Learning (N4L) that was once hugely popular with
              teachers in New Zealand,{" "}
              <a href="https://www.n4l.co.nz/a-pond-farewell/" className="link">
                but was suddenly closed in 2019
              </a>
              . Similarly, VisArtsNet, a very popular mailing list run by the
              Ministry of Education via the TKI Mailing List was recently
              shutdown, effectively deleting all content and conversations that
              had been shared there. Besides Facebook groups, there are no other
              alternatives for teachers to use to share resources with each
              other.
            </p>

            <p>
              While platforms such as Facebook and Instagram are convenient,
              free and easy to use, their privacy policies and terms of service
              means that any content submitted to these platforms is granted use
              by Meta for AI training, 3rd party advertising, and can be used
              for any purpose. This is not acceptable for a platform that is
              used to share educational resources.
            </p>

            <p>
              Open-source software like Aratuku, which uses the AGPL 3.0
              license, helps solve this problem by making its code freely
              available to everyone. Since the code is open for anyone to study,
              people can find and fix security problems quickly, and schools can
              trust that their data is being handled properly. Should Aratuku in
              its current form ever shutdown, anyone has fork the code and host
              their own instance.
            </p>

            <p>
              Schools can also modify Aratuku to work exactly the way they need
              it to, instead of having to follow what a company like Meta
              decides is best.
            </p>

            <p>
              By sharing our code openly, we intend to help others who want to
              create better educational software, leading to more innovation and
              greater outcomes for everyone.
            </p>

            <p>
              For the content and conversations published, we adhere to the {""}
              <Link href="/about#promise" className="link">
                &quot;Aratuku Promise&quot;
              </Link>{" "}
              - we will provide full Postgres and storage exports to any parties
              wishing to host their own instance should Aratuku ever fold.
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
