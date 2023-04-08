import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import axios from "axios";

const GOOGLE_CLIENT_ID =
  "257803826922-p7l2c9u53568cjlipnhl7032on6vbtsc.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "http://localhost:8080/sign-in/oauth/google";

const WelcomePage = () => {
  const onGoogleSignInSuccess = (res: { tokenObj: { id_token: string } }) => {
    const params = new URLSearchParams();
    params.append("idToken", res.tokenObj.id_token);

    const googleLogin = async () => {
      const res = await axios.post(GOOGLE_REDIRECT_URI, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("accessToken", res.data.token.access);
      localStorage.setItem("refreshToken", res.data.token.refresh);
    };

    googleLogin();
  };

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={onGoogleSignInSuccess}
    />
  );
};

export default WelcomePage;

// https://velog.io/@corinthionia/React-Google-OAuth-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0
