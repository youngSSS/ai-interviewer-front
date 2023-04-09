export const playBotVoice = (base64EncodedMP3: any) => {
  console.log(base64EncodedMP3);
  const decodedData = window.atob(base64EncodedMP3);

  const blob = new Blob([decodedData], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  const audio = new Audio(url);
  audio.play();
};
