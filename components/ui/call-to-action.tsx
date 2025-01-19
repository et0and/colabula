import { MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CTA() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>Try a better way</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl max-w-xl font-regular">
              Join Colabula
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
              We are in early beta but are quickly growing and developing new
              features every week.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button className="gap-4">
              Sign up <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
