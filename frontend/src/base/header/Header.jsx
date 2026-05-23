import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Nav_items } from "../nav/Nav_items.jsx";
import { useAuth_context } from "../../features/auth/context/Auth.context.js";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, set_user } = useAuth_context();
  const [show_logout, set_show_logout] = useState(false);

  function handle_logout() {
    set_user(null);
    set_show_logout(false);
    navigate("/admin/login");
  }

  return (
    <>
      <header className="w-full bg-zinc-950 px-2 pt-2 sticky top-0 z-50">
        {/* URL bar */}
        <div className="border border-zinc-800 border-b-0 rounded-t-xl px-5 py-1 flex items-center justify-between">
          <p className="text-xs text-zinc-700/80 font-mono">
            gnosis.site
            <span className="text-zinc-700">{location.pathname}</span>
          </p>
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="text-xs text-zinc-700">{user.username}</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-x-6 px-5 py-3 bg-zinc-950 border border-zinc-800 border-t-zinc-900">
          <NavLink
            to="/"
            className="text-sm text-zinc-500 hover:text-zinc-300 duration-300 mr-auto font-medium tracking-wide"
          >
            Gnosis
          </NavLink>

          <Nav_items custom_classes="text-sm duration-300" />

          {/* Admin link or sign in */}
          {user ? (
            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-zinc-800">
              <NavLink
                to="/admin"
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
              >
                Admin
              </NavLink>
              <button
                onClick={() => set_show_logout(true)}
                className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors duration-200 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="ml-2 pl-3 border-l border-zinc-800">
              <NavLink
                to="/admin/login"
                className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors duration-200"
              >
                Admin
              </NavLink>
            </div>
          )}
        </nav>
      </header>

      {/* Logout modal */}
      {show_logout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100">
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
    </>
  );
}
