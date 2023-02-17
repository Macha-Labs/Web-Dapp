import { useState } from "react";

export const channelDisplayImageHelper = (channel:any) => {
  const string = channel.name;
  const [firstLetter, lastLetter] = [
    string[0],
    string.split(" ").slice(-1)[0][0],
  ];
  const [backgroundColor, setBackgroundColor] = useState(() => {
    const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6"];
    return colors[Math.floor(Math.random() * colors.length)];
  });
  return [`${firstLetter}${lastLetter}`, backgroundColor];
};
