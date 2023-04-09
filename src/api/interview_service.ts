export const startInterview = async (
  userId?: string,
  interviewSettingId?: string,
  token?: string
) => {
  console.log(userId, interviewSettingId, token);
  if (!userId) return;
  if (!interviewSettingId) return;
  if (!token) return;

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/users/${userId}/interview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          interview_setting_id: interviewSettingId,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch {
    return "Failed to start intervew";
  }
};

export const endInterview = async (
  userId?: string,
  interviewId?: string,
  token?: string
) => {
  console.log("end", userId, interviewId, token);
  if (!token) return;
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/users/${userId}/interviews/${interviewId}/end`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch {
    return "Failed to end intervew";
  }
};

export const fetchBotResponse = async (
  userId?: string,
  interviewId?: string,
  userText?: string,
  userVoiceBase64?: string,
  token?: string
) => {
  if (!token) {
    return "token does not exist";
  }
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/users/${userId}/interviews/${interviewId}/user-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          text: userText,
          user_voice: userVoiceBase64,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch {
    return "Failed to get a bot response";
  }
};
