import React, { useState } from "react";
import Clair from "./img/Clair.svg";
import Sombre from "./img/Sombre.svg";
import Logo from "./img/Logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [mode, setMode] = useState(false);

  const handleMode = () => {
    setMode(!mode);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <img
            src={mode ? Clair : Sombre}
            alt="Mode clair"
            onClick={handleMode}
            className="nav-mode"
          />
          <p className="nav-language">Fr ▼</p>
        </div>
        <div className="nav-brand">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="nav-login">
          <a href="/login">Se connecter</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
