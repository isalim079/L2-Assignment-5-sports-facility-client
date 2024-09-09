import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

function App() {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/admin-dashboard") ||
    location.pathname.includes("/user-dashboard");

    const noFooter = location.pathname.includes('/checkout')

  return (
    <div>
      {noHeaderFooter || (
        <div>
          <Navbar />
        </div>
      )}
      <Outlet />
      {noHeaderFooter || noFooter || (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
