import { loginPageLgImgUrl, websiteLogoImgUrl } from "../../assets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConstants } from "../../utils";
import Loader from "../Loader";
import Cookies from "js-cookie";
import { playInputChangeSound, playErrorSound } from "../../utils";
import { MuteLogo, UnmuteLogo } from "../../assets";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { LightBulbOff, LightBulbOn } from "../../assets";
import "./index.css";

export default function Login() {

  // Login form data.
  const [formData, setFormData] = useState({
    username: "rahul",
    password: "rahul@2021",
  });

  // Login error message.
  const [errorMsg, setErrorMsg] = useState("");

  // This is use to navigate user at homepage after successfull login.
  const navigate = useNavigate();

  // Maintaining api status to take decesion like -> rendering InfinityLoader.
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  // handling sounds..
  const [sound, setSound] = useState(true);

  // Using context to toggle website theme betweend Dark and Light.
  const { dark, setDark } = useContext(SettingsContext);

  // Handling change in the login form.
  const handleChange = (event) => {
    if (sound) {
      playInputChangeSound();
    }
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // render website logo and website heading.
  const renderWebsiteLogoAndHeading = () => {
    return (
      <div className="login-website-logo-container">
        <img
          src={websiteLogoImgUrl}
          alt="website logo"
          className="login-website-logo"
        />
        <h1
          className={`login-insta-share-heading ${dark ? "light-text" : "dark-text"
            }`}
        >
          Insta Share
        </h1>
      </div>
    );
  };

  // render landing image in large screen.
  const renderLoginLargeImg = () => {
    return (
      <img
        className="login-large-img"
        src={loginPageLgImgUrl}
        alt="website login"
      />
    );
  };

  // render form field of -> username.
  const renderUsernameAndItsLabel = () => {
    return (
      <>
        <label
          htmlFor="loginUsername"
          className={`login-form-label ${dark ? "light-text" : "dark-text"}`}
        >
          USERNAME
        </label>
        <input
          value={formData.username}
          title="Please Enter you Username"
          placeholder="Username"
          id="loginUsername"
          type="text"
          name="username"
          className="login-form-input-field"
          onChange={handleChange}
        />
      </>
    );
  };

  // render form field of -> password.
  const renderPasswordAndItsLabel = () => {
    return (
      <>
        <label
          htmlFor="loginPassword"
          className={`login-form-label ${dark ? "light-text" : "dark-text"}`}
        >
          PASSWORD
        </label>
        <input
          value={formData.password}
          title="Please Enter Your Password"
          placeholder="Password"
          id="loginPassword"
          type="password"
          name="password"
          className="login-form-input-field"
          onChange={handleChange}
        />
      </>
    );
  };

  // render error message according to crendentials.
  const renderErrorMessage = () => {
    return <p className="login-error-msg">{errorMsg}</p>;
  };

  // render login Button to submit form and make request of login.
  const renderLoginButton = () => {
    return (
      <button type="submit" className="login-btn" title="Press to Login">
        {apiStatus === apiConstants.inProgress ? <Loader /> : "Login"}
      </button>
    );
  };

  // This function is handling the login form submition.
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setApiStatus(apiConstants.inProgress);

    // Handling api.
    const { username, password } = formData;
    const userCredentials = {
      username: username,
      password: password,
    };
    const apiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userCredentials),
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    if (response.ok) {
      const jwtToken = fetchedData.jwt_token;
      Cookies.set("jwt_token", jwtToken, { expires: 7 });
      setApiStatus(apiConstants.success);
      navigate("/");
    } else {
      const errorMsg = fetchedData.error_msg;
      if (sound) {
        playErrorSound();
      }
      setErrorMsg(errorMsg);
      setApiStatus(apiConstants.failure);
    }
  };

  // handling sounds.
  const handleSound = () => {
    setSound(!sound);
  };

  // render sound button.
  const renderSoundLogo = () => {
    return (
      <button
        type="button"
        className={`sound-btn ${dark ? "light-text" : "dark-text"}`}
        onClick={handleSound}
      >
        {sound ? <MuteLogo /> : <UnmuteLogo />}
      </button>
    );
  };

  // This function is for toggle theme between light and dark.
  const toggleTheme = () => {
    setDark(!dark);
  };

  // This functional component is used to render theme button.
  const renderToggleThemeButton = () => {
    return (
      <button type="button" className="login-theme-btn" onClick={toggleTheme}>
        {dark ? <LightBulbOn color="#fff" /> : <LightBulbOff color="#262626" />}
      </button>
    );
  };

  return (
    <div className={`login-main-container ${dark ? "dark-bg" : "white-bg"}`}>
      {renderSoundLogo()}
      {renderToggleThemeButton()}
      {renderLoginLargeImg()}
      <form className="login-form-container" onSubmit={handleLoginSubmit}>
        {renderWebsiteLogoAndHeading()}
        {renderUsernameAndItsLabel()}
        {renderPasswordAndItsLabel()}
        {renderErrorMessage()}
        {renderLoginButton()}
      </form>
    </div>
  );
}
