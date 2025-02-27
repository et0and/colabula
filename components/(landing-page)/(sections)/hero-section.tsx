import Image from "next/image";
import { heroContent } from "@/lib/strings";
import SignUpButton from "./sign-up-button";

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
                  alt="Illustration of a person using Colabula"
                  className="object-contain"
                  fill
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {heroContent.title}
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              {heroContent.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <SignUpButton />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {/*               {heroContent.trustedByText}
               */}{" "}
            </p>
            {/* <div className="flex flex-wrap gap-6 items-center">
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
            </div> */}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full h-[600px]">
            <Image
              src="/hero.svg"
              alt="Illustration of a person using Colabula"
              className="object-contain"
              fill
              priority
            />
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-center w-full mt-12 hidden md:block">
        <HeroVideoDialog
          animationStyle="from-center"
          videoSrc="/ara.mp4"
          thumbnailSrc="/portal.png"
          thumbnailAlt="Hero Video"
        />
      </div> */}
      {/* <div className="hidden sm:block">
        <MacbookScroll src="/portal2.png" />
      </div> */}
    </section>
  );
}
