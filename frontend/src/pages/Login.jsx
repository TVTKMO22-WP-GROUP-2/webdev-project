import axios from 'axios';
import { useState } from 'react';
import "../index.css";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const generateForm = (username, password) => {
        return {
            username: username,
            password: password
        };
    };

    const signUp = async () => {
        try {
            const formData = generateForm(username, password);
            const response = await axios.post("http://localhost:3000/users", formData);
            console.log(response.data);
        } catch (err) {
            console.error("Error: " + err);
        }
    };

    const handleSubmit = () => {
        if(isSignUp) {
            signUp()
        }
    }

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return(
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
                            <input type="text" className="inputFields usernameInputField"
                                   placeholder="Username" onChange={handleUsernameChange}/>
                        </div>
                        <div className="loginPageUserPassContainer">
                            <input type="text" className="inputFields passwordInputField"
                                   placeholder="Password" onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    <div className="loginButtonContainer">
                        <button type="button" 
                                className={isSignUp ? "loginAndSignupButtons signupButton" : "loginAndSignupButtons loginButton"} 
                                onClick={handleSubmit}>
                            {isSignUp ? "Create account" : "Log in"}
                        </button>
                    </div>
                    <div className="loginSeparatorContainer">
                        <hr className="loginSeparator"/>
                    </div>
                    <div className="loginNoAccountTextContainer">
                        <h2 className="loginNoAccountText">
                            {isSignUp ? "Already have an account?" : "Don't have an account yet?"}
                        </h2>
                    </div>
                    <div className="signUpToggleButtonContainer">
                        <button className="signUpToggleButton" type="button" onClick={toggleSignUp}>
                            {isSignUp ? "Log in" : "Sign up!"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;