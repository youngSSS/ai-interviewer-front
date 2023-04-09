import { observer } from "mobx-react-lite";
import React from "react";
import { useInterviewSettingStore } from "../store/interview_setting_store_context";
import { useInterviewStore } from "../store/interview_store_context";
import { Interview } from "../types.ts/schems";
import { millisecondsToLocalTime } from "../utils/date";

const InterviewHistoryPage = observer(() => {
  const { interviews } = useInterviewSettingStore();
  const { addMessage, setMessages } = useInterviewStore();
  console.log("history page", interviews);

  const handleRenderHistory = (interview: Interview) => {
    setMessages([]);
    const chats = interview.chats;
    chats.map((chat) => addMessage(chat));
  };

  if (interviews === undefined) {
    console.log("interviews empty");
    return;
  }
  return (
    <div>
      {interviews.length === 0 ? (
        <div>No interview</div>
      ) : (
        interviews?.map((interview: Interview, idx) => (
          <div key={idx}>
            <h5>
              {interview.title}
              {interview.createdAt &&
                millisecondsToLocalTime(interview.createdAt)}
            </h5>
            <button onClick={() => handleRenderHistory(interview)}>
              기록 보기
            </button>
          </div>
        ))
      )}
    </div>
  );
});

export default InterviewHistoryPage;
