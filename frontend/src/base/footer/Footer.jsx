import { NavLink, useNavigate } from "react-router-dom";
import { Nav_items } from "../nav/Nav_items.jsx";
import { useAuth_context } from "../../features/auth/context/Auth.context.js";

export default function Footer() {
  const { user } = useAuth_context();
  const navigate = useNavigate();

  return (
    <footer className="border-t border-zinc-800/60 px-8 py-6 flex items-start justify-between gap-8 bg-zinc-950">
      {/* Left */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-500 font-medium">Gnosis</p>
        <p className="text-xs text-zinc-700 leading-relaxed max-w-xs">
          A knowledge platform for blogs, guides, and technical documentation.
        </p>
        <p className="text-xs text-zinc-800 mt-1">
          © 2026 — All rights reserved
        </p>
      </div>

      {/* Center nav */}
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.16em] uppercase text-zinc-700 mb-1">
          Navigate
        </p>
        <NavLink
          to="/"
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
        >
          Home
        </NavLink>
        <Nav_items custom_classes="text-xs text-zinc-600 hover:text-zinc-400" />
      </div>

      {/* Right */}
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.16em] uppercase text-zinc-700 mb-1">
          Admin
        </p>
        {user ? (
          <>
            <button
              onClick={() => navigate("/admin")}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200 text-left cursor-pointer"
            >
              Admin area
            </button>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200 text-left cursor-pointer"
            >
              Dashboard
            </button>
          </>
        ) : (
          <NavLink
            to="/admin/login"
            className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors duration-200"
          >
            Sign in
          </NavLink>
        )}
      </div>
    </footer>
  );
}
