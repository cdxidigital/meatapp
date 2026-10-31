import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Something unexpected happened. Reload, or go back to the list.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-center text-fg">
      <div className="max-w-sm">
        <span className="text-ember" aria-hidden="true">
          <TriangleAlert className="mx-auto size-8" strokeWidth={2} />
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold">Something went wrong</h1>
        <p className="mt-2 text-sm break-words text-muted">{errorMessage(error)}</p>
        <div className="mt-6 flex flex-col items-center gap-2">
          <button type="button" className="press min-h-11 font-semibold text-ember" onClick={() => window.location.reload()}>
            Reload
          </button>
          <Link to="/" className="inline-flex min-h-11 items-center text-sm text-muted">
            Back to nearby
          </Link>
        </div>
      </div>
    </main>
  );
}

export function AppNotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-center text-fg">
      <div className="max-w-sm">
        <p className="font-mono text-xs uppercase tracking-wide text-ember">MEAT</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold">That page isn’t here.</h1>
        <p className="mt-2 text-sm text-muted">The link may be old, or it never existed.</p>
        <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-ember">
          Back to nearby
        </Link>
      </div>
    </main>
  );
}
