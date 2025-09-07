import { useState } from "react";
import { getUsers, addUser } from "../../utils/Api";
import { useNavigate, Link } from "react-router-dom";
import FooterCredits from "../UI/FooterCredits.jsx";
import { createClient } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import { setHasCreated } from "../../redux/hasCreatedSlice.js";

const supabase = createClient(
  `https://txpahruvquebfezdyjxg.supabase.co`,
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cGFocnV2cXVlYmZlemR5anhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNzAxMTEsImV4cCI6MjA1Mzg0NjExMX0.CsSxoruabSTkf3H5eqLwz4Y7yW1mXlxVDrysdPaNk80`
);

const Create = () => {
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [noAvatar, setNoAvatar] = useState(false);
  const [username, setusername] = useState("");
  const [firstName, setfirstName] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  async function handleCreate(event) {
    event.preventDefault();
    const usernameInput = event.target.value;

    if (usernameInput.length >= 3 && imageUrl) {
      addUser({
        username: username,
        name: firstName,
        avatar_url: imageUrl,
      }).then(() => {
        dispatch(setHasCreated(true));
        navigate("/login");
      });
    } else if (usernameInput.length < 3) {
      setIsInvalidUsername(true);
    } else if (!imageUrl) {
      setNoAvatar(true);
    }
  }

  async function handleInputChange(event) {
    setIsInvalidUsername(false);
    const updatedUsername = event.target.value;
    setusername(updatedUsername);

    getUsers(username).then((allUsers) => {
      const userArray = allUsers.map((user) => user.username);
      if (userArray.includes(updatedUsername)) {
        setIsInvalidUsername(true);
      }
    });
  }

  async function handleFileChange(event) {
    setNoAvatar(false);
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) {
      console.error("Upload failed:", error);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    setImageUrl(urlData.publicUrl);
  }

  return (
    <div className="create-main-content">
      <input
        type="text"
        placeholder="Enter Full Name"
        className="create-input-field"
        onChange={(event) => {
          setfirstName(event.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="Enter Username"
        className="create-input-field"
        onChange={handleInputChange}
      ></input>

      {isInvalidUsername && username.length < 3 ? (
        <p className="invalid-username-error">
          Please enter a username with a minimum of 3 characters!
        </p>
      ) : null}

      {noAvatar ? (
        <p className="invalid-username-error">
          Please provide a 1x1 avatar Image!
        </p>
      ) : null}

      {isInvalidUsername && username.length >= 3 ? (
        <p className="invalid-username-error">Username is already taken!</p>
      ) : !isInvalidUsername && username.length >= 3 ? (
        <p className="valid-username-validation">Username is available</p>
      ) : null}

      <div
        className="file-upload-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <p className="avatar-image" style={{ margin: "0", fontSize: ".85rem" }}>
          Upload your avatar image:
        </p>

        <input
          type="file"
          accept="image/*"
          className="file-input-field"
          onChange={handleFileChange}
          style={{ width: "auto", maxWidth: "200px" }}
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Avatar"
            width={80}
            style={{ marginBottom: "20px", borderRadius: "50px" }}
          />
        )}
      </div>

      <button
        type="submit"
        value={username}
        className="login-button"
        onClick={handleCreate}
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
