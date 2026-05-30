export default function Filter({ filter_value, active, set_active }) {
  return (
    <>
      <button
        key={filter_value}
        onClick={() => set_active(filter_value)}
        className={`text-xs px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all duration-200 cursor-pointer
        ${
          active === filter_value
            ? "border-zinc-600 text-zinc-300 bg-zinc-800"
            : "border-zinc-800 text-zinc-600 bg-transparent hover:border-zinc-700 hover:text-zinc-400"
        }`}
      >
        {filter_value}
      </button>
    </>
  );
}
