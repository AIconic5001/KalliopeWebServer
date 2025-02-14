import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./Layout.scss";
Layout.propTypes = {};

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
