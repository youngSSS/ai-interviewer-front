export const millisecondsToLocalTime = (milliseconds: number): string => {
  const date = new Date(milliseconds);
  const localTime = date.toLocaleString();
  return localTime;
};
