import { useState } from "react";
import { getUserByUsername } from "../utils/Api";
import { useNavigate, Link } from "react-router-dom";
import { useLoggedUser } from "../contexts/AllContexts";
import FooterCredits from "./FooterCredits.jsx";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  `https://txpahruvquebfezdyjxg.supabase.co`,
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cGFocnV2cXVlYmZlemR5anhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNzAxMTEsImV4cCI6MjA1Mzg0NjExMX0.CsSxoruabSTkf3H5eqLwz4Y7yW1mXlxVDrysdPaNk80`
);

const Create = () => {
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [username, setusername] = useState("");
  const { setLoggedUser } = useLoggedUser();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

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

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    setImageUrl(urlData.publicUrl);

    console.log("Uploaded image URL:", urlData.publicUrl);
  }

  return (
    <div className="create-main-content">
      <input
        type="text"
        placeholder="Enter Full Name"
        className="create-input-field"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      ></input>

      <input
        type="text"
        placeholder="Enter Username"
        className="create-input-field"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      ></input>
      {isInvalidUsername ? (
        <p className="invalid-username-error">Username does not exist</p>
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
        />
        {imageUrl && <img src={imageUrl} alt="Avatar" width={200} />}
      </div>
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
