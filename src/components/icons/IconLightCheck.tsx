import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.8001 11.4335C36.5519 12.1327 36.5519 13.2662 35.8001 13.9653L19.2713 29.3361C17.0159 31.4335 13.3591 31.4335 11.1037 29.3361L4.20058 22.9166C3.44877 22.2175 3.44877 21.084 4.20058 20.3848C4.95239 19.6857 6.17132 19.6857 6.92313 20.3848L13.8262 26.8043C14.5781 27.5034 15.797 27.5035 16.5488 26.8043L33.0776 11.4335C33.8294 10.7344 35.0483 10.7344 35.8001 11.4335Z"
      fill="url(#paint0_linear_2872_43168)"
      stroke="url(#paint1_linear_2872_43168)"
      strokeWidth={0.437676}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2872_43168"
        x1={3.63672}
        y1={12.3471}
        x2={37.6554}
        y2={24.6536}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2872_43168"
        x1={3.63672}
        y1={12.3471}
        x2={37.6554}
        y2={24.6536}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
