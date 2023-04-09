import { action, computed, observable } from "mobx";
import { createContext, useContext } from "react";
import {
  fetchInterviewSettings,
  fetchInterviewHistory,
} from "../api/interview_setting_service";
import { Interview, InterviewSetting } from "../types.ts/schems";
import { useUserStore } from "./user_store_context";

class InterviewSettingStore {
  @observable
  interviewSettings: InterviewSetting[] = [];

  @observable
  selectedIdx?: number;

  @observable
  interviews?: Interview[];

  @computed
  get interviewSettingLegnth() {
    return this.interviewSettings?.length;
  }

  fetchInterviewSettings = async () => {
    const { token } = useUserStore();
    const settings = await fetchInterviewSettings(token);
    console.log("fetched settings", settings);
    this.setInterviewSettings(settings);
  };

  fetchInterviewHistory = async (interviewSettingId: number) => {
    const { userId, token } = useUserStore();
    const interviews = await fetchInterviewHistory(
      userId,
      String(interviewSettingId),
      token
    );
    this.setInterviewHistory(interviews);
  };

  @action
  setSelectdeIdx = (idx: number) => {
    this.selectedIdx = idx;
  };

  @action
  setInterviewSettings = (interviewSettings: InterviewSetting[]) => {
    this.interviewSettings = interviewSettings;
  };

  @action
  setInterviewHistory = (interviews: Interview[]) => {
    this.interviews = interviews;
  };

  @action
  addInterviewSetting = (interviewSetting: InterviewSetting) => {
    console.log("add Interview setting!!");
    this.interviewSettings = [...this.interviewSettings, interviewSetting];
  };

  @action
  updateInterviewSetting = (
    idx: number,
    interviewSetting: InterviewSetting
  ) => {
    if (!this.interviewSettings) return;
    this.interviewSettings[idx] = interviewSetting;
  };

  @action
  deleteInterviewSetting = (idx: number) => {
    if (!this.interviewSettings) return;
    this.interviewSettings.splice(idx, 1);
  };
}

export const interviewSettingStore = new InterviewSettingStore();
const InterviewSettingStoreConext = createContext(interviewSettingStore);

export const useInterviewSettingStore = () => {
  const store = useContext(InterviewSettingStoreConext);
  return store;
};
export default InterviewSettingStoreConext;
