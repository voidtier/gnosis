import { NavLink } from "react-router-dom";
import { Nav_items } from "../nav/Nav_items.jsx";

export default function Header() {
  return (
    <>
      <nav className="flex gap-x-6 px-6 py-5 bg-zinc-950 border-b border-zinc-700 sticky top-0">
        <NavLink
          to="/"
          className="text-sm text-gray-500 hover:text-gray-300  duration-300 mr-auto"
        >
          Home
        </NavLink>
        <Nav_items custom_classes="text-sm text-gray-500 hover:text-gray-300 duration-300 " />
      </nav>
    </>
  );
}
