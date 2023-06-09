import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import InterviewStoreContext, {
  useInterviewStore,
} from "../../store/interview_store_context";
import { fetchBotResponse } from "../../api/interview_service";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../store/user_store_context";

const MessageInputContainer = styled.div`
  height: 20%;
  padding-top: 10px;
  padding-right: 10px;
`;

const MessageInput = styled.textarea`
  height: 100%;
  width: 100%;
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
    addMessage({
      role: "bot",
      text: botResponse.bot_chat.text,
      voice: botResponse.bot_chat.voice,
    });
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
