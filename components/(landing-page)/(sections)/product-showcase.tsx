"use client";

import { useEffect, useRef } from "react";
import { productShowcaseContent } from "@/lib/strings";

export function ProductShowcase() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-16 gap4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {productShowcaseContent.title}
        </h2>

        {/* Video 0: NCEA Standards */}
        <div className="relative">
          <div className="absolute w-full h-full scale-125 bg-white opacity-20 blur-xl pointer-events-none rounded-full" />
          <div className="relative w-[115%] max-w-[80vw] min-w-full rounded-2xl bg-cover mt-14 left-1/2 -translate-x-1/2 overflow-hidden aspect-[4/3] lg:aspect-video">
            <video
              ref={setVideoRef(0)}
              muted
              loop
              playsInline
              poster="/thumbs/ncea-standards.webp"
              className="w-full h-full object-cover"
            >
              <source src="/videos/ncea-standards.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-sm mt-4 text-gray-600 md:text-base text-center">
            {productShowcaseContent.nceaFeatureCaption}
          </p>
        </div>

        {/* Video 1: Submit Grades */}
        <div className="relative">
          <div className="absolute w-full h-full scale-125 bg-white opacity-20 blur-xl pointer-events-none rounded-full" />
          <div className="relative w-[115%] max-w-[80vw] min-w-full rounded-2xl bg-cover mt-14 left-1/2 -translate-x-1/2 overflow-hidden aspect-[4/3] lg:aspect-video">
            <video
              ref={setVideoRef(1)}
              muted
              loop
              playsInline
              poster="/thumbs/submit-grades.webp"
              className="w-full h-full object-cover"
            >
              <source src="/videos/submit-grades.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-sm mt-4 text-gray-600 md:text-base text-center">
            {productShowcaseContent.gradesFeatureCaption}
          </p>
        </div>

        {/* Video 2: Global Search */}
        <div className="relative">
          <div className="absolute w-full h-full scale-125 bg-white opacity-20 blur-xl pointer-events-none rounded-full" />
          <div className="relative w-[115%] max-w-[80vw] min-w-full rounded-2xl bg-cover mt-14 left-1/2 -translate-x-1/2 overflow-hidden aspect-[4/3] lg:aspect-video">
            <video
              ref={setVideoRef(2)}
              muted
              loop
              playsInline
              poster="/thumbs/global-search.webp"
              className="w-full h-full object-cover"
            >
              <source src="/videos/global-search.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-sm mt-4 text-gray-600 md:text-base text-center">
            {productShowcaseContent.globalSearchFeatureCaption}
          </p>
        </div>

        {/* Video 3: Auto Tags */}
        <div className="relative">
          <div className="absolute w-full h-full scale-125 bg-white opacity-20 blur-xl pointer-events-none rounded-full" />
          <div className="relative w-[115%] max-w-[80vw] min-w-full rounded-2xl bg-cover mt-14 left-1/2 -translate-x-1/2 overflow-hidden aspect-[4/3] lg:aspect-video">
            <video
              ref={setVideoRef(3)}
              muted
              loop
              playsInline
              poster="/thumbs/auto-tags.webp"
              className="w-full h-full object-cover"
            >
              <source src="/videos/auto-tags.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-sm mt-4 text-gray-600 md:text-base text-center">
            {productShowcaseContent.autoTaggingFeatureCaption}
          </p>
        </div>

        {/* Video 4: Share Link */}
        <div className="relative">
          <div className="absolute w-full h-full scale-125 bg-white opacity-20 blur-xl pointer-events-none rounded-full" />
          <div className="relative w-[115%] max-w-[80vw] min-w-full rounded-2xl bg-cover mt-14 left-1/2 -translate-x-1/2 overflow-hidden aspect-[4/3] lg:aspect-video">
            <video
              ref={setVideoRef(4)}
              muted
              loop
              playsInline
              poster="/thumbs/share-link.webp"
              className="w-full h-full object-cover"
            >
              <source src="/videos/share-link.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-sm mt-4 text-gray-600 md:text-base text-center">
            {productShowcaseContent.shareLinkFeatureCaption}
          </p>
        </div>

        {/* Video 5: Threaded Comments */}
        <div className="relative">
          <div className="absolute w-full h-full scale-125 bg-white opacity-20 blur-xl pointer-events-none rounded-full" />
          <div className="relative w-[115%] max-w-[80vw] min-w-full rounded-2xl bg-cover mt-14 left-1/2 -translate-x-1/2 overflow-hidden aspect-[4/3] lg:aspect-video">
            <video
              ref={setVideoRef(5)}
              muted
              loop
              playsInline
              poster="/thumbs/threaded-comments.webp"
              className="w-full h-full object-cover"
            >
              <source src="/videos/threaded-comments.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-sm mt-4 text-gray-600 md:text-base text-center">
            {productShowcaseContent.commentsFeatureCaption}
          </p>
        </div>
      </div>
    </>
  );
}
