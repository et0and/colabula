import { Rating } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAverageRating(ratings: Rating[]): string {
  if (!ratings.length) return "No grades yet";

  const average =
    ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length;

  // Convert numerical average to grade label
  if (average === 0) return "NØ";
  if (average <= 1) return "N1";
  if (average <= 2) return "N2";
  if (average <= 3) return "A3";
  if (average <= 4) return "A4";
  if (average <= 5) return "M5";
  if (average <= 6) return "M6";
  if (average <= 7) return "E7";
  return "E8";
}
