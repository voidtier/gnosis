import { useParams, Link, useNavigate } from "react-router-dom";

const guides = [
  {
    id: "1",
    num: "01",
    title: "JWT authentication from scratch",
    desc: "Build a complete auth system using JSON Web Tokens, cookies, and Express middleware.",
    difficulty: "Beginner",
    tags: ["backend", "auth"],
    steps: [
      {
        num: "01",
        title: "What is JWT?",
        content:
          "JSON Web Tokens are a compact, URL-safe way to represent claims between two parties. A token has three parts — header, payload, and signature — separated by dots.",
        code: null,
      },
      {
        num: "02",
        title: "Install dependencies",
        content:
          "You need jsonwebtoken for signing and verifying tokens, bcryptjs for hashing passwords, and cookie-parser for reading cookies from requests.",
        code: `npm install jsonwebtoken bcryptjs cookie-parser`,
      },
      {
        num: "03",
        title: "Hash the password",
        content:
          "Never store plain text passwords. Use bcryptjs to hash before saving to the database. The salt rounds (10) control how expensive the hash is to compute.",
        code: `const bcrypt = require('bcryptjs');\nconst hash = await bcrypt.hash(password, 10);\n// compare on login\nconst match = await bcrypt.compare(input, hash);`,
      },
      {
        num: "04",
        title: "Sign the token",
        content:
          "After verifying credentials, sign a JWT with the user's id and role. Store the secret in your .env file — never hardcode it.",
        code: `const token = jwt.sign(\n  { id: user._id, role: user.role },\n  process.env.JWT_SECRET,\n  { expiresIn: '1d' }\n);`,
      },
      {
        num: "05",
        title: "Set cookie",
        content:
          "Send the token as an httpOnly cookie so JavaScript can't access it. This protects against XSS attacks. The browser sends it automatically on every request.",
        code: `res.cookie('token', token, { httpOnly: true });\nres.status(200).json({ success: true });`,
      },
      {
        num: "06",
        title: "Write the middleware",
        content:
          "On protected routes, read the cookie, verify the token, and attach the decoded user to the request object. Call next() to proceed or return 401/403 on failure.",
        code: `function auth(req, res, next) {\n  const token = req.cookies.token;\n  if (!token) return res.status(401).json({ message: 'No token' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ message: 'Token expired' });\n  }\n}`,
      },
      {
        num: "07",
        title: "Protect routes",
        content:
          "Apply the middleware to any route that requires authentication. Stack multiple middlewares to check both authentication and role.",
        code: `router.get('/dashboard', auth, (req, res) => {\n  res.json({ user: req.user });\n});`,
      },
    ],
  },
  {
    id: "2",
    num: "02",
    title: "MongoDB aggregation pipelines",
    desc: "Master complex data transformations with stages, operators, and real-world examples.",
    difficulty: "Intermediate",
    tags: ["mongodb", "backend"],
    steps: [
      {
        num: "01",
        title: "What is an aggregation pipeline?",
        content:
          "A pipeline is a sequence of stages. Each stage transforms the documents passing through it. The output of one stage becomes the input of the next.",
        code: null,
      },
      {
        num: "02",
        title: "The $match stage",
        content:
          "Filter documents early in the pipeline to reduce the amount of data processed by subsequent stages. Always match as early as possible.",
        code: `db.posts.aggregate([\n  { $match: { published: true } }\n]);`,
      },
      {
        num: "03",
        title: "The $group stage",
        content:
          "Group documents by a field and compute aggregated values like counts, sums, and averages.",
        code: `{ $group: {\n  _id: '$category',\n  total: { $sum: 1 },\n  avgRead: { $avg: '$readTime' }\n}}`,
      },
    ],
  },
  {
    id: "3",
    num: "03",
    title: "React context without the pain",
    desc: "A practical guide to state management patterns that scale — without Redux.",
    difficulty: "Intermediate",
    tags: ["react", "frontend"],
    steps: [
      {
        num: "01",
        title: "When to use context",
        content:
          "Context is for global state that many components need — auth, theme, language. Don't use it for local UI state that only one component cares about.",
        code: null,
      },
      {
        num: "02",
        title: "Create the context",
        content:
          "Separate the context creation from the provider. This lets you import just the hook without importing the provider.",
        code: `import { createContext, useContext } from 'react';\n\nexport const AuthContext = createContext(null);\n\nexport function useAuth() {\n  return useContext(AuthContext);\n}`,
      },
      {
        num: "03",
        title: "Write the provider",
        content:
          "The provider holds state and exposes it via the context value. Wrap your app or the relevant subtree with it.",
        code: `export function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  return (\n    <AuthContext.Provider value={{ user, setUser }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}`,
      },
    ],
  },
];

const diffColor = {
  Beginner: "text-zinc-500 border-zinc-800",
  Intermediate: "text-zinc-400 border-zinc-700",
  Advanced: "text-zinc-300 border-zinc-600",
};

export default function GuidePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const guide = guides.find((g) => g.id === id);

  const currentIndex = guides.findIndex((g) => g.id === id);
  const prev = guides[currentIndex - 1] || null;
  const next = guides[currentIndex + 1] || null;

  if (!guide) {
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
      {/* Top bar */}
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
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-zinc-700 font-mono">{guide.num}</span>
          <span className="w-px h-3 bg-zinc-800" />
          <span
            className={`text-xs border px-2 py-0.5 rounded-md ${diffColor[guide.difficulty]}`}
          >
            {guide.difficulty}
          </span>
        </div>
        <h1 className="text-2xl text-zinc-200 font-normal leading-snug mb-3">
          {guide.title}
        </h1>
        <p className="text-sm text-zinc-500 leading-relaxed mb-4">
          {guide.desc}
        </p>
        <div className="flex gap-2 mb-6">
          {guide.tags.map((t) => (
            <span
              key={t}
              className="text-xs text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-xs text-zinc-700 shrink-0">
            {guide.steps.length} steps
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-20">
        <div className="flex flex-col gap-0">
          {guide.steps.map((step, i) => (
            <div key={i} className="flex gap-6 pb-10 relative">
              {/* Step line */}
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

              {/* Step content */}
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
        <div className="w-full h-px bg-zinc-800/60 mt-4 mb-8" />

        {/* Prev / Next */}
        <div className="flex justify-between items-start gap-8">
          {prev ? (
            <Link
              to={`/guide/${prev.id}`}
              className="group flex flex-col gap-1 max-w-xs"
            >
              <span className="text-xs text-zinc-700">← Previous</span>
              <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200 leading-snug">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/guide/${next.id}`}
              className="group flex flex-col gap-1 max-w-xs text-right"
            >
              <span className="text-xs text-zinc-700">Next →</span>
              <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200 leading-snug">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
