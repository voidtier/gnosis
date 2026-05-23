import { Routes, Route } from "react-router-dom";
import Layout from "./base/layout/Layout.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Admin_dashboard from "./pages/admin/Admin_dashboard.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Blog_post from "./pages/blog/Blog_post.jsx";
import Documentation from "./pages/documentation/Documentation.jsx";
import Guide from "./pages/guide/Guide.jsx";
import Guide_post from "./pages/guide/Guide_post.jsx";
import Login_admin from "./pages/auth/Login_admin.jsx";
import Home from "./pages/home/Home.jsx";
import Not_found from "./pages/404/Not_found.jsx";
import Error_page from "./pages/error/Error_page.jsx";
import { Auth_provider } from "./features/auth/context/Auth.provider.jsx";
import Admin_protected_route from "./features/admin/controller/Admin_protected.route.jsx";
import ScrollToTop from "./components/utils/Scroll_to_top.jsx";

export default function Router_routes() {
  return (
    <Auth_provider>
      <ScrollToTop />
      <Routes>
        {/* Auth — no layout */}
        <Route path="/admin/login" element={<Login_admin />} />

        {/* Error — no layout */}
        <Route path="/error" element={<Error_page />} />

        {/* Main layout */}
        <Route element={<Layout />} errorElement={<Error_page />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog_post />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/:id" element={<Guide_post />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Protected — admin only */}
          <Route element={<Admin_protected_route allowed_roles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<Admin_dashboard />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Not_found />} />
        </Route>
      </Routes>
    </Auth_provider>
  );
}
