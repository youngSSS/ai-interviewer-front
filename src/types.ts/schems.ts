export type Message = {
  role: "user" | "bot";
  text: string;
};

export type InterviewSetting = {
  id: string;
  userId: string;
  title: string;
  jobTitle?: string;
  jobLevel?: string;
  companyName?: string;
  companyType?: string;
  createdAt?: number; // unix millisecond
  updatedAt?: number;
};

export type Interview = {
  id: string;
  interviewSettingId: string;
  chats: Message[];
  createdAt?: number; // unix millisecond
  endedAt?: number; // unix millisecond
};
