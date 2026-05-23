import Home_dummy_card from "./Home_dummy_cards";

export default function Home() {
  return (
    <>
      <main className="bg-zinc-900/40 w-full min-h-screen ">
        <section className=" flex justify-between items-center py-20 px-5">
          <div className="my-5 ml-5">
            <div className="mb-5">
              <p className="text-lg text-zinc-600/40">Knowledge platform</p>
            </div>
            <div className="mb-3">
              <p className="text-4xl text-zinc-200/60">
                Where ideas find their depth.
              </p>
            </div>
            <div className="mb-5">
              <p className="text-sm text-zinc-400/60">
                Blogs, structured guides, and technical documentation — curated
                and crafted for those who think deeply.
              </p>
            </div>
            <div className="flex gap-x-3">
              <button className="px-3.5 py-2.5 bg-transparent border rounded-xl border-zinc-800 text-zinc-400/60 hover:bg-zinc-800 transition-all duration-500 cursor-pointer">
                Browse Blog
              </button>
              <button className="px-3.5 py-2.5 bg-zinc-800 border rounded-xl border-transparent text-zinc-400/60 hover:bg-transparent hover:border-zinc-800 transition-all duration-500 cursor-pointer">
                Explore Guide
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="max-w-52 flex flex-col gap-y-2.5 bg-zinc-900 rounded-xl shadow-lg px-2.5 py-5 max-h-max">
              <h3 className="text-[16px] text-zinc-600/40">Latest Post</h3>
              <p className="text-sm text-zinc-200/60">
                The quiet power of structured thinking
              </p>
              <div className="flex justify-between text-xs text-zinc-400/60">
                <p>5min ago</p>
                <p>blog</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col gap-y-10 py-12 ">
          <div className="flex border border-zinc-800 mr-2.5 ml-5 rounded-2xl overflow-hidden">
            <div className="bg-zinc-800 px-6 py-8   shadow  rotate-180 [writing-mode:vertical-rl] ">
              <h2 className="text-zinc-400 text-lg">Blogs</h2>
              <p className="text-zinc-500 text-sm">
                Essays and perspectives on topics that matter
              </p>
            </div>

            <div className="w-full min-h-[20vh] flex gap-6 px-5 py-2.5 flex-nowrap overflow-y-auto snap-start snap-mandatory">
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
              <Home_dummy_card />
            </div>
          </div>

          <div className="border border-zinc-800 mr-2.5 ml-5 rounded-2xl overflow-hidden">
            <div className="bg-zinc-800 px-6 py-8   shadow  rotate-180 [writing-mode:vertical-rl] max-h-max">
              <h2 className="text-zinc-400 text-lg">Guide</h2>
              <p className="text-zinc-500 text-sm">
                Step-by-step structured walkthroughs
              </p>
            </div>
          </div>

          <div className="border border-zinc-800 mr-2.5 ml-5 rounded-2xl overflow-hidden">
            <div className="bg-zinc-800 px-6 py-8   shadow  rotate-180 [writing-mode:vertical-rl] max-h-max">
              <h2 className="text-zinc-400 text-lg">Docs</h2>
              <p className="text-zinc-500 text-sm">
                Technical reference and specification
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
