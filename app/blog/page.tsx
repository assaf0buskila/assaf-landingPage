import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { posts } from "@/lib/blog";

export default function BlogIndexPage() {
  return (
    <main className="relative min-h-[70vh] bg-paper pb-20 pt-28 md:pt-32">
      <div className="section-shell max-w-3xl">
        <p className="text-sm font-black text-navy">
          <Link href="/" className="transition hover:text-action">
            הבית
          </Link>
          <span className="mx-2 text-muted" aria-hidden="true">
            /
          </span>
          בלוג
        </p>
        <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
          בלוג
        </h1>
        <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-muted">
          שאלות שעסקים קטנים בישראל שואלים לפני שהם בונים עובד דיגיטלי.
        </p>

        <ul className="mt-10 space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="premium-panel p-6">
                <p className="text-sm font-bold text-muted">
                  <time dateTime={post.datePublished}>{post.publishedLabel}</time>
                </p>
                <h2 className="mt-3 text-2xl font-black text-ink">
                  <Link href={post.path} className="transition hover:text-action">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-base font-medium leading-8 text-muted">{post.description}</p>
                <Link
                  href={post.path}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-action"
                >
                  לקריאת המאמר
                  <ArrowUpLeft size={16} />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
