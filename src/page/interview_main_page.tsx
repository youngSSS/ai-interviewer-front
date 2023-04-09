import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import InterviewStoreContext from "../store/interview_store_context";
import UserMessageInput from "../components/input/user_message_input";
import { observer } from "mobx-react-lite";
import RecorderButton from "../components/buttons/recorder_button";
import UserStoreContext from "../store/user_store_context";
import EndInterviewButton from "../components/buttons/end_interview_button";
import InterviewSettingsPage from "./interview_setting_page";
import InterviewHistoryPage from "./interview_hitory_page";
import StartInterviewButton from "../components/buttons/start_interview_button";
import { UserType } from "../constants";

import aiImage from "../ai_interviewer.png"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #f2f2f2;
`;

const InterviewContainer = styled.div`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 80%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  flex-grow: 1;
  position: relative;
`;

const ChatMessage = styled.div<{ role: "user" | "bot" | "admin" }>`
  display: flex;
  margin: 10px;
  flex-direction: column;
  align-items: ${({ role }) => (role === "user" ? "flex-end" : "flex-start")};
  marginx: 10px;
`;

const ChatMessageText = styled.div<{ role: "user" | "bot" | "admin" }>`
  background-color: ${({ role }) => (role === "user" ? "#2979ff" : "#ddd")};
  color: ${({ role }) => (role === "user" ? "white" : "black")};
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  max-width: 70%;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
`;

const TopPanel = styled.div`
  flex-basis: 50%;
  flex-direction: row;
  width: 100%;
  height: 20%;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px 0 0;
`;

const BottomPanel = styled.div`
  flex-basis: 50%;
  flex-direction: row;
  width: 100%;
  height: 20%;
  padding: 10px;
  border-radius: 10px;
`;

const PanelTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 45px;
  margin: 20px 0;
`;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const InterviewMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
`

const InterviewPage = observer(() => {
  const { messages, onInterview } = useContext(InterviewStoreContext);
  const { userType, setToken, setUserId, setUserType } =
    useContext(UserStoreContext);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(
      window.location.hash.split("?")[1]
    );
    console.log(searchParams);
    const token = searchParams.get("token") as string;
    const userId = searchParams.get("userId") as string;
    const userType = searchParams.get("userType") as string;
    setToken(token);
    setUserId(userId);
    setUserType(userType);
  }, []);

  return (
    <Container>
      <PanelContainer>
        <Panel>
          <PanelTitle>
            <img src={aiImage} alt={'aiImage'} width={45} ></img>
            AInterviewer
          </PanelTitle>
          <TopPanel>
            <InterviewSettingsPage />
          </TopPanel>
          <BottomPanel>
            <InterviewHistoryPage />
          </BottomPanel>
        </Panel>
        <InterviewMain>
          <InterviewContainer ref={scrollableContainerRef}>
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message?.role}>
                <ChatMessageText role={message?.role}>
                  {message?.text}
                </ChatMessageText>
              </ChatMessage>
            ))}
            {userType === UserType.INDIVIDUAL && <RecorderButton />}
            {userType === UserType.INDIVIDUAL && onInterview && (
              <EndInterviewButton />
            )}
          </InterviewContainer>
          {userType === UserType.INDIVIDUAL && <UserMessageInput />}
        </InterviewMain>
      </PanelContainer>
    </Container>
  );
});

export default InterviewPage;
