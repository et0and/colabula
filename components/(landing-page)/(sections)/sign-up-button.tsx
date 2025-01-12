"use client";

import ShimmerButton from "@/components/ui/shimmer-button";
import { heroContent } from "@/lib/strings";
import { useRouter } from "next/navigation";

export default function SignUpButton() {
  const router = useRouter();

  return (
    <ShimmerButton
      shimmerSize="0.1em"
      onClick={() => router.push("/sign-up")}
      borderRadius="0.5rem"
      shimmerDuration="8s"
      shimmerColor="#f97316"
      className="relative overflow-hidden px-6 py-2.5 font-medium text-white bg-gradient-to-b from-orange-500 to-orange-600 shadow-xl transition-all duration-200 ease-in-out hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 active:scale-[0.98] animate-glow"
    >
      {heroContent.ctaButton}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
    </ShimmerButton>
  );
}
