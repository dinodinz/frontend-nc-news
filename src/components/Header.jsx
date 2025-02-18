import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return (
    <div id="header">
      <div className="header-toolbar">
        <Link to="/" className="header-logo-link">
          <div className="header-logo">
            <h1>
              <span>NC</span>
            </h1>
            <p>NEWS</p>
          </div>
        </Link>
        {isLoggedIn ? (
          <div className="header-info">
            <p>Username</p>
            <p>Name</p>
          </div>
        ) : (
          <div className="header-login-button">
            <Link to="/login">
              <button type="submit">LOGIN</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
