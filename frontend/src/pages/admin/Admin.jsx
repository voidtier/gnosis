import { useNavigate } from "react-router-dom";
import { useAuth_context } from "../../features/auth/context/Auth.context.js";
import { useState } from "react";

const quick_stats = [
  { label: "Blog posts", value: 24, path: "/admin/dashboard" },
  { label: "Guides", value: 12, path: "/admin/dashboard" },
  { label: "Doc pages", value: 8, path: "/admin/dashboard" },
  { label: "Drafts", value: 3, path: "/admin/dashboard" },
];

const quick_links = [
  {
    title: "Dashboard",
    desc: "Manage all content — blog posts, guides, and documentation.",
    path: "/admin/dashboard",
    tag: "content",
  },
  {
    title: "Blog",
    desc: "View and edit all published and draft blog posts.",
    path: "/blog",
    tag: "public",
  },
  {
    title: "Guides",
    desc: "Browse the full guide library as a reader would see it.",
    path: "/guide",
    tag: "public",
  },
  {
    title: "Documentation",
    desc: "Review the documentation section and its current state.",
    path: "/documentation",
    tag: "public",
  },
];

const recent_activity = [
  {
    action: "Published",
    title: "The quiet power of structured thinking",
    type: "blog",
    time: "2h ago",
  },
  {
    action: "Created",
    title: "JWT authentication from scratch",
    type: "guide",
    time: "1d ago",
  },
  {
    action: "Updated",
    title: "REST API authentication reference",
    type: "docs",
    time: "2d ago",
  },
  {
    action: "Draft saved",
    title: "MongoDB aggregation pipelines",
    type: "guide",
    time: "3d ago",
  },
  {
    action: "Published",
    title: "Why I write before I think",
    type: "blog",
    time: "5d ago",
  },
];

const type_colors = {
  blog: "text-zinc-400 border-zinc-700",
  guide: "text-zinc-500 border-zinc-800",
  docs: "text-zinc-600 border-zinc-800",
};

const action_colors = {
  Published: "text-zinc-400",
  Created: "text-zinc-500",
  Updated: "text-zinc-500",
  "Draft saved": "text-zinc-700",
};

export default function Admin() {
  const { user, set_user } = useAuth_context();
  const navigate = useNavigate();
  const [show_logout, set_show_logout] = useState(false);

  function handle_logout() {
    set_user(null);
    navigate("/admin/login");
  }

  return (
    <main className="bg-zinc-950 w-full min-h-screen">
      {/* Header */}
      <div className="px-8 pt-12 pb-8 border-b border-zinc-800/60 flex items-start justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-zinc-700 mb-3">
            Admin area
          </p>
          <h1 className="text-3xl text-zinc-200 font-normal mb-2">
            Welcome back{user?.username ? `, ${user.username}` : ""}.
          </h1>
          <p className="text-sm text-zinc-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-3 mt-1">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-xs text-zinc-400 border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
          >
            Go to dashboard
          </button>
          <button
            onClick={() => set_show_logout(true)}
            className="text-xs text-zinc-600 border border-zinc-800 px-4 py-2 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="px-8 py-8 flex flex-col gap-10">
        {/* Stats */}
        <div>
          <p className="text-xs tracking-[0.16em] uppercase text-zinc-700 mb-4">
            Overview
          </p>
          <div className="grid grid-cols-4 gap-4">
            {quick_stats.map((s) => (
              <button
                key={s.label}
                onClick={() => navigate(s.path)}
                className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-5 py-5 text-left hover:border-zinc-700 transition-all duration-200 cursor-pointer group"
              >
                <p className="text-2xl text-zinc-200 font-normal mb-1 group-hover:text-zinc-100 transition-colors">
                  {s.value}
                </p>
                <p className="text-xs text-zinc-600">{s.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick links + Activity */}
        <div className="grid grid-cols-2 gap-6">
          {/* Quick links */}
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-zinc-700 mb-4">
              Quick access
            </p>
            <div className="flex flex-col gap-2">
              {quick_links.map((link) => (
                <button
                  key={link.title}
                  onClick={() => navigate(link.path)}
                  className="flex items-start justify-between gap-4 bg-zinc-900/40 border border-zinc-800/60 rounded-xl px-5 py-4 text-left hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300 font-normal mb-1 group-hover:text-zinc-100 transition-colors">
                      {link.title}
                    </p>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md">
                      {link.tag}
                    </span>
                    <span className="text-zinc-700 text-xs group-hover:text-zinc-500 transition-colors">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-zinc-700 mb-4">
              Recent activity
            </p>
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden">
              {recent_activity.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 px-5 py-4
                    ${i !== recent_activity.length - 1 ? "border-b border-zinc-800/40" : ""}`}
                >
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <div className="w-1 h-1 rounded-full bg-zinc-700 mt-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs ${action_colors[item.action]}`}>
                        {item.action}
                      </span>
                      <span
                        className={`text-xs border px-1.5 py-0 rounded-md ${type_colors[item.type]}`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-snug truncate">
                      {item.title}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-700 shrink-0 pt-0.5">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin info */}
        <div className="border border-zinc-800/60 rounded-xl px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-zinc-700 mb-2">
              Signed in as
            </p>
            <p className="text-sm text-zinc-300 mb-0.5">
              {user?.username || "Admin"}
            </p>
            <p className="text-xs text-zinc-600">{user?.email || "—"}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <span className="text-xs text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-md">
              {user?.role || "admin"}
            </span>
          </div>
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
    </main>
  );
}
