import { observable, action } from "mobx";
import { createContext, useContext } from "react";
import { InterviewSetting, Message } from "../types.ts/schems";
import { playBotVoice } from "../utils/voice";

class InterviewStore {
  @observable
  interviewId?: string;

  @observable
  interviewSetting?: InterviewSetting;

  @observable
  onInterview: boolean = false;

  @observable
  createdAt?: string;

  @observable
  messages: Message[] = [];

  @action
  setInterviewId = (interviewId: string) => {
    this.interviewId = interviewId;
  };

  @action
  setOnInterview = (isStart: boolean) => {
    this.onInterview = isStart;
  };

  setCreatedAt = (createdAt: string) => {
    this.createdAt = createdAt;
  };

  @action
  addMessage = (message: Message) => {
    this.messages = [...this.messages, message];
    console.log("addmessage", message.text);
    if (message.role === "bot" && message.voice) {
      console.log("voice", message.voice);
      playBotVoice(message.voice);
    }
  };

  @action
  setMessages = (messages: Message[]) => {
    this.messages = messages;
  };
}

export const interviewStore = new InterviewStore();
const InterviewStoreContext = createContext(interviewStore);

export const useInterviewStore = () => {
  const store = useContext(InterviewStoreContext);
  return store;
};

export default InterviewStoreContext;
