import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth_context } from "../../features/auth/context/Auth.context.js";
import {
  create_guide_controller,
  delete_guide_controller,
} from "../../features/guide/controller/guide.controller.js";
import {
  create_blog_controller,
  delete_blog_controller,
} from "../../features/blog/controller/blog.controller.js";

const type_colors = {
  blog: "text-zinc-400 border-zinc-700",
  guide: "text-zinc-500 border-zinc-800",
  docs: "text-zinc-600 border-zinc-800",
};
const status_colors = {
  published: "text-zinc-400",
  draft: "text-zinc-700",
};

const EMPTY_STEP = () => ({ title: "", content: "", code: "" });
const EMPTY_GUIDE_FORM = {
  title: "",
  description: "",
  difficulty: "Beginner",
  tag: "",
  status: "draft",
  steps: [EMPTY_STEP()],
};
const EMPTY_BLOG_FORM = {
  title: "",
  description: "",
  tag: "",
  status: "draft",
};

const static_content = [
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

// const stats_labels = ["Blog posts", "Guides", "Doc pages", "Drafts"];

// ─── subcomponents ───────────────────────────────────────────────────────────

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

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-zinc-600 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

const input_cls =
  "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors duration-200";
const select_cls =
  "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-400 outline-none focus:border-zinc-600 transition-colors duration-200 cursor-pointer";

// ─── Blog create modal ───────────────────────────────────────────────────────

function Blog_create_modal({ on_close, on_created }) {
  const [form, set_form] = useState(EMPTY_BLOG_FORM);
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState("");

  async function handle_submit() {
    if (!form.title.trim()) return set_error("Title is required.");
    if (!form.description.trim()) return set_error("Description is required.");
    set_loading(true);
    const res = await create_blog_controller(form);
    set_loading(false);
    if (res.success) {
      on_created({
        _id: Date.now(),
        ...form,
        type: "blog",
        createdAt: new Date().toISOString(),
      });
      on_close();
    } else {
      set_error(res.message || "Something went wrong.");
    }
  }

  return (
    <Modal on_close={on_close}>
      <div>
        <h2 className="text-base text-zinc-200 font-normal mb-1">
          New blog post
        </h2>
        <p className="text-xs text-zinc-600">
          Fill in the details to create a new post.
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-400/80 bg-red-900/20 border border-red-900/40 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <Field label="Title">
          <input
            className={input_cls}
            placeholder="Enter title…"
            value={form.title}
            onChange={(e) => set_form((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>
        <Field label="Description">
          <textarea
            rows={3}
            className={input_cls}
            placeholder="Enter description…"
            value={form.description}
            onChange={(e) =>
              set_form((p) => ({ ...p, description: e.target.value }))
            }
          />
        </Field>
        <Field label="Tag">
          <input
            className={input_cls}
            placeholder="e.g. thinking"
            value={form.tag}
            onChange={(e) => set_form((p) => ({ ...p, tag: e.target.value }))}
          />
        </Field>
        <Field label="Status">
          <select
            className={select_cls}
            value={form.status}
            onChange={(e) =>
              set_form((p) => ({ ...p, status: e.target.value }))
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handle_submit}
          disabled={loading}
          className="flex-1 text-sm text-zinc-300 border border-zinc-700 py-2.5 rounded-xl hover:bg-zinc-800 transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create post"}
        </button>
        <button
          onClick={on_close}
          className="flex-1 text-sm text-zinc-600 border border-zinc-800 py-2.5 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

// ─── Guide create modal ──────────────────────────────────────────────────────

function Guide_create_modal({ on_close, on_created }) {
  const [form, set_form] = useState(EMPTY_GUIDE_FORM);
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState("");

  // Step helpers
  function add_step() {
    set_form((p) => ({
      ...p,
      steps: [...p.steps, EMPTY_STEP()],
    }));
  }

  function remove_step(idx) {
    set_form((p) => ({
      ...p,
      steps: p.steps.filter((_, i) => i !== idx),
    }));
  }

  function update_step(idx, field, value) {
    set_form((p) => {
      const steps = [...p.steps];
      steps[idx] = { ...steps[idx], [field]: value };
      return { ...p, steps };
    });
  }

  async function handle_submit() {
    if (!form.title.trim()) return set_error("Title is required.");
    if (!form.description.trim()) return set_error("Description is required.");
    const has_empty_step = form.steps.some(
      (s) => !s.title.trim() || !s.content.trim(),
    );
    if (has_empty_step)
      return set_error("Every step needs a title and content.");

    // Build steps with num
    const steps_with_num = form.steps.map((s, i) => ({
      num: String(i + 1).padStart(2, "0"),
      title: s.title.trim(),
      content: s.content.trim(),
      code: s.code.trim() || null,
    }));

    set_loading(true);
    const res = await create_guide_controller({
      ...form,
      steps: steps_with_num,
    });
    set_loading(false);

    if (res.success) {
      on_created({
        _id: Date.now(),
        ...form,
        type: "guide",
        createdAt: new Date().toISOString(),
      });
      on_close();
    } else {
      set_error(res.message || "Something went wrong.");
    }
  }

  return (
    <Modal on_close={on_close}>
      <div>
        <h2 className="text-base text-zinc-200 font-normal mb-1">New guide</h2>
        <p className="text-xs text-zinc-600">
          Fill in the details, then add steps below.
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-400/80 bg-red-900/20 border border-red-900/40 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Meta fields */}
      <div className="flex flex-col gap-4">
        <Field label="Title">
          <input
            className={input_cls}
            placeholder="Guide title…"
            value={form.title}
            onChange={(e) => set_form((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>
        <Field label="Description">
          <textarea
            rows={2}
            className={input_cls}
            placeholder="Short description…"
            value={form.description}
            onChange={(e) =>
              set_form((p) => ({ ...p, description: e.target.value }))
            }
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Difficulty">
            <select
              className={select_cls}
              value={form.difficulty}
              onChange={(e) =>
                set_form((p) => ({ ...p, difficulty: e.target.value }))
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </Field>
          <Field label="Status">
            <select
              className={select_cls}
              value={form.status}
              onChange={(e) =>
                set_form((p) => ({ ...p, status: e.target.value }))
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>
        <Field label="Tag (optional)">
          <input
            className={input_cls}
            placeholder="e.g. backend"
            value={form.tag}
            onChange={(e) => set_form((p) => ({ ...p, tag: e.target.value }))}
          />
        </Field>
      </div>

      {/* Steps */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs tracking-[0.14em] uppercase text-zinc-600">
            Steps ({form.steps.length})
          </p>
          <button
            onClick={add_step}
            className="text-xs text-zinc-500 border border-zinc-800 px-2.5 py-1 rounded-lg hover:border-zinc-600 hover:text-zinc-300 transition-all cursor-pointer"
          >
            + Add step
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {form.steps.map((step, idx) => (
            <div
              key={idx}
              className="border border-zinc-800/60 rounded-xl p-4 flex flex-col gap-3 relative"
            >
              {/* Step number + remove */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-600 font-mono">
                  Step {String(idx + 1).padStart(2, "0")}
                </span>
                {form.steps.length > 1 && (
                  <button
                    onClick={() => remove_step(idx)}
                    className="text-xs text-zinc-700 hover:text-red-400/70 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                className={input_cls}
                placeholder="Step title…"
                value={step.title}
                onChange={(e) => update_step(idx, "title", e.target.value)}
              />
              <textarea
                rows={3}
                className={input_cls}
                placeholder="Explain this step…"
                value={step.content}
                onChange={(e) => update_step(idx, "content", e.target.value)}
              />
              <div>
                <p className="text-xs text-zinc-700 mb-1.5">
                  Code block (optional)
                </p>
                <textarea
                  rows={3}
                  className={`${input_cls} font-mono text-xs`}
                  placeholder="// paste code here…"
                  value={step.code}
                  onChange={(e) => update_step(idx, "code", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handle_submit}
          disabled={loading}
          className="flex-1 text-sm text-zinc-300 border border-zinc-700 py-2.5 rounded-xl hover:bg-zinc-800 transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {loading
            ? "Creating…"
            : `Create guide (${form.steps.length} step${form.steps.length !== 1 ? "s" : ""})`}
        </button>
        <button
          onClick={on_close}
          className="flex-1 text-sm text-zinc-600 border border-zinc-800 py-2.5 rounded-xl hover:border-zinc-700 hover:text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

// ─── Main dashboard ──────────────────────────────────────────────────────────

export default function Admin_dashboard() {
  const { user, set_user } = useAuth_context();
  const navigate = useNavigate();

  const [content, set_content] = useState(static_content);
  const [filter, set_filter] = useState("all");
  const [active_nav, set_active_nav] = useState("dashboard");

  // modal states
  const [show_logout, set_show_logout] = useState(false);
  const [show_delete, set_show_delete] = useState(null); // item._id
  const [show_blog_create, set_show_blog_create] = useState(false);
  const [show_guide_create, set_show_guide_create] = useState(false);

  const filtered =
    filter === "all"
      ? content
      : content.filter((c) => c.type === filter || c.status === filter);

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

  async function handle_delete(id) {
    const item = content.find((c) => c._id === id);
    if (!item) return;

    // call real API only for real (non-static) items
    if (!String(id).startsWith("s")) {
      if (item.type === "guide") await delete_guide_controller(id);
      else if (item.type === "blog") await delete_blog_controller(id);
    }
    set_content((prev) => prev.filter((c) => c._id !== id));
    set_show_delete(null);
  }

  function handle_logout() {
    set_user(null);
    navigate("/admin/login");
  }

  function nav_click(id) {
    set_active_nav(id);
    if (id === "dashboard") set_filter("all");
    else if (id === "docs") set_filter("docs");
    else set_filter(id);
  }

  return (
    <main className="bg-zinc-950 w-full min-h-screen flex">
      {/* ── Sidebar ── */}
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
              onClick={() => nav_click(item.id)}
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

      {/* ── Main ── */}
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

          {/* Create buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => set_show_guide_create(true)}
              className="text-xs text-zinc-500 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200 cursor-pointer"
            >
              + New guide
            </button>
            <button
              onClick={() => set_show_blog_create(true)}
              className="text-xs text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
            >
              + New post
            </button>
          </div>
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
                key={item._id}
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
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <div className="w-16 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer">
                    Edit
                  </button>
                  <button
                    onClick={() => set_show_delete(item._id)}
                    className="text-xs text-zinc-700 hover:text-red-400/70 transition-colors cursor-pointer"
                  >
                    Del
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Modals ── */}

      {show_blog_create && (
        <Blog_create_modal
          on_close={() => set_show_blog_create(false)}
          on_created={(item) => set_content((prev) => [item, ...prev])}
        />
      )}

      {show_guide_create && (
        <Guide_create_modal
          on_close={() => set_show_guide_create(false)}
          on_created={(item) => set_content((prev) => [item, ...prev])}
        />
      )}

      {show_logout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-8 max-w-sm w-full mx-4 flex flex-col gap-5">
            <div>
              <h2 className="text-base text-zinc-200 font-normal mb-2">
                Sign out
              </h2>
              <p className="text-sm text-zinc-500">
                Are you sure you want to sign out?
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

      {show_delete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-8 max-w-sm w-full mx-4 flex flex-col gap-5">
            <div>
              <h2 className="text-base text-zinc-200 font-normal mb-2">
                Delete item
              </h2>
              <p className="text-sm text-zinc-500">
                This cannot be undone. The item will be permanently removed.
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
    </main>
  );
}
