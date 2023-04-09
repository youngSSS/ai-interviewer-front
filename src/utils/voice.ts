export const playBotVoice = (base64EncodedMP3: any) => {
  // console.log(base64EncodedMP3);
  // const decodedData = window.atob(base64EncodedMP3);

  // const blob = new Blob([decodedData], { type: "audio/mpeg" });
  // const url = URL.createObjectURL(blob);

  // const audio = new Audio(url);
  // audio.play();

  console.log(base64EncodedMP3);
  console.log("bot voice ");
  const binaryData = window.atob(base64EncodedMP3);
  const length = binaryData.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  const audio = new Audio(url);
  audio.play();
};
