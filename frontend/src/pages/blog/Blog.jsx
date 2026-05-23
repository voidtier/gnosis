import { useState } from "react";

const posts = [
  {
    id: 1,
    title: "The quiet power of structured thinking",
    excerpt:
      "On why deliberate frameworks outperform raw intuition in complex problem spaces — and how to build yours.",
    date: "Jan 21, 2026",
    read: "5 min",
    tags: ["thinking", "process"],
  },
  {
    id: 2,
    title: "Obsidian, Notion, or plain files — what the debate misses",
    excerpt:
      "The tool is never the bottleneck. What matters is the system behind it — and most people skip that entirely.",
    date: "Jan 14, 2026",
    read: "8 min",
    tags: ["productivity", "tools"],
  },
  {
    id: 3,
    title: "Why I write before I think",
    excerpt:
      "Writing is not the output of thinking. It is the thinking itself — and treating it as anything else blocks the process.",
    date: "Jan 6, 2026",
    read: "4 min",
    tags: ["writing"],
  },
  {
    id: 4,
    title: "The compounding effect of small clarity",
    excerpt:
      "Small improvements in how clearly you communicate compound over time into something that looks like genius from the outside.",
    date: "Dec 28, 2025",
    read: "6 min",
    tags: ["clarity", "communication"],
  },
  {
    id: 5,
    title: "Against busyness as identity",
    excerpt:
      "When being busy becomes a personality trait, it stops being a circumstance and becomes a trap you built yourself.",
    date: "Dec 19, 2025",
    read: "5 min",
    tags: ["mindset"],
  },
  {
    id: 6,
    title: "Reading slowly in a fast world",
    excerpt:
      "The case for treating a single book like a long conversation rather than a task to complete.",
    date: "Dec 10, 2025",
    read: "7 min",
    tags: ["reading", "learning"],
  },
];

export default function Blog() {
  const [active, setActive] = useState("All");
  const filters = [
    "All",
    "thinking",
    "productivity",
    "writing",
    "mindset",
    "learning",
  ];

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.tags.includes(active));

  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      {/* Page header */}
      <div className="px-8 pt-12 pb-8 border-b border-zinc-800/60">
        <p className="text-xs tracking-[0.2em] uppercase text-zinc-700 mb-3">
          Gnosis · Blog
        </p>
        <h1 className="text-3xl text-zinc-200 font-normal mb-2">Blog</h1>
        <p className="text-sm text-zinc-500">
          Essays, perspectives, and explorations
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-8 py-4 border-b border-zinc-800/60 overflow-x-auto scrollbar-none">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all duration-200 cursor-pointer
              ${
                active === f
                  ? "border-zinc-600 text-zinc-300 bg-zinc-800"
                  : "border-zinc-800 text-zinc-600 bg-transparent hover:border-zinc-700 hover:text-zinc-400"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="px-8 py-8 flex flex-col gap-0">
        {filtered.map((post, i) => (
          <article
            key={post.id}
            className={`py-6 flex justify-between items-start gap-8 cursor-pointer group
              ${i !== filtered.length - 1 ? "border-b border-zinc-800/50" : ""}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="text-zinc-300 text-base font-normal mb-2 group-hover:text-zinc-100 transition-colors duration-200 leading-snug">
                {post.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-zinc-700 mb-1">{post.date}</p>
              <p className="text-xs text-zinc-700">{post.read} read</p>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-8 py-6 border-t border-zinc-800/60">
        <button className="text-xs text-zinc-600 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer">
          ← Previous
        </button>
        <span className="text-xs text-zinc-700">Page 1 of 3</span>
        <button className="text-xs text-zinc-600 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer">
          Next →
        </button>
      </div>
    </main>
  );
}
