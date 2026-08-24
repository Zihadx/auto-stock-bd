"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-4 font-sans text-[#0b0d10]">
        <div className="text-center">
          <h1 className="text-xl font-medium">Something went wrong</h1>
          <p className="mt-2 text-sm text-[#464c54]">
            Please refresh the page. If this keeps happening, contact support.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-sm bg-[#0b0d10] px-4 py-2 text-sm font-medium text-[#f7f6f3]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
