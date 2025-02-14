import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

AnalysisLayout.propTypes = {};

function AnalysisLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AnalysisLayout;
