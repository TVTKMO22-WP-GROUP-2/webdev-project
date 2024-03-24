import axios from "axios";
import { useState, useEffect } from "react";
import AlreadyLoggedIn from "../components/loginPage/AlreadyLoggedIn";
import SignUpOrLogIn from "../components/loginPage/SignUpOrLogIn";
import "../index.css";

function Login() {
  const [effectOnLogin, setEffectOnLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // > Runs every time the page mounts or the status of effectOnLogin changes.
  useEffect(() => {
    getLoginStatus();
  }, [effectOnLogin]);

  // > Gets login status of current client and sets isLoggedIn accordingly.
  const getLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/status", {
        withCredentials: true
      });
      if (response.data === true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // > Changes the status of effectOnLogin when called from child component.
  // > Passed in as a prop to the child and called on successful login.
  const reloadParent = () => {
    setEffectOnLogin((a) => !a);
  };

  // > Either renders SignUpOrLogIn or AlreadyLoggedIn if user is logged in.
  if (isLoggedIn === true) {
    return <AlreadyLoggedIn />;
  } else {
    return <SignUpOrLogIn reloadParent={reloadParent} />;
  }
}
export default Login;
