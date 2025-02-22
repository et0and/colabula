export const createSkeletonArray = (count: number) =>
  Array.from({ length: count }, (_, i) => i + 1);
