export default function PostSkeleton() {
  return (
    <div className="py-6 flex justify-between items-start gap-8 border-b border-zinc-800/50 animate-pulse">
      <div className="flex-1 min-w-0">
        <div className="flex gap-2 mb-3">
          <div className="h-4 w-12 bg-zinc-800 rounded-md" />
          <div className="h-4 w-16 bg-zinc-800 rounded-md" />
        </div>
        <div className="h-4 bg-zinc-800 rounded-md w-2/3 mb-3" />
        <div className="h-3 bg-zinc-800/60 rounded-md w-full mb-2" />
        <div className="h-3 bg-zinc-800/60 rounded-md w-4/5" />
      </div>
      <div className="text-right shrink-0 flex flex-col gap-2">
        <div className="h-3 w-20 bg-zinc-800 rounded-md ml-auto" />
        <div className="h-3 w-14 bg-zinc-800/60 rounded-md ml-auto" />
      </div>
    </div>
  );
}
