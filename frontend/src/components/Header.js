import React, { useState } from "react";
import logo from "../images/header-logo.png";
import { useMatch, Link } from "react-router-dom";
import menu from "../images/nav-bar.png";
import closeBtn from "../images/close-icon.png";

function Header({ email, signOut }) {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  const onSignOut = () => {
    signOut();
    setOpen(false);
  };

  return (
    <>
      <header className={`header ${open ? "header_menu-open" : ""}`}>
        <img
          className="header__logo-header header__logo-header_size"
          src={logo}
          alt="Logo Around, alrededor
        de los estados unidos"
        />
        {useMatch("/signin") && (
          <Link to="/signup" className="link link__auth">
            Regístrate
          </Link>
        )}

        {useMatch("/signup") && (
          <Link to="/signin" className="link link__auth link__auth_size">
            Iniciar Sesión
          </Link>
        )}

        {useMatch("/") && (
          <>
            <div className={`header__nav-bar ${open && ""}`}>
              <span className="header__email">{email}</span>
              <button className="header__sign-out" onClick={onSignOut}>
                Cerrar Sesión
              </button>
              <div className="header__divider-menu"></div>
            </div>

            {open ? (
              <img
                src={closeBtn}
                alt="Botón cerrar menú"
                onClick={handleMenu}
                className="header__close-btn"
              />
            ) : (
              <img
                src={menu}
                alt="menú desplegable forma hamburguesa"
                onClick={handleMenu}
                className="header__menu"
              />
            )}
          </>
        )}
      </header>
      <div className="divider-section"></div>
    </>
  );
}

export default Header;
