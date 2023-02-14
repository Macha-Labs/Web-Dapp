import { View, Text } from "react-native";
import React from "react";
import GlobalStyles from "../../styles/GlobalStyles";
import Svg, { Path } from "react-native-svg";

const IconEdit = () => {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.1125 3.9375L0.3375 12.7125C0.1125 12.9375 0 13.1625 0 13.5V16.875C0 17.55 0.45 18 1.125 18H4.5C4.8375 18 5.0625 17.8875 5.2875 17.6625L14.0625 8.8875L9.1125 3.9375Z"
        fill={GlobalStyles.color.primaryBlue}
      />
      <Path
        d="M17.6625 3.7125L14.2875 0.3375C13.8375 -0.1125 13.1625 -0.1125 12.7125 0.3375L10.6875 2.3625L15.6375 7.3125L17.6625 5.2875C18.1125 4.8375 18.1125 4.1625 17.6625 3.7125Z"
        fill={GlobalStyles.color.primaryBlue}
      />
    </Svg>
  );
};

export default IconEdit;
