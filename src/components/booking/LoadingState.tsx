
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-10 w-1/3 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
};

export default LoadingState;
