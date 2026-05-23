import { NavLink } from "react-router-dom";

export function Nav_items({ custom_classes = "" }) {
  return (
    <>
      {[
        { to: "/blog", label: "Blog" },
        { to: "/guide", label: "Guide" },
        { to: "/documentation", label: "Documentation" },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${custom_classes} transition-colors duration-200 pb-0.5 ${
              isActive
                ? "text-zinc-200 border-b border-zinc-500"
                : "text-zinc-500 hover:text-zinc-300 border-b border-transparent"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
}
