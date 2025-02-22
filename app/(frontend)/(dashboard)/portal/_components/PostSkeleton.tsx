import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-48" />
        </div>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-3/4 mb-8" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </CardContent>

      <CardFooter className="space-y-2">
        <Skeleton className="h-10 w-full mb-4" />

        {[1, 2].map((commentIndex) => (
          <div key={commentIndex} className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>

            <div className="ml-8 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
