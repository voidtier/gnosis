import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth_context } from "../../features/auth/context/Auth.context.js";

// ─── Constants ───────────────────────────────────────────────────────────────

const TYPE_COLORS = {
  blog: "text-zinc-400 border-zinc-700",
  guide: "text-zinc-500 border-zinc-800",
  docs: "text-zinc-600 border-zinc-800",
};

const STATUS_COLORS = {
  published: "text-zinc-400",
  draft: "text-zinc-700",
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "blog", label: "Blog posts" },
  { id: "guide", label: "Guides" },
  { id: "docs", label: "Documentation" },
];

const FILTERS = ["all", "blog", "guide", "docs", "published", "draft"];

const STATIC_CONTENT = [
  {
    _id: "s1",
    title: "The quiet power of structured thinking",
    type: "blog",
    status: "published",
    createdAt: "2026-01-21",
  },
  {
    _id: "s2",
    title: "JWT authentication from scratch",
    type: "guide",
    status: "published",
    createdAt: "2026-01-18",
  },
  {
    _id: "s3",
    title: "REST API authentication reference",
    type: "docs",
    status: "published",
    createdAt: "2026-01-14",
  },
  {
    _id: "s4",
    title: "Obsidian, Notion, or plain files",
    type: "blog",
    status: "published",
    createdAt: "2026-01-12",
  },
  {
    _id: "s5",
    title: "MongoDB aggregation pipelines",
    type: "guide",
    status: "draft",
    createdAt: "2026-01-10",
  },
  {
    _id: "s6",
    title: "Data models reference",
    type: "docs",
    status: "draft",
    createdAt: "2026-01-08",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt_date(str) {
  return new Date(str).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function today_label() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// ─── Components ───────────────────────────────────────────────────────────────

function Modal({ children, on_close }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && on_close()}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col gap-5 p-8">
        {children}
      </div>
    </div>
  );
}

function Sidebar({ user, active_nav, on_nav, on_sign_out }) {
  return (
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
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => on_nav(id)}
            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer
              ${
                active_nav === id
                  ? "text-zinc-200 bg-zinc-800/60"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
              }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-zinc-800/60">
        <button
          onClick={on_sign_out}
          className="w-full text-left text-sm px-3 py-2 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

function StatsBar({ content }) {
  const stats = [
    {
      label: "Blog posts",
      value: content.filter(
        (c) => c.type === "blog" && c.status === "published",
      ).length,
    },
    {
      label: "Guides",
      value: content.filter(
        (c) => c.type === "guide" && c.status === "published",
      ).length,
    },
    {
      label: "Doc pages",
      value: content.filter(
        (c) => c.type === "docs" && c.status === "published",
      ).length,
    },
    {
      label: "Drafts",
      value: content.filter((c) => c.status === "draft").length,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 px-8 py-6 border-b border-zinc-800/60">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-4"
        >
          <p className="text-2xl text-zinc-200 font-normal mb-1">{value}</p>
          <p className="text-xs text-zinc-600">{label}</p>
        </div>
      ))}
    </div>
  );
}

function FilterBar({ filter, on_filter }) {
  return (
    <div className="flex gap-2 px-8 py-4 border-b border-zinc-800/60">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => on_filter(f)}
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
  );
}

function ContentTable({ items }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-zinc-800 text-4xl mb-4 select-none">∅</p>
        <p className="text-sm text-zinc-600">No content matches this filter</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 px-3 py-2 text-xs text-zinc-700 tracking-widest uppercase border-b border-zinc-800/60 mb-1">
        <span className="flex-1">Title</span>
        <span className="w-16 text-center">Type</span>
        <span className="w-20 text-center">Status</span>
        <span className="w-24 text-right">Date</span>
      </div>

      {items.map((item, i) => (
        <div
          key={item._id}
          className={`flex items-center gap-4 px-3 py-3 text-sm rounded-lg hover:bg-zinc-900/40 transition-colors duration-150 group
            ${i !== items.length - 1 ? "border-b border-zinc-800/40" : ""}`}
        >
          <span className="flex-1 text-zinc-300 truncate">{item.title}</span>
          <span
            className={`w-16 text-center text-xs border px-2 py-0.5 rounded-md ${TYPE_COLORS[item.type]}`}
          >
            {item.type}
          </span>
          <span
            className={`w-20 text-center text-xs ${STATUS_COLORS[item.status]}`}
          >
            {item.status}
          </span>
          <span className="w-24 text-right text-xs text-zinc-700">
            {fmt_date(item.createdAt)}
          </span>
        </div>
      ))}
    </>
  );
}

function LogoutModal({ on_confirm, on_cancel }) {
  return (
    <Modal on_close={on_cancel}>
      <div>
        <h2 className="text-base text-zinc-200 font-normal mb-2">Sign out</h2>
        <p className="text-sm text-zinc-500">
          Are you sure you want to sign out?
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={on_confirm}
          className="flex-1 text-sm text-zinc-300 border border-zinc-700 py-2.5 rounded-xl hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
        >
          Sign out
        </button>
        <button
          onClick={on_cancel}
          className="flex-1 text-sm text-zinc-600 border border-zinc-800 py-2.5 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Admin_dashboard() {
  const { user, set_user } = useAuth_context();
  const navigate = useNavigate();

  const [content] = useState(STATIC_CONTENT);
  const [filter, set_filter] = useState("all");
  const [active_nav, set_active_nav] = useState("dashboard");
  const [show_logout, set_show_logout] = useState(false);

  const filtered =
    filter === "all"
      ? content
      : content.filter((c) => c.type === filter || c.status === filter);

  function handle_nav(id) {
    set_active_nav(id);
    set_filter(id === "dashboard" ? "all" : id);
  }

  function handle_logout() {
    set_user(null);
    navigate("/admin/login");
  }

  return (
    <main className="bg-zinc-950 w-full min-h-screen flex">
      <Sidebar
        user={user}
        active_nav={active_nav}
        on_nav={handle_nav}
        on_sign_out={() => set_show_logout(true)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-800/60">
          <div>
            <h1 className="text-base text-zinc-200 font-medium">Dashboard</h1>
            <p className="text-xs text-zinc-600 mt-0.5">{today_label()}</p>
          </div>
        </div>

        <StatsBar content={content} />
        <FilterBar filter={filter} on_filter={set_filter} />

        <div className="px-8 py-4 flex-1">
          <ContentTable items={filtered} />
        </div>
      </div>

      {show_logout && (
        <LogoutModal
          on_confirm={handle_logout}
          on_cancel={() => set_show_logout(false)}
        />
      )}
    </main>
  );
}
