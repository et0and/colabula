import {
  FileText,
  Book,
  Target,
  Sparkles,
  Calendar,
  Trophy,
  Globe,
  Layout,
} from "lucide-react";

export function ToolsSection() {
  return (
    <section className="container px-4 md:px-6 py-12 border-b">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
          Everything you need
          <br />
          to do your best work.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool) => (
            <div key={tool.title} className="space-y-3">
              {tool.icon}
              <h3 className="font-semibold flex items-center gap-2">
                {tool.title}
                <span className="text-gray-400">→</span>
              </h3>
              <p className="text-gray-500">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tools = [
  {
    title: "Docs",
    icon: <FileText className="h-8 w-8" />,
    description: "Simple, powerful, beautiful. Write, plan, share.",
  },
  {
    title: "Wiki",
    icon: <Book className="h-8 w-8" />,
    description: "Your team's home base for all your knowledge.",
  },
  {
    title: "Projects",
    icon: <Target className="h-8 w-8" />,
    description: "Manage any project from kickoff to ship.",
  },
  {
    title: "Notion AI",
    icon: <Sparkles className="h-8 w-8" />,
    description: "Write what you need. Docs know what you mean.",
  },
  {
    title: "Calendar",
    icon: <Calendar className="h-8 w-8" />,
    description: "See all your commitments in one place.",
  },
  {
    title: "Goals",
    icon: <Trophy className="h-8 w-8" />,
    description: "Track progress toward what's important.",
  },
  {
    title: "Sites",
    icon: <Globe className="h-8 w-8" />,
    description: "Make any page a website in seconds.",
  },
  {
    title: "Templates",
    icon: <Layout className="h-8 w-8" />,
    description: "Get started with one of thousands of templates.",
  },
];
