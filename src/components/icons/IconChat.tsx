import { View, Text } from "react-native";
import React from "react";
import Svg, { Path, Ellipse } from "react-native-svg";

const Chat = () => {
  return (
    <Svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.1213 1.26766C6.79608 1.25422 3.70641 2.97952 1.97739 5.81531C0.24837 8.65109 0.132302 12.1836 1.67145 15.1264L1.86124 15.4963C2.01679 15.7874 2.04933 16.1285 1.95161 16.4437C1.68079 17.163 1.45443 17.8982 1.27381 18.6452C1.27381 19.0241 1.38226 19.2407 1.78894 19.2317C2.50925 19.0726 3.21862 18.8677 3.9127 18.6181C4.21164 18.5358 4.5295 18.5548 4.81643 18.6723C5.07851 18.7986 5.61171 19.1234 5.62979 19.1234C9.1121 20.9544 13.3651 20.4493 16.3199 17.8537C19.2748 15.258 20.318 11.1108 18.9421 7.42934C17.5663 3.74789 14.057 1.2965 10.1213 1.26766V1.26766Z"
        stroke="white"
        stroke-width="0.812035"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Ellipse
        opacity="0.4"
        cx="5.60421"
        cy="10.7412"
        rx="0.451865"
        ry="0.45113"
        fill="#FFFEFE"
        stroke="white"
        stroke-width="0.812035"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Ellipse
        opacity="0.4"
        cx="10.1237"
        cy="10.7412"
        rx="0.451865"
        ry="0.45113"
        fill="#FFFEFE"
        stroke="white"
        stroke-width="0.812035"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Ellipse
        opacity="0.4"
        cx="14.6394"
        cy="10.7412"
        rx="0.451864"
        ry="0.45113"
        fill="#FFFEFE"
        stroke="white"
        stroke-width="0.812035"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Chat;
