import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create_guide_controller } from "../../features/guide/controller/guide.controller.js";
import Label from "../../components/label/Title_based_label.jsx";
import Input from "../../components/input/Input.jsx";

// ─── constants ───────────────────────────────────────────────────────────────

const EMPTY_STEP = () => ({ title: "", content: "", code: "" });

const EMPTY_FORM = {
  title: "",
  description: "",
  difficulty: "Beginner",
  tag: "",
  status: "draft",
  steps: [EMPTY_STEP()],
};

const DIFFICULTY_OPTS = ["Beginner", "Intermediate", "Advanced"];

const diff_style = {
  Beginner: "text-zinc-500 border-zinc-800",
  Intermediate: "text-zinc-400 border-zinc-700",
  Advanced: "text-zinc-300 border-zinc-600",
};

// ─── tiny primitives ─────────────────────────────────────────────────────────

const field_cls =
  "w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-500 transition-colors duration-200";

const select_cls =
  "w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-zinc-400 outline-none focus:border-zinc-500 transition-colors duration-200 cursor-pointer";

// ─── main page ───────────────────────────────────────────────────────────────

export default function Guide_create() {
  const navigate = useNavigate();
  const [form, set_form] = useState(EMPTY_FORM);
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState("");
  const [active_step, set_active_step] = useState(0); // which step card is focused

  // ── field helpers ──
  function update(field, value) {
    set_form((p) => ({ ...p, [field]: value }));
  }

  // ── step helpers ──
  function add_step() {
    set_form((p) => ({ ...p, steps: [...p.steps, EMPTY_STEP()] }));
    // focus the new step after render
    setTimeout(() => set_active_step(form.steps.length), 0);
  }

  function remove_step(idx) {
    if (form.steps.length === 1) return; // always keep at least one
    set_form((p) => ({ ...p, steps: p.steps.filter((_, i) => i !== idx) }));
    set_active_step((prev) => Math.min(prev, form.steps.length - 2));
  }

  function update_step(idx, field, value) {
    set_form((p) => {
      const steps = [...p.steps];
      steps[idx] = { ...steps[idx], [field]: value };
      return { ...p, steps };
    });
  }

  function move_step(idx, direction) {
    const next = idx + direction;
    if (next < 0 || next >= form.steps.length) return;
    set_form((p) => {
      const steps = [...p.steps];
      [steps[idx], steps[next]] = [steps[next], steps[idx]];
      return { ...p, steps };
    });
    set_active_step(next);
  }

  // ── submit ──
  async function handle_submit() {
    if (!form.title.trim()) return set_error("Title is required.");
    if (!form.description.trim()) return set_error("Description is required.");

    const bad = form.steps.findIndex(
      (s) => !s.title.trim() || !s.content.trim(),
    );
    if (bad !== -1) {
      set_active_step(bad);
      return set_error(`Step ${bad + 1} needs a title and content.`);
    }

    set_error("");
    set_loading(true);

    const payload = {
      ...form,
      tag: form.tag.trim() || null,
      steps: form.steps.map((s, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: s.title.trim(),
        content: s.content.trim(),
        code: s.code.trim() || null,
      })),
    };

    const res = await create_guide_controller(payload);
    set_loading(false);

    if (res.success) {
      navigate("/admin/dashboard");
    } else {
      set_error(res.message || "Something went wrong.");
    }
  }

  const is_complete =
    form.title.trim() &&
    form.description.trim() &&
    form.steps.every((s) => s.title.trim() && s.content.trim());

  return (
    <div className="bg-zinc-950 min-h-screen w-full flex flex-col">
      {/* ── Top bar ── */}
      <div className="border-b border-zinc-800/60 px-8 py-4 flex items-center justify-between sticky top-0 bg-zinc-950 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
          >
            ← Dashboard
          </button>
          <span className="w-px h-3 bg-zinc-800" />
          <p className="text-xs text-zinc-600">New guide</p>
        </div>

        <div className="flex items-center gap-3">
          {/* step counter pill */}
          <span className="text-xs text-zinc-700 border border-zinc-800 px-2.5 py-1 rounded-full">
            {form.steps.length} step{form.steps.length !== 1 ? "s" : ""}
          </span>

          {/* status badge */}
          <span
            className={`text-xs border px-2.5 py-1 rounded-full ${
              form.status === "published"
                ? "text-zinc-300 border-zinc-600"
                : "text-zinc-600 border-zinc-800"
            }`}
          >
            {form.status}
          </span>

          <button
            onClick={handle_submit}
            disabled={loading || !is_complete}
            className="text-xs text-zinc-300 border border-zinc-700 px-4 py-1.5 rounded-lg hover:bg-zinc-800 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "Saving…" : "Publish guide"}
          </button>
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="px-8 py-3 bg-red-900/10 border-b border-red-900/30 flex items-center justify-between">
          <p className="text-xs text-red-400/80">{error}</p>
          <button
            onClick={() => set_error("")}
            className="text-xs text-red-900 hover:text-red-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Two panel body ── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Left sidebar — meta fields ── */}
        <aside className="w-72 shrink-0 border-r border-zinc-800/60 px-7 py-8 flex flex-col gap-8 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-700 mb-6">
              Guide details
            </p>

            <div className="flex flex-col gap-7">
              {/* Title */}
              <div>
                <Label>Title</Label>
                <input
                  type="text"
                  placeholder="e.g. JWT auth from scratch"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className={field_cls}
                />
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <textarea
                  rows={3}
                  placeholder="Short description shown on the guide card…"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className={`${field_cls} resize-none`}
                />
              </div>

              {/* Difficulty */}
              <div>
                <Label>Difficulty</Label>
                <div className="flex gap-2 mt-1">
                  {DIFFICULTY_OPTS.map((d) => (
                    <button
                      key={d}
                      onClick={() => update("difficulty", d)}
                      className={`text-xs border px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer
                        ${
                          form.difficulty === d
                            ? diff_style[d] + " bg-zinc-900"
                            : "text-zinc-700 border-zinc-800 hover:border-zinc-700"
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag */}
              <div>
                <Label>
                  Tag{" "}
                  <span className="normal-case tracking-normal text-zinc-700">
                    (optional)
                  </span>
                </Label>
                <input
                  type="text"
                  placeholder="e.g. backend, react"
                  value={form.tag}
                  onChange={(e) => update("tag", e.target.value)}
                  className={field_cls}
                />
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <div className="flex gap-2 mt-1">
                  {["draft", "published"].map((s) => (
                    <button
                      key={s}
                      onClick={() => update("status", s)}
                      className={`text-xs border px-2.5 py-1 rounded-lg capitalize transition-all duration-200 cursor-pointer
                        ${
                          form.status === s
                            ? "text-zinc-300 border-zinc-600 bg-zinc-900"
                            : "text-zinc-700 border-zinc-800 hover:border-zinc-700"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-auto pt-6 border-t border-zinc-800/60">
            <p className="text-[10px] tracking-[0.18em] uppercase text-zinc-700 mb-3">
              Checklist
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Title", done: !!form.title.trim() },
                { label: "Description", done: !!form.description.trim() },
                {
                  label: "Steps",
                  done:
                    form.steps.length > 0 &&
                    form.steps.every((s) => s.title.trim() && s.content.trim()),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className={`w-1 h-1 rounded-full ${item.done ? "bg-zinc-400" : "bg-zinc-800"}`}
                  />
                  <span
                    className={`text-xs ${item.done ? "text-zinc-500" : "text-zinc-700"}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Right panel — step builder ── */}
        <main className="flex-1 min-w-0 px-10 py-8">
          {/* Steps header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-700 mb-1">
                Steps
              </p>
              <p className="text-xs text-zinc-600">
                Each step renders as its own section on the guide page
              </p>
            </div>
            <button
              onClick={add_step}
              className="text-xs text-zinc-500 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200 cursor-pointer"
            >
              + Add step
            </button>
          </div>

          {/* Step cards */}
          <div className="flex flex-col gap-4 max-w-2xl">
            {form.steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => set_active_step(idx)}
                className={`border rounded-xl overflow-hidden transition-all duration-200
                  ${
                    active_step === idx
                      ? "border-zinc-700 bg-zinc-900/40"
                      : "border-zinc-800/60 bg-transparent hover:border-zinc-800"
                  }`}
              >
                {/* Step card header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-600 font-mono w-5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {step.title ? (
                      <span className="text-xs text-zinc-400 truncate max-w-xs">
                        {step.title}
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-700 italic">
                        Untitled step
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {/* move up */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        move_step(idx, -1);
                      }}
                      disabled={idx === 0}
                      className="text-zinc-700 hover:text-zinc-400 disabled:opacity-20 transition-colors cursor-pointer px-1.5 py-1 text-xs"
                    >
                      ↑
                    </button>
                    {/* move down */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        move_step(idx, 1);
                      }}
                      disabled={idx === form.steps.length - 1}
                      className="text-zinc-700 hover:text-zinc-400 disabled:opacity-20 transition-colors cursor-pointer px-1.5 py-1 text-xs"
                    >
                      ↓
                    </button>
                    {/* remove */}
                    {form.steps.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          remove_step(idx);
                        }}
                        className="text-zinc-700 hover:text-red-400/70 transition-colors cursor-pointer px-1.5 py-1 text-xs ml-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Step fields — only fully visible when active */}
                <div
                  className={`transition-all duration-200 ${active_step === idx ? "block" : "hidden"}`}
                >
                  <div className="px-5 py-5 flex flex-col gap-5">
                    {/* Step title */}
                    <div>
                      <Label>Step title</Label>
                      <Input
                        type="text"
                        placeholder="imported input"
                        onChange={(e) =>
                          update_step(idx, "title", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        value={step.title}
                      />
                    </div>

                    {/* Step content */}
                    <div>
                      <Label>Content</Label>
                      <textarea
                        rows={4}
                        placeholder="Explain this step clearly…"
                        value={step.content}
                        onChange={(e) =>
                          update_step(idx, "content", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className={`${field_cls} resize-none`}
                      />
                    </div>

                    {/* Code block */}
                    <div>
                      <Label>
                        Code block{" "}
                        <span className="normal-case tracking-normal text-zinc-700">
                          (optional)
                        </span>
                      </Label>
                      <textarea
                        rows={4}
                        placeholder={"// paste code here — leave empty to skip"}
                        value={step.code}
                        onChange={(e) =>
                          update_step(idx, "code", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className={`${field_cls} font-mono text-xs resize-none`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add step — bottom shortcut */}
            <button
              onClick={add_step}
              className="w-full border border-dashed border-zinc-800 rounded-xl py-4 text-xs text-zinc-700 hover:border-zinc-700 hover:text-zinc-500 transition-all duration-200 cursor-pointer"
            >
              + Add another step
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
