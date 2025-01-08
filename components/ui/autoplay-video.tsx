"use client";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface AutoplayVideoProps {
  src: string;
  type: string;
  title: string;
}

export function AutoplayVideo({ src, type, title }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
      setIsPlaying(true);
    } else if (!isIntersecting && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isIntersecting]);

  /* const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }; */

  return (
    <>
      <div ref={targetRef} className="relative flex justify-center">
        <video
          ref={videoRef}
          className="md:w-1/2 w-full rounded-xl shadow-lg"
          muted
          playsInline
          loop
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
        {/* <div className="absolute inset-0 flex items-center justify-center">
      <Button
        variant="outline"
        size="icon"
        className="bg-white/80 hover:bg-white/90"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
    </div> */}
      </div>
      <p className="mt-2 text-center text-sm text-gray-600">{title}</p>
    </>
  );
}
