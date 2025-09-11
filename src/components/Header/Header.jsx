import { useEffect, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { getTopics } from "../../utils/Api";
import { useSelector } from "react-redux";

const Header = () => {
  const loginPage = useLocation().pathname === "/login";
  const createPage = useLocation().pathname === "/create";
  const authorPage = useMatch("/author/:author_name") !== null;
  const [topics, setTopics] = useState([]);
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser);

  useEffect(() => {
    getTopics().then((allTopics) => {
      setTopics(allTopics);
    });
  }, []);

  function HandleLogout() {
    window.location.href = "/";
  }

  return (
    <div className="flex flex-row w-[95%] bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[40px]">
      <div className="flex flex-row w-screen justify-between items-center relative">
        <Link to="/" className="header-logo-link">
          <div className="header-logo border-2 border-white flex flex-col my-[30px] ml-[30px] mr-[auto]">
            <h1 className="m-[0px] pt-[5px] scale-y-[1.1]">
              <span className=" hover:text-[#646cff]  text-white font-medium text-[3.8rem]">
                NC
              </span>
            </h1>
            <p className=" hover:text-[#646cff] ">news</p>
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
            <div className="flex flex-row justify-end items-center">
              <div className="logout-avatar-container flex flex-col items-center gap-y-[10px] ">
                <img
                  src={loggedUser.avatar_url}
                  className="w-[6rem] h-[6rem] mr-[15px] rounded-full border-3 border-[#646cff]"
                ></img>
                <button
                  type="submit"
                  className="logout-button bg-[#916bfd] text-[black] rounded-[18px] border-[1.5px] border-[black] w-[6rem] hover:scale-108"
                  onClick={HandleLogout}
                >
                  Logout
                </button>
              </div>
              <div className="text-left pr-[20px]">
                <p>
                  <span className="text-[#646cff] font-bold">Username:</span>
                  <br /> {loggedUser.username}
                </p>
                <p>
                  <span className="text-[#646cff] font-bold">Name:</span> <br />{" "}
                  {loggedUser.name}
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
