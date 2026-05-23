import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="bg-zinc-950 w-full min-h-screen flex flex-col items-center justify-center px-8">
      <div className="text-center max-w-md">
        <p className="text-[80px] font-normal text-zinc-800 leading-none mb-6 select-none">
          404
        </p>
        <div className="w-12 h-px bg-zinc-800 mx-auto mb-6" />
        <h1 className="text-lg text-zinc-300 font-normal mb-3">
          Page not found
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved. It
          happens.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="text-sm text-zinc-400 border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-800 transition-all duration-300"
          >
            ← Back home
          </Link>
          <Link
            to="/blog"
            className="text-sm text-zinc-600 border border-zinc-800 px-4 py-2 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-300"
          >
            Browse blog
          </Link>
        </div>
      </div>
    </main>
  );
}
