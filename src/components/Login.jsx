import { useState } from "react";
import { getUserByUsername } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "../contexts/AllContexts";

const Login = () => {
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
          navigate(`/home`);
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
