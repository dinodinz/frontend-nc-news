import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getUserByUsername } from "../utils/Api";

const Header = () => {
  const page = useLocation().pathname === "/login";
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const LoggedUser = searchParams.get("loggedState");
    if (LoggedUser) {
      setIsloggedIn(LoggedUser);
      getUserByUsername(LoggedUser).then((returnedUser) => {
        setUser(returnedUser);
        console.log(isLoggedIn);
      });
    }
  }, [isLoggedIn]);

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

        {!page &&
          (isLoggedIn ? (
            <div className="header-info">
              <p>
                <span>Username:</span> {user.username}
              </p>
              <p>
                <span>Name:</span> {user.name}
              </p>
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

// {
//   page && loggedUser ? (
//     <div className="header-login-button">
//       <Link to="/login">
//         <button type="submit">LOGIN</button>
//       </Link>
//     </div>
//   ) : (
//     <div className="header-info">
//       <p>Username</p>
//       <p>Name</p>
//     </div>
//   );
// }
