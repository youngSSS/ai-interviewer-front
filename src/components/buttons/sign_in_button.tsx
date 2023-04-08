import React, { useContext } from "react";
import styled from "styled-components";
import { startInterview } from "../../api/interview_service";
import InterviewStoreContext from "../../store/interview_store_context";
import { useUserStore } from "../../store/user_store_context";

const Button = styled.button`
  background-color: #2979ff;
  border-radius: 5px;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1854a5;
  }

  &:active {
    background-color: #0b2c4d;
  }
`;

const SignInButton = () => {
  const hanldeOnClick = async () => {
    console.log("clicked");
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/sign-in/?name=hyoil&email=hyoil@naver.com`
      );
      const res = await response.json();
      const token = res.headers["Authorization"];
      localStorage.setItem("Authorization", token);
      console.log(token);
    } catch {
      console.log("jwt error");
    }
  };
  return <Button onClick={hanldeOnClick}>Sign In</Button>;
};

export default SignInButton;
