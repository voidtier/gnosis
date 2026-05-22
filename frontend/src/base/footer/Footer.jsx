import { NavLink } from "react-router-dom";
import { Nav_items } from "../nav/Nav_items";

export default function Footer() {
  return (
    <>
      <footer className="flex justify-between items-center bg-zinc-950 border-t border-zinc-700 py-2.5 px-7 ">
        <div className="flex flex-col gap-y-2.5  text-gray-600">
          <p>All the rights are reserved</p>
          <p>Gnosis @2026</p>
        </div>

        <nav className="flex flex-col gap-y-1.5">
          <NavLink
            to="/"
            className="text-sm text-gray-500 hover:text-gray-300  duration-300 mr-auto"
          >
            Home
          </NavLink>
          <Nav_items custom_classes="text-sm text-gray-500 hover:text-gray-300 duration-300 " />
        </nav>
      </footer>
    </>
  );
}
