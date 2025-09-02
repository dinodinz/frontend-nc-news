import { useState } from "react";
import { getUserByUsername } from "../../utils/Api";
import { useNavigate, Link } from "react-router-dom";
import { useLoggedUser, useHasCreatedState } from "../../contexts/AllContexts";
import FooterCredits from "../UI/FooterCredits.jsx";

const Login = () => {
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [username, setusername] = useState("");
  const { setLoggedUser } = useLoggedUser();
  const navigate = useNavigate();
  const { hasCreated, setHasCreated } = useHasCreatedState();

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
      {/* {isInvalidUsername && username.length < 3 ? (
        <p className="invalid-username-error">
          Please enter a username with a minimum of 3 characters!
        </p>
      ) : null} */}

      {hasCreated ? (
        <p className="created-account-notification">
          Your account has been created! Please login
        </p>
      ) : null}

      <input
        type="text"
        placeholder="Enter Username"
        className="login-input-field"
        onChange={(event) => {
          setusername(event.target.value);
          setIsInvalidUsername(false);
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
        Login
      </button>
      <div className="sign-up-offer">
        <p className="dont-have-account">Don’t have an account yet? </p>
        <Link to="/create">
          <p className="sign-up-now">Sign up now!</p>
        </Link>
      </div>
      <FooterCredits />
    </div>
  );
};

export default Login;
