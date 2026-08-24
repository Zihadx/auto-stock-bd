"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/error-state";

export default function AdminErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <ErrorState
        title="This section failed to load"
        description="Something went wrong fetching this data. Try again, or use the sidebar to go elsewhere."
        onRetry={reset}
      />
    </div>
  );
}
