import { Routes, Route } from "react-router-dom";
import Layout from "./base/layout/Layout.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Admin_dashboard from "./pages/admin/Admin_dashboard.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Documentation from "./pages/documentation/Documentation.jsx";
import Guide from "./pages/guide/Guide.jsx";
import Login_admin from "./pages/auth/Login_admin.jsx";
import Home from "./pages/home/Home.jsx";
import { Auth_provider } from "./features/auth/context/Auth.provider.jsx";
import Admin_protected_route from "./features/admin/controller/Admin_protected.route.jsx";

export default function Router_routes() {
  return (
    <>
      <Auth_provider>
        <Routes>
          <Route path="/admin/login" element={<Login_admin />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>

            <Route
              element={<Admin_protected_route allowed_roles={["admin"]} />}
            >
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/admin/dashboard"
                element={<Admin_dashboard />}
              ></Route>
            </Route>

            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/documentation" element={<Documentation />}></Route>
            <Route path="/guide" element={<Guide />}></Route>
          </Route>
        </Routes>
      </Auth_provider>
    </>
  );
}
