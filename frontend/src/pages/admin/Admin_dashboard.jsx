import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth_context } from "../../features/auth/context/Auth.context.js";

const initial_content = [
  {
    id: 1,
    title: "The quiet power of structured thinking",
    type: "blog",
    status: "published",
    date: "Jan 21, 2026",
  },
  {
    id: 2,
    title: "JWT authentication from scratch",
    type: "guide",
    status: "published",
    date: "Jan 18, 2026",
  },
  {
    id: 3,
    title: "REST API authentication reference",
    type: "docs",
    status: "published",
    date: "Jan 14, 2026",
  },
  {
    id: 4,
    title: "Obsidian, Notion, or plain files",
    type: "blog",
    status: "published",
    date: "Jan 12, 2026",
  },
  {
    id: 5,
    title: "MongoDB aggregation pipelines",
    type: "guide",
    status: "draft",
    date: "Jan 10, 2026",
  },
  {
    id: 6,
    title: "Data models reference",
    type: "docs",
    status: "draft",
    date: "Jan 8, 2026",
  },
  {
    id: 7,
    title: "Why I write before I think",
    type: "blog",
    status: "published",
    date: "Jan 6, 2026",
  },
  {
    id: 8,
    title: "React context without the pain",
    type: "guide",
    status: "published",
    date: "Dec 28, 2025",
  },
];

const stats = [
  { label: "Blog posts", value: 24 },
  { label: "Guides", value: 12 },
  { label: "Doc pages", value: 8 },
  { label: "Drafts", value: 3 },
];

const type_colors = {
  blog: "text-zinc-400 border-zinc-700",
  guide: "text-zinc-500 border-zinc-800",
  docs: "text-zinc-600 border-zinc-800",
};

const status_colors = {
  published: "text-zinc-400",
  draft: "text-zinc-700",
};

export default function Admin_dashboard() {
  const { user, set_user } = useAuth_context();
  const navigate = useNavigate();
  const [content, set_content] = useState(initial_content);
  const [filter, set_filter] = useState("all");
  const [show_logout, set_show_logout] = useState(false);
  const [show_delete, set_show_delete] = useState(null);
  const [show_create, set_show_create] = useState(false);
  const [create_form, set_create_form] = useState({
    title: "",
    description: "",
    type: "blog",
    tag: "",
    status: "draft",
  });
  const [active_nav, set_active_nav] = useState("dashboard");

  const filtered =
    filter === "all"
      ? content
      : content.filter((c) => c.type === filter || c.status === filter);

  function handle_delete(id) {
    set_content((prev) => prev.filter((c) => c.id !== id));
    set_show_delete(null);
  }

  function handle_create() {
    if (!create_form.title.trim()) return;
    const new_item = {
      id: Date.now(),
      title: create_form.title,
      type: create_form.type,
      status: create_form.status,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    set_content((prev) => [new_item, ...prev]);
    set_create_form({ title: "", type: "blog", status: "draft" });
    set_show_create(false);
  }

  function handle_logout() {
    set_user(null);
    navigate("/admin/login");
  }

  return (
    <main className="bg-zinc-950 w-full min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-zinc-800/60 flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-6 border-b border-zinc-800/60">
          <p className="text-xs tracking-[0.2em] uppercase text-zinc-700 mb-1">
            Gnosis
          </p>
          <p className="text-sm text-zinc-300 font-medium">Admin</p>
          {user && (
            <p className="text-xs text-zinc-600 mt-1 truncate">{user.email}</p>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          <p className="text-xs tracking-[0.14em] uppercase text-zinc-700 px-2 mb-2 mt-1">
            Content
          </p>
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "blog", label: "Blog posts" },
            { id: "guide", label: "Guides" },
            { id: "docs", label: "Documentation" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                set_active_nav(item.id);
                if (item.id !== "dashboard")
                  set_filter(item.id === "docs" ? "docs" : item.id);
                else set_filter("all");
              }}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer
                ${
                  active_nav === item.id
                    ? "text-zinc-200 bg-zinc-800/60"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                }`}
            >
              {item.label}
            </button>
          ))}

          <p className="text-xs tracking-[0.14em] uppercase text-zinc-700 px-2 mb-2 mt-4">
            System
          </p>
          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left text-sm px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
          >
            Settings
          </button>
        </nav>

        <div className="px-3 py-4 border-t border-zinc-800/60">
          <button
            onClick={() => set_show_logout(true)}
            className="w-full text-left text-sm px-3 py-2 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-800/60">
          <div>
            <h1 className="text-base text-zinc-200 font-medium">Dashboard</h1>
            <p className="text-xs text-zinc-600 mt-0.5">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={() => set_show_create(true)}
            className="text-xs text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
          >
            + New post
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 px-8 py-6 border-b border-zinc-800/60">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-4"
            >
              <p className="text-2xl text-zinc-200 font-normal mb-1">
                {s.value}
              </p>
              <p className="text-xs text-zinc-600">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-8 py-4 border-b border-zinc-800/60">
          {["all", "blog", "guide", "docs", "published", "draft"].map((f) => (
            <button
              key={f}
              onClick={() => set_filter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer capitalize
                ${
                  filter === f
                    ? "border-zinc-600 text-zinc-300 bg-zinc-800"
                    : "border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="px-8 py-4 flex-1">
          {/* Table head */}
          <div className="flex items-center gap-4 px-3 py-2 text-xs text-zinc-700 tracking-widest uppercase border-b border-zinc-800/60 mb-1">
            <span className="flex-1">Title</span>
            <span className="w-16 text-center">Type</span>
            <span className="w-20 text-center">Status</span>
            <span className="w-24 text-right">Date</span>
            <span className="w-16 text-right">Actions</span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-zinc-800 text-4xl mb-4 select-none">∅</p>
              <p className="text-sm text-zinc-600">
                No content matches this filter
              </p>
            </div>
          ) : (
            filtered.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 px-3 py-3 text-sm rounded-lg hover:bg-zinc-900/40 transition-colors duration-150 group
                  ${i !== filtered.length - 1 ? "border-b border-zinc-800/40" : ""}`}
              >
                <span className="flex-1 text-zinc-300 truncate">
                  {item.title}
                </span>
                <span
                  className={`w-16 text-center text-xs border px-2 py-0.5 rounded-md ${type_colors[item.type]}`}
                >
                  {item.type}
                </span>
                <span
                  className={`w-20 text-center text-xs ${status_colors[item.status]}`}
                >
                  {item.status}
                </span>
                <span className="w-24 text-right text-xs text-zinc-700">
                  {item.date}
                </span>
                <div className="w-16 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => set_show_delete(item.id)}
                    className="text-xs text-zinc-700 hover:text-red-400/70 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    Del
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Logout modal */}
      {show_logout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-8 max-w-sm w-full mx-4 flex flex-col gap-5">
            <div>
              <h2 className="text-base text-zinc-200 font-normal mb-2">
                Sign out
              </h2>
              <p className="text-sm text-zinc-500">
                Are you sure you want to sign out? You'll need to log in again
                to access the admin area.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handle_logout}
                className="flex-1 text-sm text-zinc-300 border border-zinc-700 py-2.5 rounded-xl hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
              >
                Sign out
              </button>
              <button
                onClick={() => set_show_logout(false)}
                className="flex-1 text-sm text-zinc-600 border border-zinc-800 py-2.5 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {show_delete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-8 max-w-sm w-full mx-4 flex flex-col gap-5">
            <div>
              <h2 className="text-base text-zinc-200 font-normal mb-2">
                Delete post
              </h2>
              <p className="text-sm text-zinc-500">
                This action cannot be undone. The post will be permanently
                removed.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handle_delete(show_delete)}
                className="flex-1 text-sm text-red-400/70 border border-red-900/40 py-2.5 rounded-xl hover:bg-red-900/20 transition-all duration-200 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => set_show_delete(null)}
                className="flex-1 text-sm text-zinc-600 border border-zinc-800 py-2.5 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create modal */}
      {show_create && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-8 max-w-sm w-full mx-4 flex flex-col gap-5">
            <div>
              <h2 className="text-base text-zinc-200 font-normal mb-1">
                New post
              </h2>
              <p className="text-xs text-zinc-600">
                Fill in the details to create a new entry.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-zinc-600 mb-1.5 block">
                  Title
                </label>
                <input
                  type="text"
                  value={create_form.title}
                  onChange={(e) =>
                    set_create_form((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Enter title..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-600 mb-1.5 block">
                  Description
                </label>
                <textarea
                  type="text"
                  value={create_form.description}
                  onChange={(e) =>
                    set_create_form((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter description..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors duration-200"
                ></textarea>
              </div>
              <div>
                <label className="text-xs text-zinc-600 mb-1.5 block">
                  Type
                </label>
                <select
                  value={create_form.type}
                  onChange={(e) =>
                    set_create_form((p) => ({ ...p, type: e.target.value }))
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-400 outline-none focus:border-zinc-600 transition-colors duration-200 cursor-pointer"
                >
                  <option value="blog">Blog</option>
                  <option value="guide">Guide</option>
                  <option value="docs">Documentation</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-600 mb-1.5 block">
                  Tags
                </label>
                <input
                  type="text"
                  value={create_form.tag}
                  onChange={(e) =>
                    set_create_form((p) => ({ ...p, tag: e.target.value }))
                  }
                  placeholder="Enter tag..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors duration-200"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-600 mb-1.5 block">
                  Make it
                </label>
                <select
                  value={create_form.status}
                  onChange={(e) =>
                    set_create_form((p) => ({ ...p, status: e.target.value }))
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-400 outline-none focus:border-zinc-600 transition-colors duration-200 cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handle_create}
                className="flex-1 text-sm text-zinc-300 border border-zinc-700 py-2.5 rounded-xl hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
              >
                Create
              </button>
              <button
                onClick={() => set_show_create(false)}
                className="flex-1 text-sm text-zinc-600 border border-zinc-800 py-2.5 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
