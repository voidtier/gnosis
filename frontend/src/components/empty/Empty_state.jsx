export default function EmptyState({
  title,
  message,
  action,
  actionLabel,
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-12 h-12 rounded-xl border border-zinc-800 flex items-center justify-center mb-6">
        <span className="text-zinc-700 text-lg select-none">{icon || "∅"}</span>
      </div>
      <div className="w-12 h-px bg-zinc-800 mb-6" />
      <h3 className="text-zinc-400 text-sm font-normal mb-2">
        {title || "Nothing here yet"}
      </h3>
      <p className="text-zinc-600 text-xs leading-relaxed max-w-xs mb-8">
        {message || "Content will appear here once it's been added."}
      </p>
      {action && (
        <button
          onClick={action}
          className="text-xs text-zinc-500 border border-zinc-800 px-4 py-2 rounded-xl hover:border-zinc-700 hover:text-zinc-300 transition-all duration-300 cursor-pointer"
        >
          {actionLabel || "Take action"}
        </button>
      )}
    </div>
  );
}
