import { NavLink } from "react-router-dom";

export function Nav_items() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/guides">Guides</NavLink>
      <NavLink to="/documentation">Documentation</NavLink>
    </>
  );
}
