import { useState } from "react";

const sections = [
  {
    id: "intro",
    label: "Introduction",
    group: "Getting started",
    content: {
      title: "Introduction",
      body: "Gnosis is a full-stack knowledge platform built on Express and React. It serves blogs, guides, and technical documentation — all managed through a protected admin interface.",
      subsections: [
        {
          heading: "What is Gnosis?",
          text: "A content platform with a clean REST API backend and a dark, minimal frontend. Designed for people who take knowledge seriously.",
        },
        {
          heading: "Stack",
          text: "Backend: Node.js, Express 5, MongoDB via Mongoose, JWT auth via cookies. Frontend: React 19, React Router 7, Tailwind CSS 4.",
        },
      ],
      code: null,
    },
  },
  {
    id: "install",
    label: "Installation",
    group: "Getting started",
    content: {
      title: "Installation",
      body: "Clone the repo and install dependencies for both backend and frontend separately.",
      subsections: [],
      code: `git clone https://github.com/you/gnosis\n\ncd backend && npm install\ncp .env.example .env\nnpm run start\n\ncd ../frontend && npm install\nnpm run dev`,
    },
  },
  {
    id: "auth",
    label: "Authentication",
    group: "API reference",
    content: {
      title: "Authentication",
      body: "Admin authentication uses JWT tokens stored in httpOnly cookies. All protected routes require the token to be present and valid.",
      subsections: [
        {
          heading: "POST /api/auth/admin/login",
          text: "Accepts { email, password }. Returns user object and sets a token cookie on success. Returns 401/403 on failure.",
        },
        {
          heading: "GET /api/auth/admin/user_data",
          text: "Protected route. Reads token from cookie, verifies it, and returns the current admin user. Returns 401 if no token, 403 if role is not admin.",
        },
      ],
      code: null,
    },
  },
  {
    id: "blog-api",
    label: "Blog endpoints",
    group: "API reference",
    content: {
      title: "Blog endpoints",
      body: "CRUD operations for blog posts. GET is public. POST, PUT, DELETE require admin auth.",
      subsections: [
        {
          heading: "GET /api/blog",
          text: "Returns all published blog posts. No auth required.",
        },
        {
          heading: "POST /api/blog",
          text: "Creates a new blog post. Requires admin token cookie. Body: { title, description }.",
        },
        {
          heading: "PUT /api/blog/:id",
          text: "Updates an existing post by ID. Admin only.",
        },
        {
          heading: "DELETE /api/blog/:id",
          text: "Deletes a post by ID. Admin only.",
        },
      ],
      code: null,
    },
  },
  {
    id: "models",
    label: "Data models",
    group: "Reference",
    content: {
      title: "Data models",
      body: "All models are defined with Mongoose. Timestamps are enabled on all schemas.",
      subsections: [
        {
          heading: "User",
          text: "Fields: name { firstname, lastname }, username (unique), email (unique), password (hashed), role (admin | editor | user).",
        },
        {
          heading: "Blog / Guide / Documentation",
          text: "All three share the same minimal schema: title (String, required), description (String, required), plus createdAt and updatedAt from timestamps.",
        },
      ],
      code: null,
    },
  },
];

const groups = [...new Set(sections.map((s) => s.group))];

export default function Documentation() {
  const [active, setActive] = useState("intro");
  const current = sections.find((s) => s.id === active);

  return (
    <main className="bg-zinc-950 w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-8 pt-12 pb-8 border-b border-zinc-800/60">
        <p className="text-xs tracking-[0.2em] uppercase text-zinc-700 mb-3">
          Gnosis · Docs
        </p>
        <h1 className="text-3xl text-zinc-200 font-normal mb-2">
          Documentation
        </h1>
        <p className="text-sm text-zinc-500">
          Technical reference for the Gnosis platform
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 border-r border-zinc-800/60 py-6 px-4 sticky top-0 self-start">
          {groups.map((group) => (
            <div key={group} className="mb-4">
              <p className="text-xs tracking-[0.16em] uppercase text-zinc-700 mb-2 px-2">
                {group}
              </p>
              {sections
                .filter((s) => s.group === group)
                .map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-lg mb-0.5 transition-all duration-200 cursor-pointer
                    ${
                      active === s.id
                        ? "text-zinc-200 bg-zinc-800/60"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
            </div>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 px-10 py-8 max-w-2xl">
          <p className="text-xs tracking-[0.14em] uppercase text-zinc-700 mb-4">
            {current.group}
          </p>
          <h2 className="text-2xl text-zinc-200 font-normal mb-3">
            {current.content.title}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-8 border-b border-zinc-800/60 pb-8">
            {current.content.body}
          </p>

          {current.content.subsections.map((sub, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-sm font-medium text-zinc-300 mb-2 font-mono">
                {sub.heading}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {sub.text}
              </p>
            </div>
          ))}

          {current.content.code && (
            <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5 mt-4">
              <pre className="text-xs text-zinc-400 leading-relaxed overflow-x-auto font-mono whitespace-pre">
                {current.content.code}
              </pre>
            </div>
          )}

          {/* Prev / Next */}
          <div className="flex justify-between mt-12 pt-6 border-t border-zinc-800/60">
            {sections.findIndex((s) => s.id === active) > 0 ? (
              <button
                onClick={() =>
                  setActive(
                    sections[sections.findIndex((s) => s.id === active) - 1].id,
                  )
                }
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
              >
                ←{" "}
                {sections[sections.findIndex((s) => s.id === active) - 1].label}
              </button>
            ) : (
              <div />
            )}
            {sections.findIndex((s) => s.id === active) <
            sections.length - 1 ? (
              <button
                onClick={() =>
                  setActive(
                    sections[sections.findIndex((s) => s.id === active) + 1].id,
                  )
                }
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
              >
                {sections[sections.findIndex((s) => s.id === active) + 1].label}{" "}
                →
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
