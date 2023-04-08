import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import RecordRTC, {
  RecordRTCPromisesHandler,
  invokeSaveAsDialog,
} from "recordrtc";
import styled from "styled-components";
import { fetchBotText } from "../../api/interview_service";
import InterviewStoreContext, {
  useInterviewStore,
} from "../../store/interview_store_context";
import { useUserStore } from "../../store/user_store_context";

const Button = styled.button`
  background-color: #2979ff;
  position: fixed;
  bottom: 100px;
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

const useRecorderPermission = (recordingType: RecordRTC.Options["type"]) => {
  const [recorder, setRecorder] = useState<any>();

  useEffect(() => {
    const getPermissionInitializeRecorder = async () => {
      const stream = await (navigator as any).mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      const recorder = new RecordRTCPromisesHandler(stream, {
        type: recordingType,
      });
      setRecorder(recorder);
    };
    getPermissionInitializeRecorder();
  }, []);

  return recorder;
};

const blobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    if (!(blob instanceof Blob)) {
      reject(new Error("Invalid blob object"));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const RecorderButton = observer(() => {
  const [isRecording, setIsRecording] = useState(false);
  const { messages, addMessage } = useContext(InterviewStoreContext);
  const { token, userId } = useUserStore();
  const { interviewId } = useInterviewStore();
  const recorder = useRecorderPermission("audio");

  const startRecording = async () => {
    recorder.startRecording();
    setIsRecording(true);
    addMessage({
      role: "user",
      text: "현재 인터뷰어의 목소리를 녹음 중입니다. 질문에 대한 답변을 끝마치면 전송 버튼을 눌러주세요.",
    });
  };

  const stopRecording = async () => {
    await recorder.stopRecording();
    setIsRecording(false);
    addMessage({ role: "user", text: "녹음 종료." });
  };

  const handleOnClick = async () => {
    if (isRecording) {
      await stopRecording();
      const blob = await recorder.getBlob();
      if (!blob) {
        console.log("No data recorded");
        return;
      }
      const voiceBase64 = await blobToBase64(blob);
      if (!voiceBase64) {
        console.log("encoding error");
        return;
      }
      // TODO: UI improvement
      const botMessage = await fetchBotText(
        userId,
        interviewId,
        undefined,
        voiceBase64,
        token
      );
      addMessage({ role: "bot", text: botMessage.text });
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    // 1: is 초기 셋팅 bot message수
    if (messages.length <= 1) return;
    if (messages.at(-1)?.role === "bot") {
      // turn: user
      handleOnClick();
    }
  }, [messages]);

  return (
    <div>
      <Button onClick={handleOnClick}>
        {isRecording ? "Finished my answer" : "Start recorder"}
      </Button>
    </div>
  );
});

export default RecorderButton;
