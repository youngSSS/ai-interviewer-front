import { observer } from "mobx-react-lite";
import React from "react";
import { useState, useEffect, useContext } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
import styled from "styled-components";
import { fetchBotResponse } from "../../api/interview_service";
import InterviewStoreContext, {
  useInterviewStore,
} from "../../store/interview_store_context";
import { useUserStore } from "../../store/user_store_context";
import { playBotVoice } from "../../utils/voice";

const Recorder = styled.button`
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
  };

  const stopRecording = async () => {
    await recorder.stopRecording();
    setIsRecording(false);
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
      const botResponse = await fetchBotResponse(
        userId,
        interviewId,
        undefined,
        voiceBase64,
        token
      );

      const userMessage = botResponse["user_chat"];
      const botMessage = botResponse["bot_chat"];
      console.log(messages.at(-1));
      addMessage({ role: "user", text: userMessage.text });
      addMessage({ role: "bot", text: botMessage.text });
      playBotVoice(botResponse.bot_chat.voice);
    } else {
      startRecording();
    }
  };

  return (
    <div>
      <Recorder onClick={handleOnClick}>
        {isRecording ? "녹음 종료" : "녹음 시작"}
      </Recorder>
    </div>
  );
});

export default RecorderButton;
