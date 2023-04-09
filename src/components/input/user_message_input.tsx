import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import InterviewStoreContext, {
  useInterviewStore,
} from "../../store/interview_store_context";
import { fetchBotResponse } from "../../api/interview_service";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../store/user_store_context";
import { playBotVoice } from "../../utils/voice";

const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: end;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  height: 50px; /* updated */
  padding: 10px;
  position: absolute;
  margin-left: 900px;
  margin-bottom: 100px;
`;

const MessageInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: none;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const UserMessageInput = observer(() => {
  const { onInterview, addMessage } = useContext(InterviewStoreContext);
  const { token, userId } = useUserStore();
  const { interviewId } = useInterviewStore();
  const [inputValue, setInputValue] = useState("");

  console.log(userId, interviewId, onInterview);
  const handleUserText = async (userText: string) => {
    const botResponse = await fetchBotResponse(
      userId,
      interviewId,
      userText,
      undefined,
      token
    );
    console.log(botResponse);
    addMessage({ role: "bot", text: botResponse.bot_chat.text });
  };

  return (
    <MessageInputContainer>
      <MessageInput
        placeholder={
          onInterview ? "답변을 입력해주세요." : "인터뷰 시작을 먼저 해주세요."
        }
        onKeyDown={(event) => {
          console.log(inputValue);
          if (event.key === "Enter") {
            event.preventDefault();
            addMessage({ role: "user", text: inputValue });
            handleUserText(inputValue);
            setInputValue("");
            (event.target as HTMLTextAreaElement).value = "";
          }
        }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        disabled={!onInterview}
      />
    </MessageInputContainer>
  );
});

export default UserMessageInput;
