export default function GuideCardSkeleton() {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 animate-pulse flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-4">
          <div className="h-3 w-6 bg-zinc-800 rounded-md" />
          <div className="h-4 w-16 bg-zinc-800 rounded-md" />
        </div>
        <div className="h-4 bg-zinc-800 rounded-md w-3/4 mb-2" />
        <div className="h-4 bg-zinc-800 rounded-md w-1/2 mb-4" />
        <div className="h-3 bg-zinc-800/60 rounded-md w-full mb-2" />
        <div className="h-3 bg-zinc-800/60 rounded-md w-4/5" />
      </div>
      <div className="mt-5 pt-4 border-t border-zinc-800/60 flex justify-between items-center">
        <div className="flex gap-1.5">
          <div className="h-4 w-12 bg-zinc-800/40 rounded-md" />
          <div className="h-4 w-14 bg-zinc-800/40 rounded-md" />
        </div>
        <div className="h-3 w-10 bg-zinc-800/40 rounded-md" />
      </div>
    </div>
  );
}
