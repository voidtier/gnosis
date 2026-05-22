import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
