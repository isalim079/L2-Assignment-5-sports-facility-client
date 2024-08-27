import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

function App() {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") || location.pathname.includes("/admin-dashboard");

  return (
    <div>
      {noHeaderFooter || (
        <div>
          <Navbar />
        </div>
      )}
      <Outlet />
      {noHeaderFooter || (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
