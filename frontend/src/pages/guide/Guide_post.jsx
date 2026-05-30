import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { get_guide_by_id_controller } from "../../features/guide/controller/guide.controller.js";
import usePageTitle from "../../components/utils/usePage_title.js";

const diff_color = {
  Beginner: "text-zinc-500 border-zinc-800",
  Intermediate: "text-zinc-400 border-zinc-700",
  Advanced: "text-zinc-300 border-zinc-600",
};

function StepSkeleton() {
  return (
    <div className="flex gap-6 pb-10 animate-pulse">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-6 h-6 rounded-full bg-zinc-800" />
        <div className="w-px flex-1 bg-zinc-800/40 mt-2" />
      </div>
      <div className="flex-1 pt-0.5">
        <div className="h-4 bg-zinc-800 rounded w-1/3 mb-3" />
        <div className="h-3 bg-zinc-800/60 rounded w-full mb-2" />
        <div className="h-3 bg-zinc-800/60 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function Guide_post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, set_guide] = useState(null);
  const [loading, set_loading] = useState(true);
  const [not_found, set_not_found] = useState(false);

  usePageTitle(guide?.title ?? "Guide");

  useEffect(() => {
    async function load() {
      set_loading(true);
      const res = await get_guide_by_id_controller(id);
      if (res.success && res.data) {
        set_guide(res.data);
      } else {
        set_not_found(true);
      }
      set_loading(false);
    }
    load();
  }, [id]);

  if (!loading && not_found) {
    return (
      <main className="bg-zinc-950 w-full min-h-screen flex flex-col items-center justify-center px-8">
        <div className="text-center max-w-md">
          <p className="text-[60px] font-normal text-zinc-800 leading-none mb-6 select-none">
            ∅
          </p>
          <div className="w-12 h-px bg-zinc-800 mx-auto mb-6" />
          <h1 className="text-base text-zinc-400 font-normal mb-3">
            Guide not found
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed mb-8">
            This guide doesn't exist or may have been removed.
          </p>
          <Link
            to="/guide"
            className="text-sm text-zinc-500 border border-zinc-800 px-4 py-2 rounded-xl hover:border-zinc-700 hover:text-zinc-300 transition-all duration-300"
          >
            ← Back to guides
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      {/* Back */}
      <div className="px-8 pt-8">
        <button
          onClick={() => navigate("/guide")}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200 cursor-pointer"
        >
          ← Guides
        </button>
      </div>

      {/* Header */}
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-0">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-3 w-24 bg-zinc-800 rounded mb-4" />
            <div className="h-7 bg-zinc-800 rounded w-3/4 mb-3" />
            <div className="h-4 bg-zinc-800/60 rounded w-full mb-2" />
            <div className="h-4 bg-zinc-800/60 rounded w-2/3 mb-6" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`text-xs border px-2 py-0.5 rounded-md ${diff_color[guide.difficulty] ?? diff_color.Beginner}`}
              >
                {guide.difficulty}
              </span>
              {guide.tag && (
                <>
                  <span className="w-px h-3 bg-zinc-800" />
                  <span className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md">
                    {guide.tag}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-2xl text-zinc-200 font-normal leading-snug mb-3">
              {guide.title}
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              {guide.description}
            </p>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-xs text-zinc-700 shrink-0">
                {guide.steps.length} steps
              </span>
            </div>
          </>
        )}
      </div>

      {/* Steps */}
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-20">
        <div className="flex flex-col gap-0">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <StepSkeleton key={i} />)
            : guide.steps.map((step, i) => (
                <div key={i} className="flex gap-6 pb-10 relative">
                  {/* Step indicator + line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-950 z-10 shrink-0">
                      <span className="text-[9px] text-zinc-600 font-mono">
                        {step.num}
                      </span>
                    </div>
                    {i !== guide.steps.length - 1 && (
                      <div className="w-px flex-1 bg-zinc-800/60 mt-2" />
                    )}
                  </div>

                  {/* Step body */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-sm text-zinc-300 font-medium mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                      {step.content}
                    </p>
                    {step.code && (
                      <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl px-4 py-4">
                        <pre className="text-xs text-zinc-400 font-mono leading-relaxed overflow-x-auto whitespace-pre">
                          {step.code}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
        </div>

        {/* Divider */}
        {!loading && <div className="w-full h-px bg-zinc-800/60 mt-4 mb-8" />}

        {/* Date info */}
        {!loading && guide && (
          <p className="text-xs text-zinc-700 text-center">
            Published{" "}
            {new Date(guide.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </main>
  );
}
