import { useParams, Link, useNavigate } from "react-router-dom";

const posts = [
  {
    id: "1",
    title: "The quiet power of structured thinking",
    excerpt:
      "On why deliberate frameworks outperform raw intuition in complex problem spaces — and how to build yours.",
    date: "Jan 21, 2026",
    read: "5 min",
    tags: ["thinking", "process"],
    content: [
      {
        type: "paragraph",
        text: "There is a kind of thinking that looks productive from the outside — fast, associative, full of motion. It generates ideas, connects concepts, and feels like progress. But it rarely leads anywhere new.",
      },
      {
        type: "heading",
        text: "The framework problem",
      },
      {
        type: "paragraph",
        text: "The alternative is not slower thinking. It is structured thinking — building a scaffold before you climb. The scaffold doesn't constrain the thought; it elevates it.",
      },
      {
        type: "quote",
        text: "Structure is not the enemy of creativity. It is the condition for it.",
      },
      {
        type: "paragraph",
        text: "Most people skip the scaffold entirely. They jump straight into the problem, armed with pattern recognition and intuition. This works for simple problems. It fails quietly for complex ones.",
      },
      {
        type: "heading",
        text: "How to build yours",
      },
      {
        type: "paragraph",
        text: "Start with a single question: what is the actual problem I am solving? Not the surface problem — the real one underneath. Write it down in one sentence. If you can't, you don't understand it yet.",
      },
      {
        type: "paragraph",
        text: "Then define what a good answer looks like before you look for one. This is the step most people skip. Without a target, every answer looks equally valid.",
      },
    ],
  },
  {
    id: "2",
    title: "Obsidian, Notion, or plain files — what the debate misses",
    excerpt:
      "The tool is never the bottleneck. What matters is the system behind it — and most people skip that entirely.",
    date: "Jan 14, 2026",
    read: "8 min",
    tags: ["productivity", "tools"],
    content: [
      {
        type: "paragraph",
        text: "Every few months the productivity community rediscovers the same argument. Obsidian people say Notion is bloated. Notion people say Obsidian is too technical. Plain file people say both are distractions.",
      },
      {
        type: "quote",
        text: "The tool is never the bottleneck. The system is.",
      },
      {
        type: "paragraph",
        text: "All three camps are missing the point. The tool doesn't matter. What matters is whether you have a system — a set of habits and structures that turns raw information into something usable.",
      },
    ],
  },
  {
    id: "3",
    title: "Why I write before I think",
    excerpt:
      "Writing is not the output of thinking. It is the thinking itself.",
    date: "Jan 6, 2026",
    read: "4 min",
    tags: ["writing"],
    content: [
      {
        type: "paragraph",
        text: "Most people treat writing as the thing you do after you've figured something out. You think, then you write. The writing is the record.",
      },
      {
        type: "heading",
        text: "Writing as thinking",
      },
      {
        type: "paragraph",
        text: "But writing is not the output of thinking. It is the thinking itself. The act of forming a sentence forces a level of precision that pure thought never demands.",
      },
      {
        type: "quote",
        text: "If you can't write it clearly, you don't understand it clearly.",
      },
    ],
  },
];

function renderBlock(block, i) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={i} className="text-zinc-200 text-base font-medium mt-8 mb-3">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote key={i} className="border-l-2 border-zinc-700 pl-4 my-6">
          <p className="text-zinc-400 text-sm italic leading-relaxed">
            "{block.text}"
          </p>
        </blockquote>
      );
    case "paragraph":
    default:
      return (
        <p key={i} className="text-zinc-500 text-sm leading-relaxed mb-4">
          {block.text}
        </p>
      );
  }
}

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  const currentIndex = posts.findIndex((p) => p.id === id);
  const prev = posts[currentIndex - 1] || null;
  const next = posts[currentIndex + 1] || null;

  if (!post) {
    return (
      <main className="bg-zinc-950 w-full min-h-screen flex flex-col items-center justify-center px-8">
        <div className="text-center max-w-md">
          <p className="text-[60px] font-normal text-zinc-800 leading-none mb-6 select-none">
            ∅
          </p>
          <div className="w-12 h-px bg-zinc-800 mx-auto mb-6" />
          <h1 className="text-base text-zinc-400 font-normal mb-3">
            Post not found
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed mb-8">
            This post doesn't exist or may have been removed.
          </p>
          <Link
            to="/blog"
            className="text-sm text-zinc-500 border border-zinc-800 px-4 py-2 rounded-xl hover:border-zinc-700 hover:text-zinc-300 transition-all duration-300"
          >
            ← Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      {/* Top bar */}
      <div className="px-8 pt-8 pb-0">
        <button
          onClick={() => navigate("/blog")}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
        >
          ← Blog
        </button>
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-8 pt-10 pb-20">
        {/* Meta */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-2xl text-zinc-200 font-normal leading-snug mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed mb-5">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-zinc-700">
            <span>{post.date}</span>
            <span className="w-px h-3 bg-zinc-800" />
            <span>{post.read} read</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-800/60 mb-8" />

        {/* Content blocks */}
        <div>{post.content.map((block, i) => renderBlock(block, i))}</div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-800/60 mt-12 mb-8" />

        {/* Prev / Next */}
        <div className="flex justify-between items-start gap-8">
          {prev ? (
            <Link
              to={`/blog/${prev.id}`}
              className="group flex flex-col gap-1 max-w-xs"
            >
              <span className="text-xs text-zinc-700">← Previous</span>
              <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200 leading-snug">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/blog/${next.id}`}
              className="group flex flex-col gap-1 max-w-xs text-right"
            >
              <span className="text-xs text-zinc-700">Next →</span>
              <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200 leading-snug">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>
    </main>
  );
}
