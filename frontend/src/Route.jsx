import { Routes, Route } from "react-router-dom";
import Layout from "./base/layout/Layout.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Admin_dasboard from "./pages/admin/Admin_dasboard.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Documentation from "./pages/documentation/Documentation.jsx";
import Guide from "./pages/guide/Guide.jsx";
import Login_admin from "./pages/auth/Login_admin.jsx";
import Home from "./pages/home/Home.jsx";
import { Auth_provider } from "./features/auth/context/Auth.context.js";

export default function Router_routes() {
  return (
    <>
      <Auth_provider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}>
              <Route path="/dasboard" element={<Admin_dasboard />}></Route>
              <Route path="/login" element={<Login_admin />} />
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
