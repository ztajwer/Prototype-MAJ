"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="flex min-h-[100svh] flex-col items-center justify-center gap-4 bg-[#faf7f2] px-6 text-center">
      <p className="font-sans text-[0.62rem] uppercase tracking-[0.32em] text-maj-vault/60">
        Something went wrong
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-maj border border-maj-gold/50 bg-white px-6 py-3 font-sans text-[0.62rem] uppercase tracking-[0.28em] text-maj-vault"
      >
        Try again
      </button>
    </div>
  );
}
