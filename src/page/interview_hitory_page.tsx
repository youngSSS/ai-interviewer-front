import { observer } from "mobx-react-lite";
import { useInterviewSettingStore } from "../store/interview_setting_store_context";
import { Interview } from "../types.ts/schems";

const InterviewHistoryPage = observer(() => {
  const { interviews } = useInterviewSettingStore();
  console.log("history page", interviews);
  return (
    <div>
      {interviews ? (
        interviews.map((interview: Interview, idx) => (
          <div key={idx}>
            {interview.id}
            {interview.chats[0].text}
            {interview.chats[1].text}
            <button>History</button>
          </div>
        ))
      ) : (
        <div>No interview</div>
      )}
    </div>
  );
});

export default InterviewHistoryPage;
