import { Routes, Route } from "react-router-dom";
import Layout from "./base/layout/Layout.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Documentation from "./pages/documentation/Documentation.jsx";
import Guide from "./pages/guide/Guide.jsx";
import Login_admin from "./pages/auth/Login_admin.jsx";
import Home from "./pages/home/Home.jsx";

export default function Router_routes() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<Login_admin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/documentation" element={<Documentation />}></Route>
          <Route path="/guide" element={<Guide />}></Route>
        </Route>
      </Routes>
    </>
  );
}
