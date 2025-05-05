import { useEffect, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { getUserByUsername } from "../utils/Api";
import { useLoggedUser } from "../contexts/AllContexts";
import { getTopics } from "../utils/Api";

const Header = () => {
  const loginPage = useLocation().pathname === "/login";
  const createPage = useLocation().pathname === "/create";
  const authorPage = useMatch("/author/:author_name") !== null;
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((allTopics) => {
      setTopics(allTopics);
    });
  }, []);

  function HandleLogout() {
    window.location.href = "/";
  }

  return (
    <div id="header">
      <div className="header-toolbar">
        <Link to="/" className="header-logo-link">
          <div className="header-logo">
            <h1>
              <span>NC</span>
            </h1>
            <p>news</p>
          </div>
        </Link>

        <div className="header-middle-nav">
          <Link to="/">
            <div className="header-nav-all-articles">
              <p>All articles</p>
            </div>
          </Link>
          {topics.map((topic) => {
            return <p key={topic.slug}>{topic.slug}</p>;
          })}
        </div>

        {!loginPage &&
          !createPage &&
          (loggedUser ? (
            <div className="header-info">
              <div className="logout-avatar-container">
                <img src={loggedUser.avatar_url}></img>
                <button
                  type="submit"
                  className="logout-button"
                  onClick={HandleLogout}
                >
                  Logout
                </button>
              </div>
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
            <div className="right-header-container">
              <div className="header-login-button">
                <Link to="/login">
                  <button type="submit">Login</button>
                </Link>
              </div>
              <div className="header-create-button">
                <Link to="/create">
                  <button type="submit">Create</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
