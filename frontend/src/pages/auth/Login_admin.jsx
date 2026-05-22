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
    <div className="w-full min-h-screen flex justify-center items-center bg-zinc-950 text-zinc-400">
      <form
        onSubmit={handle_submit}
        className="w-full max-w-95 px-8 py-10 bg-zinc-900/50 flex flex-col gap-y-6
      rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-sm"
      >
        <div className="w-full text-center space-y-2">
          <h3 className="text-xl text-zinc-400 ">Admin Access</h3>
        </div>

        {got_error && (
          <h3 className="text-lg text-zinc-200 bg-red-700/80 rounded-xl text-center px-1.5 py-2">
            Some went wrong
          </h3>
        )}

        <div className="space-y-5">
          <div className="flex flex-col gap-y-2">
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              onChange={handle_input}
              placeholder="Email Address ....."
              className="w-full outline-none bg-zinc-950 border-b border-transparent
      focus:border-zinc-700/50 focus:rounded-none focus:bg-zinc-900/50 shadow px-3.5 py-3 text-sm
      rounded-xl text-zinc-200 duration-300 transition-all placeholder:text-zinc-700"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm text-zinc-400">Password</label>
            <input
              type="password"
              name="password"
              onChange={handle_input}
              placeholder="P ......."
              className="w-full outline-none bg-zinc-950 border-b border-transparent
      focus:border-zinc-700/50 focus:rounded-none focus:bg-zinc-900/50 shadow px-3.5 py-3 text-sm
      rounded-xl text-zinc-200 duration-300 transition-all placeholder:text-zinc-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 mt-2 bg-zinc-800/80 hover:bg-zinc-950 text-zinc-300
      rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-zinc-700/20
      active:scale-[0.98]"
        >
          Sign in as Admin
        </button>

        <div className="text-center">
          <a
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            ← Or Browse as User
          </a>
        </div>
      </form>
    </div>
  );
}
