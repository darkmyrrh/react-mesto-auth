import logo from "../images/logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ email, onSignOut, loggedIn, children }) {
  const [isNavBarOpened, setNavBarOpened] = useState(false);

  function handleMenuClick() {
    setNavBarOpened(!isNavBarOpened);
  }
  return (
    <header
      className={`header && ${isNavBarOpened ? "header_with-navbar" : ""}`}
    >
      <img src={logo} alt="Логотип" className="logo" />
      {loggedIn ? (
        <>
          <button
            className={`header__menu root__button && ${
              isNavBarOpened ? "header__menu_toggle" : ""
            }`}
            type="button"
            onClick={handleMenuClick}
          />
          <ul
            className={`header__navbar && ${
              isNavBarOpened ? "header__navbar_opened" : ""
            }`}
          >
            <li>
              <p className="header__email">{email}</p>
            </li>
            <li>
              <Link
                className="header__link root__button"
                to="/signin"
                onClick={onSignOut}
              >
                Выйти
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>{children}</>
      )}
    </header>
  );
}

export default Header;
