import { Brain, GitBranch, Zap } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="container px-4 md:px-6 py-12 border-b">
      <div className="max-w-[1200px] mx-auto">
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get feedback from a community of educators.
          </h2>
          <p className="text-gray-500 md:text-xl">
            Connected to all secondary schools across Aotearoa, Tabula has a
            national network of teachers and educators.
          </p>
          <button className="text-blue-500 font-medium hover:underline">
            Join the network →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-3">
            <Brain className="h-8 w-8" />
            <h3 className="font-semibold">Instant tagging</h3>
            <p className="text-gray-500">
              Let AI generate tags and identify key subject matter.
            </p>
          </div>
          <div className="space-y-3">
            <GitBranch className="h-8 w-8" />
            <h3 className="font-semibold">Open Source</h3>
            <p className="text-gray-500">
              Build upon an open source platform, licensed A-GPL.
            </p>
          </div>
          <div className="space-y-3">
            <Zap className="h-8 w-8" />
            <h3 className="font-semibold">Cloud storage connections beta</h3>
            <p className="text-gray-500">
              Microsoft OneDrive, Google Drive, Dropbox and more - all in one
              place, faster than ever.
            </p>
          </div>
        </div>

        {/* <div className="rounded-xl border bg-gray-50/50 p-6 md:p-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Campaign brainstorm</h3>
            <div className="space-y-2">
              <p>
                Brainstorm the creative marketing campaigns to promote our new
                cloud-based collaboration tool
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Offer discounts to early adopters of the product</li>
                <li>
                  Write and promote blog posts about the everyday benefits of
                  using the product
                </li>
                <li>
                  Create a YouTube video series with influencers talking about
                  their favorite features
                </li>
                <li>
                  Organize a webinar to introduce the product to potential
                  customers
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
