import { useState } from "react";
import { getUserByUsername } from "../utils/Api";
import { useNavigate, Link } from "react-router-dom";
import { useLoggedUser } from "../contexts/AllContexts";
import FooterCredits from "./FooterCredits.jsx";

const Create = () => {
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [username, setusername] = useState("");
  const { setLoggedUser } = useLoggedUser();
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const usernameInput = event.target.value;

    if (usernameInput.length !== 0) {
      getUserByUsername(event.target.value)
        .then((successUserLogin) => {
          setIsInvalidUsername(false);
          setLoggedUser(successUserLogin);
          navigate(`/`);
        })
        .catch((err) => {
          setIsInvalidUsername(true);
        });
    }
  }

  return (
    <div className="login-main-content">
      <input
        type="text"
        placeholder="Enter Full Name"
        className="login-input-field"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="Enter Username"
        className="login-input-field"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      ></input>
      {isInvalidUsername ? (
        <p className="invalid-username-error">Username does not exist</p>
      ) : null}
      <button
        type="submit"
        value={username}
        className="login-button"
        onClick={handleLogin}
      >
        Create account
      </button>
      <div className="sign-up-offer">
        <p className="dont-have-account">Already have an account? </p>
        <Link to="/login">
          <p className="sign-up-now">Log in here!</p>
        </Link>
      </div>
      <FooterCredits />
    </div>
  );
};

export default Create;
