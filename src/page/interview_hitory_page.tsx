import { observer } from "mobx-react-lite";
import { useInterviewSettingStore } from "../store/interview_setting_store_context";
import { useInterviewStore } from "../store/interview_store_context";
import { Interview, InterviewSetting } from "../types.ts/schems";
import { millisecondsToLocalTime } from "../utils/date";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import StartInterviewButton from "../components/buttons/start_interview_button";
import { Dialog } from "@mui/material";

const Container = styled.div``;

const Header = styled.h1`
  display: flex;
  font-size: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const InterviewContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 10px;
  min-height: max-content;
`;

const Button = styled.button`
  background-color: #2979ff;
  border-radius: 5px;
  border: none;
  color: white;
  padding: 5px 10px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #1854a5;
  }

  &:active {
    background-color: #0b2c4d;
  }
`;

const InterviewRow = styled.div`
  padding: 5px;
  display: flex;
  gap: 7px;
  flex-direction: row;
  justify-content: space-between;
`;

const InterviewRowTitle = styled.div`
  text-align: left !important;
  max-width: 150px;
`;

const SettingRowBody = styled.div`
  padding: 5px;
  display: flex;
  gap: 7px;
  max-height: 30px;
`;

const InterviewHistoryPage = observer(() => {
  const { interviews } = useInterviewSettingStore();
  const { addMessage, setMessages } = useInterviewStore();
  console.log("history page", interviews);

  const handleRenderHistory = (interview: Interview) => {
    setMessages([]);
    const chats = interview.chats;
    chats.map((chat) => addMessage(chat));
  };
  return (
    <Container>
      <Header>인터뷰 기록</Header>
      <InterviewContainer>
        {interviews?.map((interview: Interview, idx) => (
          <InterviewRow key={idx}>
            <InterviewRowTitle>{interview.title}</InterviewRowTitle>
            <SettingRowBody>
              {interview.title}
              {interview.createdAt &&
                millisecondsToLocalTime(interview.createdAt)}
              <Button onClick={() => handleRenderHistory(interview)}>
                인터뷰 기록 보기
              </Button>
              <StartInterviewButton idx={idx} />
            </SettingRowBody>
          </InterviewRow>
        ))}
      </InterviewContainer>
    </Container>
  );
});

export default InterviewHistoryPage;
