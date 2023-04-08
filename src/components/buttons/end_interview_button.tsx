import React, { useContext } from "react";
import styled from "styled-components";
import { endInterview } from "../../api/interview_service";
import InterviewStoreContext from "../../store/interview_store_context";
import { useUserStore } from "../../store/user_store_context";

const Button = styled.button`
  background-color: #2979ff;
  position: fixed;
  bottom: 150px;
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

const EndInterviewButton = () => {
  const { interviewId, addMessage, setOnInterview } = useContext(
    InterviewStoreContext
  );
  const { token, userId } = useUserStore();

  const hanldeOnClick = async () => {
    setOnInterview(false);
    const finalMessage = await endInterview(userId, interviewId, token);

    let botText = finalMessage.chat.text;
    // if (finalMessage.chat.voice) {
    //   botText = "voice text";
    // }
    addMessage({ role: "bot", text: botText });
  };
  return <Button onClick={hanldeOnClick}>End Interview</Button>;
};

export default EndInterviewButton;
