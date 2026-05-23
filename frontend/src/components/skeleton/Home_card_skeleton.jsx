export default function CardSkeleton() {
  return (
    <div className="w-72 shrink-0 flex flex-col justify-between bg-zinc-900 border border-zinc-800/60 rounded-xl px-4 py-4 animate-pulse">
      <div className="mb-4">
        <div className="h-3 bg-zinc-800 rounded-md w-3/4 mb-2" />
        <div className="h-3 bg-zinc-800 rounded-md w-1/2" />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <div className="h-2.5 bg-zinc-800/60 rounded-md w-full" />
        <div className="h-2.5 bg-zinc-800/60 rounded-md w-full" />
        <div className="h-2.5 bg-zinc-800/60 rounded-md w-2/3" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-2 bg-zinc-800/40 rounded-md w-12" />
        <div className="h-5 bg-zinc-800/40 rounded-md w-14" />
      </div>
    </div>
  );
}
