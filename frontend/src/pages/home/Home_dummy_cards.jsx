export default function Home_dummy_card({ title, excerpt, date, tag }) {
  return (
    <div className="w-72 shrink-0 snap-start flex flex-col justify-between bg-zinc-900 border border-zinc-800/60 rounded-xl px-4 py-4 hover:border-zinc-700 transition-colors duration-300 cursor-pointer group">
      <div className="mb-4">
        <h3 className="text-sm text-zinc-300 font-medium leading-snug group-hover:text-zinc-100 transition-colors duration-300">
          {title || "The quiet power of structured thinking"}
        </h3>
      </div>
      <div className="mb-4">
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
          {excerpt ||
            "There is a kind of thinking that looks productive from the outside — fast, associative, full of motion. It generates ideas but rarely leads anywhere new."}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-zinc-700">{date || "5 min ago"}</span>
        <span className="text-xs text-zinc-600 border border-zinc-800 py-0.5 px-2 rounded-md">
          {tag || "concept"}
        </span>
      </div>
    </div>
  );
}
