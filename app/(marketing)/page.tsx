// app/(marketing)/page.tsx
// Landing page at "/". The hero has a grid that fades out toward the edges.

import Link from "next/link";

export default function HomePage() {
  return (
    // isolate: creates its own layer, so the grid (z-index -1) stays behind the text
    // but doesn't disappear behind the page background
    <section className="bg-grid-fade isolate px-4 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Fișele de instruire SSM, <span className="text-primary">digital</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Gestionează instruirile, semnăturile și termenele pentru toate firmele clienților tăi,
          într-un singur loc.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Începe gratuit
        </Link>
      </div>
    </section>
  );
}