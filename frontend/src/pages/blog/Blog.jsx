import { useState } from "react";
import Blog_preview from "../../features/blog/component/Blog_preview_post";
import Filter from "../../components/filter/Filter_button.jsx";
import Section_header from "../../components/utils/Section_page_header";
import { useEffect } from "react";
import { get_blogs_controller } from "../../features/blog/controller/blog.controller";

export default function Blog() {
  const [active, set_active] = useState("All");
  const [loading, set_loading] = useState(true);
  const [data, set_data] = useState([]);
  const [filters, set_filters] = useState(["All"]);

  useEffect(() => {
    async function blogs_data() {
      set_loading(true);
      const result = await get_blogs_controller();
      if (!result.success) {
        return set_loading(true);
      }
      set_data(result.data);
      const tag = result.data.map((blog) => {
        return blog.tag;
      });
      set_filters((prev) => {
        return [...prev, ...tag];
      });
      set_loading(false);
    }
    blogs_data();
  }, []);

  const filtered =
    active === "All" ? data : data.filter((p) => p.tag.includes(active));

  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      {/* Page header */}
      <Section_header
        section_name="Blog"
        section_moto="Essays, perspectives, and explorations"
      />

      {loading && (
        <h1 className="text-xl text-red-500 text-center my-10">
          loading please wait
        </h1>
      )}
      {data.length === 0 && (
        <h1 className="text-xl text-red-500 text-center my-10">
          loading please wait
        </h1>
      )}

      {/* Filters */}
      <div className="flex gap-2 px-8 py-4 border-b border-zinc-800/60 overflow-x-auto scrollbar-none">
        {filters.map((f, index) => (
          <Filter
            key={index}
            filter_value={f}
            set_active={set_active}
            active={active}
          />
        ))}
      </div>

      {/* Posts */}
      <div className="px-8 py-8 flex flex-col gap-0">
        {filtered.map((post, i) => (
          <Blog_preview
            key={post.id}
            blog_post={post}
            classes={`py-6 flex justify-between items-start gap-8 cursor-pointer group
            ${i !== filtered.length - 1 ? "border-b border-zinc-800/50" : ""}`}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-8 py-6 border-t border-zinc-800/60">
        <button className="text-xs text-zinc-600 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer">
          ← Previous
        </button>
        <span className="text-xs text-zinc-700">Page 1 of 3</span>
        <button className="text-xs text-zinc-600 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer">
          Next →
        </button>
      </div>
    </main>
  );
}
