import { useState } from "react";

import { Admin_log_controller } from "../../features/auth/controller/auth_admin_log.controller";

export default function Login_admin() {
  const [form_data, set_form_data] = useState({
    email: "",
    password: "",
  });

  const [got_error, set_got_error] = useState(false);

  async function handle_submit(e) {
    e.preventDefault();
    const stat = await Admin_log_controller(form_data);
    set_got_error(!stat.success);
    if (!stat.success) return;

    if (stat.success) {
      console.log("welcome", stat.message);
    }
  }

  function handle_input(e) {
    set_form_data((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-mist-950 text-mist-400">
      <form
        onSubmit={handle_submit}
        className="w-full max-w-95 px-8 py-10 bg-mist-900/50 flex flex-col gap-y-6
      rounded-2xl border border-mist-800 shadow-2xl shadow-black/50 backdrop-blur-sm"
      >
        <div className="w-full text-center space-y-2">
          <h3 className="text-xl text-mist-500 ">Admin Access</h3>
        </div>

        {got_error && (
          <h3 className="text-sm text-text-gray-300 bg-red-600 px-1 py-1">
            Some is wrong
          </h3>
        )}

        <div className="space-y-5">
          <div className="flex flex-col gap-y-2">
            <label className="text-sm text-mist-300">Email</label>
            <input
              type="email"
              name="email"
              onChange={handle_input}
              placeholder="admin@marrow.io"
              className="w-full outline-none bg-mist-950 border border-mist-800
      focus:border-mist-500/50 focus:ring-4 focus:ring-mist-500/10 shadow-inner px-4 py-3 text-sm
      rounded-xl text-gray-300 duration-300 transition-all placeholder:text-mist-700"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-medium text-mist-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handle_input}
              placeholder="••••••••"
              className="w-full outline-none bg-mist-950 border border-mist-800
      focus:border-mist-500/50 focus:ring-4 focus:ring-mist-500/10 shadow-inner px-4 py-3 text-sm
      rounded-xl text-white duration-300 transition-all placeholder:text-mist-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 mt-2 bg-gray-950 hover:bg-gray-800 text-gray-300
      rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-900/20
      active:scale-[0.98]"
        >
          Sign in as Admin
        </button>

        <div className="text-center">
          <a
            href="/"
            className="text-sm text-mist-600 hover:text-mist-400 transition-colors"
          >
            ← Or Browse as User
          </a>
        </div>
      </form>
    </div>
  );
}
