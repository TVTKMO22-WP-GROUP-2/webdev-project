import axios from "axios";
import { useState } from "react";
import "../index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setIsError] = useState(false);

  // * Sign up and login HTTP requests in the same function
  const signUpOrLogIn = async () => {
    try {
      const response = await axios.post(
        isSignUp
          ? "http://localhost:3000/users/signup"
          : "http://localhost:3000/users/login",
        {
          username,
          password,
        }
      );
      console.log(response);
      setIsError(false);
    } catch (err) {
      console.error("Error " + err);
      if (err.response) {
        const errorMessages = err.response.data.map((error) => error.msg);
        renderErrorMessages(errorMessages);
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  };

  // * This function renders top error messages to the user received as a response from the post request
  const renderErrorMessages = (errorMessages) => {
    const errorMessageContainerElement =
      document.getElementById("loginErrorMessages");
    if (errorMessageContainerElement) {
      while (errorMessageContainerElement.firstChild) {
        errorMessageContainerElement.removeChild(
          errorMessageContainerElement.firstChild
        );
      }
      for (let i = 0; i < errorMessages.length && i < 3; i++) {
        const errorMessageElement = document.createElement("p");
        errorMessageElement.textContent = "\u{1F6C8} " + errorMessages[i];
        errorMessageContainerElement.appendChild(errorMessageElement);
      }
    }
  };

  // * Function which handles the clicking of the (Log in)/(Sign up) button
  const handleSubmit = () => {
    signUpOrLogIn();
  };

  // * This function keeps track of whether the user is on the sign up screen or the log in screen
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  // * These two functions set the username and password variables when input is changed by user
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsError(false);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsError(false);
  };

  return (
    <>
      <div className="loginPageContainer">
        <div className="loginBox">
          <div className="loginHeaderTextContainer">
            <h1 className="loginHeaderText">
              {isSignUp ? "Create account" : "Log in to your account"}
            </h1>
          </div>
          <div className="loginPageUserNameAndPassContainer">
            <div className="loginPageUserNameContainer">
              <input
                type="text"
                placeholder="Username"
                onChange={handleUsernameChange}
                className={
                  isError
                    ? "errorInputFields usernameInputField"
                    : "inputFields usernameInputField"
                }
              />
            </div>
            <div className="loginPageUserPassContainer">
              <input
                type="text"
                placeholder="Password"
                onChange={handlePasswordChange}
                className={
                  isError
                    ? "errorInputFields passwordInputField"
                    : "inputFields passwordInputField"
                }
              />
            </div>
          </div>
          <div
            id="loginErrorMessages"
            className="loginErrorMessagesContainer"
          ></div>
          <div className="loginButtonContainer">
            <button
              type="button"
              className={
                isSignUp
                  ? "loginAndSignupButtons signupButton"
                  : "loginAndSignupButtons loginButton"
              }
              onClick={handleSubmit}
            >
              {isSignUp ? "Create account" : "Log in"}
            </button>
          </div>
          <div className="loginSeparatorContainer">
            <hr className="loginSeparator" />
          </div>
          <div className="loginNoAccountTextContainer">
            <h2 className="loginNoAccountText">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account yet?"}
            </h2>
          </div>
          <div className="signUpToggleButtonContainer">
            <button
              className="signUpToggleButton"
              type="button"
              onClick={toggleSignUp}
            >
              {isSignUp ? "Log in" : "Sign up!"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
