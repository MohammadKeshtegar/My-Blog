import { Outlet, useLocation } from "react-router-dom";

import { FilterProvider } from "../context/FilterContext";
import Sidebar from "./Sidebar";
import Header from "../ui/Header";
import Footer from "./Footer";

function AppLayout() {
  const url = useLocation();

  const isProfile = url.pathname === "/profile";
  const isAdmin = url.pathname.startsWith("/admin");
  const favouritPage = url.pathname.startsWith("/favourite-posts");
  const showSidebar = isProfile || isAdmin || favouritPage;

  return (
    <div className="h-screen text-white">
      <Header />

      <div className="min-h-[calc(100%-4rem)] bg-neutral-900/90 flex">
        {showSidebar && <Sidebar />}
        <div
          className={`p-10 min-h-full bg-gradient-to-tr from-neutral-900/80 to-neutral-800/90 relative w-full`}
        >
          <FilterProvider>
            <Outlet />
          </FilterProvider>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
