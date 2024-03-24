import axios from "axios";
import { useState } from "react";
import "../../index.css";

function SignUpOrLogIn({reloadParent}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setIsError] = useState(false);

  const instance = axios.create({
    withCredentials: true
  });

  // > Sign up and login HTTP requests in the same function.
  const Submit = async () => {
    try {
      const response = await instance.post(
        isSignUp
          ? "http://localhost:3000/users/signup"
          : "http://localhost:3000/users/login",
        {
          username,
          password,
        }
      );
      // > Remove error messages if submit is successful.
      const errorMessageContainerElement = document.getElementById(
        "submitErrorMessages"
      );
      if (errorMessageContainerElement) {
        removePreviousMessages(errorMessageContainerElement);
      }
      // > Switch to login if the user just created an account successfully.
      // > Display login success message if user logged in successfully.
      if (isSignUp) {
        toggleSignUp();
        const successH3 = document.getElementById("submitSuccessMessage");
        successH3.textContent = "User created! You can now log in.";
      } else {
        const successH3 = document.getElementById("submitSuccessMessage");
        successH3.textContent = "Login was successful!";
        reloadParent();
      }
      setIsError(false);
    } catch (err) {
      // > Render error response messages if they are present.
      if (err.response && Array.isArray(err.response.data)) {
        const errorMessages = err.response.data.map((error) => error.msg);
        renderErrorMessages(errorMessages);
        setIsError(true);
      } else {
        console.log("Something went wrong" + err);
        setIsError(true);
      }
    }
  };

  // > Remove previous error messages and render new ones if they are present.
  const renderErrorMessages = (errorMessages) => {
    const errorMessageContainerElement = document.getElementById(
      "submitErrorMessages"
    );
    if (errorMessageContainerElement) {
      removePreviousMessages(errorMessageContainerElement);
      renderNewErrorMessages(errorMessageContainerElement, errorMessages);
    }
  };

  // > Removes any previous error or success messages.
  const removePreviousMessages = (errorMessageContainerElement) => {
    const successH3 = document.getElementById("submitSuccessMessage");
    successH3.textContent = "";
    while (errorMessageContainerElement.firstChild) {
      errorMessageContainerElement.removeChild(
        errorMessageContainerElement.firstChild
      );
    }
  };

  // > Renders new error messages.
  const renderNewErrorMessages = (
    errorMessageContainerElement,
    errorMessages
  ) => {
    for (let i = 0; i < errorMessages.length && i < 3; i++) {
      const errorMessageElement = document.createElement("p");
      errorMessageElement.textContent = "\u{1F6C8} " + errorMessages[i];
      errorMessageContainerElement.appendChild(errorMessageElement);
    }
  };

  // > Handles the clicking of the submit button.
  const handleSubmit = () => {
    Submit();
  };

  // > Keeps track of whether the user is on the sign up screen or the log in screen.
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  // > These two functions set the username and password variables when input is changed by user.
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
            id="submitErrorMessages"
            className="submitMsgs submitErrorMessagesContainer"
          ></div>
          <div className="submitMsgs submitSuccessMessagesContainer">
            <h3 id="submitSuccessMessage"></h3>
          </div>
          <div className="submitButtonContainer">
            <button
              type="button"
              className={
                isSignUp
                  ? "submitButton signupButton"
                  : "submitButton loginButton"
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

export default SignUpOrLogIn;
