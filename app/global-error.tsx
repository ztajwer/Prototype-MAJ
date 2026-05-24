"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#faf7f2] px-6 text-center font-sans text-[#2a2016]">
        <p className="text-[0.62rem] uppercase tracking-[0.32em] opacity-60">
          MAJ Boutique
        </p>
        <h1 className="text-xl">Unable to load the experience</h1>
        {process.env.NODE_ENV === "development" && error?.message ? (
          <p className="max-w-md text-sm opacity-70">{error.message}</p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          className="rounded border border-[#d4bc82] bg-white px-6 py-3 text-[0.62rem] uppercase tracking-[0.28em]"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
