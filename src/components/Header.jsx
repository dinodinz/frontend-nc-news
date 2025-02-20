import { useEffect, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { getUserByUsername } from "../utils/Api";
import { useLoggedUser } from "../contexts/AllContexts";

const Header = () => {
  const loginPage = useLocation().pathname === "/login";
  const authorPage = useMatch("/author/:author_name") !== null;
  const { loggedUser, setLoggedUser } = useLoggedUser();

  return (
    <div id="header">
      <div className="header-toolbar">
        <Link to="/home" className="header-logo-link">
          <div className="header-logo">
            <h1>
              <span>NC</span>
            </h1>
            <p>NEWS</p>
          </div>
        </Link>

        {!loginPage &&
          (loggedUser ? (
            <div className="header-info">
              <img src={loggedUser.avatar_url}></img>
              <div className="header-name-username">
                <p>
                  <span>Username:</span>
                  <br /> {loggedUser.username}
                </p>
                <p>
                  <span>Name:</span> <br /> {loggedUser.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="header-login-button">
              <Link to="/login">
                <button type="submit">LOGIN</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
