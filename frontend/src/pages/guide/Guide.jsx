import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_guides_controller } from "../../features/guide/controller/guide.controller.js";
import GuideCardSkeleton from "../../components/skeleton/Guide_card_skeleton.jsx";
import EmptyState from "../../components/empty/Empty_state.jsx";
import usePageTitle from "../../components/utils/usePage_title.js";
import Section_header from "../../components/utils/Section_page_header.jsx";
import Filter from "../../components/filter/Filter_button.jsx";

const diff_color = {
  Beginner: "text-zinc-500 border-zinc-800",
  Intermediate: "text-zinc-400 border-zinc-700",
  Advanced: "text-zinc-300 border-zinc-600",
};

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Guide() {
  const navigate = useNavigate();
  const [guides, set_guides] = useState([]);
  const [loading, set_loading] = useState(true);
  const [active, set_active] = useState("All");
  usePageTitle("Guides");

  useEffect(() => {
    async function load() {
      set_loading(true);
      const res = await get_guides_controller();
      if (res.success) set_guides(res.data);
      set_loading(false);
    }
    load();
  }, []);

  const filtered =
    active === "All" ? guides : guides.filter((g) => g.difficulty === active);

  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      {/* Header */}

      <Section_header
        section_name="Guide"
        section_moto="Structured paths through complex topics"
      />

      {/* Filters */}
      <div className="flex gap-2 px-8 py-4 border-b border-zinc-800/60 overflow-x-auto scrollbar-none">
        {FILTERS.map((f) => (
          <Filter filter_value={f} set_active={set_active} active={active} />
        ))}
      </div>

      {/* Grid */}
      <div className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <GuideCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="col-span-3">
            <EmptyState
              title="No guides yet"
              message="Guides will appear here once they've been published."
              icon="◫"
            />
          </div>
        ) : (
          filtered.map((guide, i) => (
            <div
              key={guide._id}
              onClick={() => navigate(`/guide/${guide._id}`)}
              className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-zinc-700 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-xs border px-2 py-0.5 rounded-md ${diff_color[guide.difficulty] || diff_color.Beginner}`}
                  >
                    {guide.difficulty}
                  </span>
                </div>
                <h3 className="text-zinc-300 text-sm font-medium leading-snug mb-2 group-hover:text-zinc-100 transition-colors duration-300">
                  {guide.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {guide.description}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex justify-between items-center">
                <div className="flex gap-1.5">
                  {guide.tag && (
                    <span className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md">
                      {guide.tag}
                    </span>
                  )}
                </div>
                <span className="text-xs text-zinc-700">
                  {guide.steps?.length ?? 0} steps
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
