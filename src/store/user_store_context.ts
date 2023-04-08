import { observable, autorun, action } from "mobx";
import { createContext, useContext } from "react";
import { InterviewSetting, Interview } from "../types.ts/schems";

class UserStore {
  @observable
  userId?: string;

  token?: string;

  @observable
  selectedInterviewSetting?: InterviewSetting;

  @observable
  interviewSettings?: InterviewSetting[];

  @observable
  interviewHistory?: Interview[];

  @action
  setUserId = (userId: string) => {
    this.userId = userId;
  };

  // @action
  // selectInterviewSetting = (interviewSetting: InterviewSetting) => {
  //   this.selectedInterviewSetting = interviewSetting;
  // };

  public setToken = (token: string) => {
    this.token = token;
  };

  constructor() {
    // fetchInterviewSettings
    // fetchInterviewHistory
  }
}

export const userStore = new UserStore();
const UserStoreContext = createContext(userStore);

export const useUserStore = () => {
  const store = useContext(UserStoreContext);
  return store;
};
export default UserStoreContext;
