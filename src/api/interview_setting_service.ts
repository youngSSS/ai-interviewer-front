import {serverAddr} from "../constants";

export const createInterviewSetting = async (
  userId?: string,
  title?: string,
  jobTitle?: string,
  jobLevel?: string,
  companyName?: string,
  companyType?: string,
  token?: string
) => {
  console.log(userId, title, token);
  if (!userId) return;
  if (!title) return;
  if (!token) return;

  try {
    const response = await fetch(
      `http://${serverAddr}/users/${userId}/interview-setting`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          user_id: userId,
          title: title,
          job_title: jobTitle,
          job_level: jobLevel,
          company_name: companyName,
          company_type: companyType,
        }),
      }
    );
    console.log(response);
    const data = await response.json();
    return data;
  } catch {
    return "Failed to create intervew setting";
  }
};

export const fetchInterviewSettings = async (
  userId?: string,
  token?: string
) => {
  if (!token) return;

  try {
    const response = await fetch(
      `http://${serverAddr}/users/${userId}/interview-settings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch {
    return "Failed to create intervew setting";
  }
};

export const fetchInterviewHistory = async (
  userId?: string,
  interview_setting_id?: string,
  token?: string
) => {
  if (!token) return;

  try {
    const response = await fetch(
      `http://${serverAddr}/users/${userId}/interview-settings/${interview_setting_id}/interviews`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch {
    return "Failed to create intervew setting";
  }
};
