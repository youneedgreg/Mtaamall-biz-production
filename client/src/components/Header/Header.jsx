import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  return (
    <section
      className="h-wrapper"
      style={{
        background: headerColor,
        borderBottomWidth: "5px",
        boxShadow: "10px 10px 10px darkgray",
      }}
    >
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="https://mtaamall.vercel.app/">
          <h1>MtaaMall</h1>
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <a
              href="mailto:gregorytemwa1212@gmail.com"
              style={{ color: "black" }}
            >
              Contact us
            </a>

            {/* Conditionally render Dashboard button */}
            {isAuthenticated && (
              <a href="/dashboard" style={{ color: "black" }}>
                <strong>Dashboard</strong>
              </a>
            )}

            {/* Add property */}
            <div
              onClick={handleAddPropertyClick}
              style={{ color: "red" }}
            >
              Add Listing
            </div>
            <AddPropertyModal
              opened={modalOpened}
              setOpened={setModalOpened}
            />

            {/* Login button */}
            {!isAuthenticated ? (
              <button
                className="button"
                onClick={loginWithRedirect}
                style={{ backgroundColor: "white", color: "black" }}
              >
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
