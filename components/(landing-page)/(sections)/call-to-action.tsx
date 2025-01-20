"use client";
import { Badge } from "@/components/ui/badge";
import SignUpButton from "./sign-up-button";
import { ctaContent } from "@/lib/strings";

function CTA() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col text-center bg-muted rounded-lg p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>{ctaContent.badge}</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl max-w-xl font-regular">
              {ctaContent.title}
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
              {ctaContent.description}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <SignUpButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
