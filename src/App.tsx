import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
