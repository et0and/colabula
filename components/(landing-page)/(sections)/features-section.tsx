import { Brain, GitBranch, Zap } from "lucide-react";
import { featuresContent } from "@/lib/strings";
import { CommentsUi } from "./comments-ui";
export function FeaturesSection() {
  return (
    <section className="container px-4 md:px-6 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex gap-8 mb-12" role="presentation">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" id="features-title">
              {featuresContent.title}{" "}
            </h2>
            <p className="text-gray-500 md:text-xl">
              {featuresContent.description}
            </p>
          </div>
          <div className="hidden md:block">
            <CommentsUi />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-3">
            <Brain className="h-8 w-8" />
            <h3 className="font-semibold">{featuresContent.featureOneTitle}</h3>
            <p className="text-gray-500">
              {featuresContent.featureOneDescription}
            </p>
          </div>
          <div className="space-y-3">
            <GitBranch className="h-8 w-8" />
            <h3 className="font-semibold">{featuresContent.featureTwoTitle}</h3>
            <p className="text-gray-500">
              {featuresContent.featureTwoDescription}
            </p>
          </div>
          <div className="space-y-3">
            <Zap className="h-8 w-8" />
            <h3 className="font-semibold">
              {featuresContent.featureThreeTitle}
            </h3>
            <p className="text-gray-500">
              {featuresContent.featureThreeDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
