import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Menu } from "./components/menu/Menu";
import { Footer } from "./components/footer/Footer";
import "./styles/global.scss";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="main">
      {!isLoginPage && <Navbar />} {/* Conditionally render Navbar */}
      <div className="container">
        {!isLoginPage && (
          <div className="menuContainer">
            <Menu /> 
          </div>
        )}
        <div className="contentContainer">
          <Outlet /> {/* Render the matched child route's component */}
        </div>
      </div>
      {!isLoginPage && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
}

export default App;
