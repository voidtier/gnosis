import { NavLink } from "react-router-dom";

export function Nav_items({ custom_classes = "" }) {
  return (
    <>
      <NavLink to="/blog" className={`${custom_classes} `}>
        Blog
      </NavLink>
      <NavLink to="/guide" className={`${custom_classes}`}>
        Guide
      </NavLink>
      <NavLink to="/documentation" className={`${custom_classes}`}>
        Documentation
      </NavLink>
    </>
  );
}
