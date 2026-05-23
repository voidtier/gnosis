import { Link, useRouteError } from "react-router-dom";

export default function Error_page() {
  const error = useRouteError();

  return (
    <main className="bg-zinc-950 w-full min-h-screen flex flex-col items-center justify-center px-8">
      <div className="text-center max-w-md">
        <p className="text-[80px] font-normal text-zinc-800 leading-none mb-6 select-none">
          !
        </p>
        <div className="w-12 h-px bg-zinc-800 mx-auto mb-6" />
        <h1 className="text-lg text-zinc-300 font-normal mb-3">
          Something went wrong
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed mb-3">
          An unexpected error occurred. It's not you — something broke on our
          end.
        </p>

        {error?.message && (
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl px-4 py-3 mb-8 text-left">
            <p className="text-xs text-zinc-700 tracking-[0.12em] uppercase mb-1">
              Error detail
            </p>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              {error.message}
            </p>
          </div>
        )}

        {!error?.message && <div className="mb-8" />}

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-zinc-400 border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
          >
            Try again
          </button>
          <Link
            to="/"
            className="text-sm text-zinc-600 border border-zinc-800 px-4 py-2 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-300"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
