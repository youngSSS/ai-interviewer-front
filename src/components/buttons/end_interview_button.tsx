import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styled from "styled-components";
import { endInterview } from "../../api/interview_service";
import InterviewStoreContext from "../../store/interview_store_context";
import { useUserStore } from "../../store/user_store_context";

const Button = styled.button`
  background-color: #2979ff;
  position: fixed;
  bottom: 200px;
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

const EndInterviewButton = observer(() => {
  const { interviewId, addMessage, setOnInterview } = useContext(
    InterviewStoreContext
  );
  const { token, userId } = useUserStore();

  const hanldeOnClick = async () => {
    console.log("end start");
    setOnInterview(false);
    addMessage({
      role: "admin",
      text: "면접 결과를 분석중입니다. 약 1분 정도의 시간이 소요됩니다.",
    });
    const finalMessage = await endInterview(userId, interviewId, token);

    console.log("end ends");
    let botText = finalMessage.text;
    // if (finalMessage.chat.voice) {
    //   botText = "voice text";
    // }
    addMessage({ role: "bot", text: botText });

    console.log(botText);
  };
  return (
    <Button onClick={async () => await hanldeOnClick()}>인터뷰 종료</Button>
  );
});

export default EndInterviewButton;
