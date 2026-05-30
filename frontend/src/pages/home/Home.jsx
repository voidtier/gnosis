import Home_dummy_card from "./Home_dummy_cards";

export default function Home() {
  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      <section className="flex justify-between items-start py-20 px-8 border-b border-zinc-800/60">
        <div className="max-w-lg ">
          <p className="text-xs tracking-[0.2em] uppercase text-zinc-700 mb-5">
            Knowledge platform
          </p>
          <h1 className="text-4xl text-zinc-200 font-normal leading-tight mb-4">
            Where ideas find their depth.
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed mb-8">
            Blogs, structured guides, and technical documentation — curated and
            crafted for those who think deeply.
          </p>
          <div className="flex gap-x-3">
            <button className="px-4 py-2.5 bg-transparent border border-zinc-700 rounded-xl text-zinc-400 hover:bg-zinc-800 transition-all duration-300 cursor-pointer text-sm">
              Browse Blog
            </button>
            <button className="px-4 py-2.5 bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:bg-transparent hover:border-zinc-700 transition-all duration-300 cursor-pointer text-sm">
              Explore Guide
            </button>
          </div>
        </div>

        <div className="max-w-52 shrink-0 flex flex-col gap-y-2.5 bg-zinc-900 border border-zinc-800/60 rounded-xl px-4 py-5">
          <p className="text-xs tracking-[0.14em] uppercase text-zinc-700">
            Latest Post
          </p>
          <p className="text-sm text-zinc-300 leading-snug">
            The quiet power of structured thinking
          </p>
          <div className="flex justify-between text-xs text-zinc-600 pt-1">
            <p>5min ago</p>
            <p>blog</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-y-0 py-10 px-8">
        {/* Blog row */}
        <div className="flex border border-zinc-800/60 rounded-2xl overflow-hidden mb-8">
          <div className="flex flex-col items-center py-6 px-2.5 border-r border-zinc-800/60 w-8 shrink-0 justify-center gap-3">
            <div className="w-px h-6 bg-zinc-800"></div>
            <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.22em] uppercase text-zinc-600 whitespace-nowrap">
              Blog
            </span>
            <div className="w-px flex-1 bg-zinc-800"></div>
          </div>

          <div className="flex-1 min-w-0 p-5">
            <h2 className="text-zinc-300 text-sm font-medium mb-1">Blogs</h2>
            <p className="text-zinc-600 text-xs mb-5">
              Essays and perspectives on topics that matter
            </p>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Home_dummy_card key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Guide row */}
        <div className="flex border border-zinc-800/60 rounded-2xl overflow-hidden mb-8">
          <div className="flex flex-col items-center py-6 px-2.5 border-r border-zinc-800/60 w-8 shrink-0 justify-center gap-3">
            <div className="w-px h-6 bg-zinc-800"></div>
            <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.22em] uppercase text-zinc-600 whitespace-nowrap">
              Guide
            </span>
            <div className="w-px flex-1 bg-zinc-800"></div>
          </div>
          <div className="flex-1 min-w-0 p-5">
            <h2 className="text-zinc-300 text-sm font-medium mb-1">Guides</h2>
            <p className="text-zinc-600 text-xs mb-5">
              Step-by-step structured walkthroughs
            </p>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Home_dummy_card key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Docs row */}
        <div className="flex border border-zinc-800/60 rounded-2xl overflow-hidden">
          <div className="flex flex-col items-center py-6 px-2.5 border-r border-zinc-800/60 w-8 shrink-0 justify-center gap-3">
            <div className="w-px h-6 bg-zinc-800"></div>
            <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.22em] uppercase text-zinc-600 whitespace-nowrap">
              Docs
            </span>
            <div className="w-px flex-1 bg-zinc-800"></div>
          </div>
          <div className="flex-1 min-w-0 p-5">
            <h2 className="text-zinc-300 text-sm font-medium mb-1">
              Documentation
            </h2>
            <p className="text-zinc-600 text-xs mb-5">
              Technical reference and specification
            </p>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Home_dummy_card key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
