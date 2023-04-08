import React, { useState, useEffect } from "react";
import axios from "axios";

const GOOGLE_CLIENT_ID = "257803826922-p7l2c9u53568cjlipnhl7032on6vbtsc.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "http://localhost:8080/sign-in/oauth/google";

const SignInPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleGoogleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=profile%20email&state=some-random-state-string`;
    window.location.href = url;
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setIsLoggedIn(false);
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleCallback = async (code, state) => {
    try {
      const response = await axios.post("/auth/google/callback", {
        code,
        state,
      });
      console.log(response.data);
      setIsLoggedIn(true);
      setUserInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('useEffect')
    // Check if the URL has a code and state parameter
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    if (code && state) {
      handleGoogleCallback(code, state);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {userInfo && userInfo.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
}


export default SignInPage
