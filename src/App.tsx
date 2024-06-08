import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Menu } from "./components/menu/Menu";
import { Footer } from "./components/footer/Footer";
import "./styles/global.scss";

function App() {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contenContainer">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
