import { use, useEffect, useState } from "react";
import { getUserByUsername } from "../utils/Api";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ username, setusername }) => {
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const usernameValue = event.target.value;
    if (usernameValue.length !== 0) {
      getUserByUsername(event.target.value)
        .then((response) => {
          console.log("success", response);
          setIsInvalidUsername(false);
          navigate(`/?loggedState=${username}`);
        })
        .catch((err) => {
          console.log("err", err.response.data);
          setIsInvalidUsername(true);
        });
    }
  }

  return (
    <div className="login-main-content">
      <h1>username</h1>
      <input
        type="text"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      ></input>
      {isInvalidUsername ? (
        <p className="invalid-username-error">Username does not exist</p>
      ) : null}
      <button type="submit" value={username} onClick={handleLogin}>
        LOGIN
      </button>
    </div>
  );
};

export default Login;
