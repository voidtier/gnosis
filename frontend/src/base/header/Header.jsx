import { NavLink } from "react-router-dom";
import { Nav_items } from "../nav/Nav_items.jsx";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const pathAfterRoot = location.pathname;
  return (
    <>
      <header className=" w-full bg-zinc-950 px-2 pt-2 sticky top-0 z-1000">
        <div className=" border border-zinc-800 rounded-t-xl">
          <p className="text-zinc-700/80 pl-5">
            gnosis.site<span className="m-0 p-0 inline">{pathAfterRoot}</span>
          </p>
        </div>

        <nav className="flex gap-x-6 px-5 py-3.5 bg-zinc-950 border-b border-zinc-700  border-x-zinc-800 ">
          <NavLink
            to="/"
            className="text-sm text-gray-500 hover:text-gray-300  duration-300 mr-auto"
          >
            Gnosis
          </NavLink>
          <Nav_items custom_classes="text-sm text-gray-500 hover:text-gray-300 duration-300 " />
        </nav>
      </header>
    </>
  );
}
