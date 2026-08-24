"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/error-state";

export default function RootErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this reports to an error tracking service instead.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-4 md:px-8">
      <ErrorState
        title="Something went wrong loading this page"
        description="Try again, or head back to the homepage if the problem continues."
        onRetry={reset}
      />
    </div>
  );
}
