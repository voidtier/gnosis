import { useState } from "react";

const guides = [
  {
    id: 1,
    num: "01",
    title: "JWT authentication from scratch",
    desc: "Build a complete auth system using JSON Web Tokens, cookies, and Express middleware.",
    difficulty: "Beginner",
    tags: ["backend", "auth"],
    steps: 7,
  },
  {
    id: 2,
    num: "02",
    title: "MongoDB aggregation pipelines",
    desc: "Master complex data transformations with stages, operators, and real-world examples.",
    difficulty: "Intermediate",
    tags: ["mongodb", "backend"],
    steps: 9,
  },
  {
    id: 3,
    num: "03",
    title: "React context without the pain",
    desc: "A practical guide to state management patterns that scale — without Redux.",
    difficulty: "Intermediate",
    tags: ["react", "frontend"],
    steps: 6,
  },
  {
    id: 4,
    num: "04",
    title: "Deploying Node to production",
    desc: "Environment vars, PM2, nginx reverse proxy, and SSL — the full picture.",
    difficulty: "Advanced",
    tags: ["devops", "node"],
    steps: 11,
  },
  {
    id: 5,
    num: "05",
    title: "Tailwind v4 from zero",
    desc: "Everything that changed and how to harness the new CSS-first configuration system.",
    difficulty: "Beginner",
    tags: ["css", "frontend"],
    steps: 5,
  },
  {
    id: 6,
    num: "06",
    title: "REST API design patterns",
    desc: "Naming conventions, versioning strategies, error formats, and pagination done right.",
    difficulty: "Intermediate",
    tags: ["backend", "api"],
    steps: 8,
  },
];

const diffColor = {
  Beginner: "text-zinc-500 border-zinc-800",
  Intermediate: "text-zinc-400 border-zinc-700",
  Advanced: "text-zinc-300 border-zinc-600",
};

export default function Guide() {
  const [active, setActive] = useState("All");
  const filters = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
    "backend",
    "frontend",
  ];

  const filtered =
    active === "All"
      ? guides
      : guides.filter(
          (g) => g.difficulty === active || g.tags.includes(active),
        );

  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      {/* Header */}
      <div className="px-8 pt-12 pb-8 border-b border-zinc-800/60">
        <p className="text-xs tracking-[0.2em] uppercase text-zinc-700 mb-3">
          Gnosis · Guide
        </p>
        <h1 className="text-3xl text-zinc-200 font-normal mb-2">Guides</h1>
        <p className="text-sm text-zinc-500">
          Structured paths through complex topics
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

      {/* Grid */}
      <div className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((guide) => (
          <div
            key={guide.id}
            className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-zinc-700 font-mono">
                  {guide.num}
                </span>
                <span
                  className={`text-xs border px-2 py-0.5 rounded-md ${diffColor[guide.difficulty]}`}
                >
                  {guide.difficulty}
                </span>
              </div>
              <h3 className="text-zinc-300 text-sm font-medium leading-snug mb-2 group-hover:text-zinc-100 transition-colors duration-300">
                {guide.title}
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {guide.desc}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-800/60 flex justify-between items-center">
              <div className="flex gap-1.5">
                {guide.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-xs text-zinc-700">{guide.steps} steps</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
