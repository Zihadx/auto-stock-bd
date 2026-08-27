"use client";

import { useEffect } from "react";

// This replaces the entire <html>/<body> when the root layout itself throws,
// so it can't rely on ThemeProvider or the app's CSS variables being
// available — it needs to render correctly on its own. The inline <style>
// gives it dark-mode courtesy via a plain prefers-color-scheme media query
// (mirroring the app's paper/ink palette) without any JS dependency.
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
      <head>
        <style>{`
          .ge-body { background: #f7f6f3; color: #0b0d10; }
          .ge-desc { color: #464c54; }
          .ge-btn { background: #0b0d10; color: #f7f6f3; }
          @media (prefers-color-scheme: dark) {
            .ge-body { background: #0e1013; color: #f2f0ea; }
            .ge-desc { color: #b8bcc2; }
            .ge-btn { background: #f2f0ea; color: #0e1013; }
          }
        `}</style>
      </head>
      <body className="ge-body flex min-h-screen items-center justify-center px-4 font-sans">
        <div className="text-center">
          <h1 className="text-xl font-medium">Something went wrong</h1>
          <p className="ge-desc mt-2 text-sm">
            Please refresh the page. If this keeps happening, contact support.
          </p>
          <button
            type="button"
            onClick={reset}
            className="ge-btn mt-5 rounded-sm px-4 py-2 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
