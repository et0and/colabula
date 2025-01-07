import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container px-4 md:px-6 py-6 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:hidden">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/hero.svg"
                  alt="Illustration of a person using Aratuku"
                  className="object-contain"
                  fill
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              All-in-one workspace for art teachers
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Share. Grade. Collaborate.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <Button
              size="lg"
              className="relative overflow-hidden px-6 py-2.5 font-medium text-white bg-gradient-to-b from-orange-500 to-orange-600 shadow-xl transition-all duration-200 ease-in-out hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 active:scale-[0.98] animate-glow"
              asChild
            >
              <Link href="/sign-up">
                Get Aratuku free{" "}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trusted by teachers at
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <Image
                src="/tgs_layerstyle.svg"
                alt="Takapuna Grammar School"
                className="md:h-8 h-7 w-auto"
                width={100}
                height={32}
              />
              <Image
                src="/liston_layerstyle.svg"
                alt="Liston College"
                className="md:h-8 h-7 w-auto"
                width={100}
                height={32}
              />
              <Image
                src="/westlake_layerstyle.svg"
                alt="Westlake Boys High School"
                className="md:h-8 h-7 w-auto"
                width={100}
                height={32}
              />
              <Image
                src="/lynfield_layerstyle.svg"
                alt="Lynfield College"
                className="md:h-8 h-7 w-auto"
                width={100}
                height={32}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full h-[600px]">
            <Image
              src="/hero.svg"
              alt="Illustration of a person using Aratuku"
              className="object-contain"
              fill
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
