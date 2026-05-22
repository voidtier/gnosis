import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="border border-zinc-800 border-t-0 m-2 mt-0 rounded-b-xl overflow-hidden">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
