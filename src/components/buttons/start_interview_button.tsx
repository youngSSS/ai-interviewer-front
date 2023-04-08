import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { startInterview } from "../../api/interview_service";
import { createInterviewSetting } from "../../api/interview_setting_service";
import { useInterviewSettingStore } from "../../store/interview_setting_store_context";
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

const StartInterviewButton = observer((props: { idx: number }) => {
  const {
    onInterview,
    setOnInterview,
    addMessage,
    setInterviewId,
    setCreatedAt,
    setInterviewSettings,
  } = useContext(InterviewStoreContext);
  const { token, userId } = useUserStore();
  const { interviewSettings } = useInterviewSettingStore();

  const hanldeOnClick = async () => {
    // start interview
    // setInterviewSettings([]);
    setOnInterview(true);
    const { idx } = props;
    const id = interviewSettings[idx].id;
    addMessage({
      role: "bot",
      text: "인터뷰 셋팅 정보를 바탕으로 면접을 준비중입니다. 약 1분 정도의 시간이 소요됩니다.",
    });

    const createdInterview = await startInterview(userId, String(id), token);
    if (!createdInterview) return;

    setInterviewId(createdInterview.interview_id);
    // setCreatedAt(createdInterview.chat.created_at);

    let userText = createdInterview.chat.text;
    // TODO: turn on Voice
    // if (createdInterview.chat.voice) {
    //   userText = "voice text";
    // }
    addMessage({ role: "bot", text: userText });
  };

  return (
    <Button onClick={hanldeOnClick} disabled={onInterview}>
      Start Interview
    </Button>
  );
});

export default StartInterviewButton;
