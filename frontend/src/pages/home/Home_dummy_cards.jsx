export default function Home_dummy_card() {
  return (
    <>
      <div className="w-80 max-h-max shrink-0 px-2 py-3 bg-zinc-900 rounded-2xl shadow-md flex flex-col justify-between">
        <div className="mb-5">
          <h2 className="text-[16px] text-zinc-200/60">
            The quiet power of structured thinking
          </h2>
        </div>

        <div className="mb-3 text-zinc-400/60 text-sm">
          <p>
            There is a kind of thinking that looks productive from the outside —
            fast, associative, full of motion. It generates ideas, connects
            concepts, and feels like progress. But it rarely leads anywhere new.
          </p>
        </div>

        <div className="flex justify-between ">
          <div className="text-sm text-zinc-600/40">
            <p>5 min ago</p>
          </div>
          <div className="text-xs text-zinc-400/60 border border-zinc-700/60 py-1 px-2.5 rounded-lg">
            <p>concept</p>
          </div>
        </div>
      </div>
    </>
  );
}
