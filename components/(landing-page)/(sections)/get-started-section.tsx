import { getStartedContent } from "@/lib/strings";

export function GetStartedSection() {
  return (
    <section className="container px-4 md:px-6 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold sm:text-2xl md:text-3xl mb-2">
            {getStartedContent.title}{" "}
          </h2>
          <img
            src="/logo-dark.svg"
            alt="Colabula Logo"
            className="w-96 hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
