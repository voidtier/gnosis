import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth_context } from "../../features/auth/context/Auth.context.js";
import { Admin_log_controller } from "../../features/auth/controller/auth_admin_log.controller";

export default function Login_admin() {
  const { set_user } = useAuth_context();
  const navigate = useNavigate();
  const [form_data, set_form_data] = useState({
    email: "",
    password: "",
  });

  const [got_error, set_got_error] = useState(false);

  async function handle_submit(e) {
    e.preventDefault();
    const stat = await Admin_log_controller(form_data);
    set_got_error(!stat.success);

    if (stat.success) {
      console.log("welcome", stat.message);
      set_user(stat.user);
      navigate("/admin/dashboard");
    }
  }

  function handle_input(e) {
    set_form_data((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="bg-zinc-950 w-full min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handle_submit}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-8 max-w-sm w-full flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2 text-center mb-2">
          <h1 className="text-xl text-zinc-200 font-normal">Admin Access</h1>
          <p className="text-xs text-zinc-600 tracking-[0.14em] uppercase">
            Gnosis Management
          </p>
        </div>

        {got_error && (
          <div className="text-xs text-red-400/80 border border-red-900/40 bg-red-900/10 rounded-xl px-4 py-3 text-center">
            Invalid credentials. Please try again.
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-zinc-500 px-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form_data.email}
              onChange={handle_input}
              placeholder="admin@gnosis.com"
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 rounded-xl px-4 py-3 text-sm transition-all duration-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-zinc-500 px-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form_data.password}
              onChange={handle_input}
              placeholder="••••••••"
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-zinc-600 rounded-xl px-4 py-3 text-sm transition-all duration-200"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-zinc-800 border border-zinc-800 text-zinc-300 hover:bg-transparent hover:border-zinc-700 rounded-xl py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer active:scale-[0.98] mt-2"
        >
          Sign in as Admin
        </button>

        <div className="text-center mt-2">
          <a
            href="/"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200 cursor-pointer"
          >
            ← Or Browse as User
          </a>
        </div>
      </form>
    </div>
  );
}
