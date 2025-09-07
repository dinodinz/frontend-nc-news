import { useState } from "react";
import { getUserByUsername } from "../../utils/Api";
import { useNavigate, Link } from "react-router-dom";
import FooterCredits from "../UI/FooterCredits.jsx";
import { setLoggedUser } from "../../redux/loggedUserSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [usernameFormat, setUsernameFormat] = useState(false);
  const [username, setusername] = useState("");
  const navigate = useNavigate();
  const hasCreated = useSelector((state) => state.hasCreated.hasCreated);
  const dispatch = useDispatch();

  function handleLogin(event) {
    event.preventDefault();
    const usernameInput = event.target.value;

    if (usernameInput.length !== 0) {
      getUserByUsername(event.target.value)
        .then((successUserLogin) => {
          setIsInvalidUsername(false);
          dispatch(setLoggedUser(successUserLogin));
          navigate(`/`);
        })
        .catch((err) => {
          setIsInvalidUsername(true);
        });
    } else setUsernameFormat(true);
  }

  return (
    <div className="login-main-content">
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
          setUsernameFormat(false);
        }}
      ></input>
      {isInvalidUsername ? (
        <p className="invalid-username-error">Username does not exist</p>
      ) : null}

      {usernameFormat ? (
        <p className="invalid-username-error">
          Please enter a username Value!!
        </p>
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
