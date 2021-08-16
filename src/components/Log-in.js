import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Route, Switch, useHistory } from 'react-router-dom';
import MainPage from '../pages/MainPage';
const clientId = "701759415966-4f207edrmc6nfi5q11ghsp0dgshdf7k4.apps.googleusercontent.com";

function Login() {

    const history = useHistory();
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
        localStorage.setItem('is_logged_in',1)
        alert("You have been logged in successfully")
        history.push("/home")
        
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
        alert("You have been logged in successfully")
        history.push("/home")
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
        history.push('/')
    };

    const upperPad = {
        padding: '2%'
    }

    return (
        <div>
            <body>
                <div>
                    <h1 className="center"> Hello Welcome to Second Brain!</h1>
                    <br></br>
                    <p1 className="center"> Please login through your google account!</p1>
                </div>

                <div style = {upperPad} className="center">
                    {showloginButton ?
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign In"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        /> : null}

                    {showlogoutButton ?
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Sign Out"
                            onLogoutSuccess={onSignoutSuccess}
                        >

                        </GoogleLogout> : null
                    }
                </div>
            </body>
        </div>
    );
}
export default Login;
