import { Outlet } from "react-router-dom";

import "./index.css";
import Footer from "../../../widgets/ui/Footer";

const Layout = () => {
  return (
    <div className="layout-container">
      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
