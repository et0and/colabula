import Image from "next/image";
import {
  Book,
  BarChart2,
  Target,
  FileText,
  Plane,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function TemplatesSection() {
  return (
    <section className="container px-4 md:px-6 py-12 border-b">
      <div className="max-w-[1200px] mx-auto">
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Start with a template.
            <br />
            Build anything.
          </h2>
          <Button
            variant="link"
            className="text-blue-500 p-0 h-auto font-medium hover:underline"
          >
            Browse all templates →
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.title}
              className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                {template.icon}
                <span className="font-medium">{template.title}</span>
              </div>
              <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                <Image
                  src={template.image}
                  alt={template.title}
                  className="object-cover transition-transform group-hover:scale-105"
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const templates = [
  {
    title: "Company Wiki",
    icon: <Book className="h-5 w-5 text-red-500" />,
    image: "/placeholder.svg",
  },
  {
    title: "Project Roadmap",
    icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
    image: "/placeholder.svg",
  },
  {
    title: "OKRs",
    icon: <Target className="h-5 w-5 text-orange-500" />,
    image: "/placeholder.svg",
  },
  {
    title: "Meeting Notes",
    icon: <FileText className="h-5 w-5 text-yellow-500" />,
    image: "/placeholder.svg",
  },
  {
    title: "Vacation Planner",
    icon: <Plane className="h-5 w-5 text-red-500" />,
    image: "/placeholder.svg",
  },
  {
    title: "Editorial Calendar",
    icon: <Calendar className="h-5 w-5 text-green-500" />,
    image: "/placeholder.svg",
  },
];
