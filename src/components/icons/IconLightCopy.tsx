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
      d="M23.3333 8.33333H10C9.07953 8.33333 8.33333 9.07953 8.33333 10V23.3333C8.33333 24.2538 9.07953 25 10 25H23.3333C24.2538 25 25 24.2538 25 23.3333V10C25 9.07953 24.2538 8.33333 23.3333 8.33333ZM10 5C7.23858 5 5 7.23858 5 10V23.3333C5 26.0948 7.23858 28.3333 10 28.3333H23.3333C26.0948 28.3333 28.3333 26.0948 28.3333 23.3333V10C28.3333 7.23858 26.0948 5 23.3333 5H10Z"
      fill="url(#paint0_linear_2872_43165)"
    />
    <Path
      d="M11.668 16.6665C11.668 13.9051 13.9065 11.6665 16.668 11.6665H30.0013C32.7627 11.6665 35.0013 13.9051 35.0013 16.6665V29.9998C35.0013 32.7613 32.7627 34.9998 30.0013 34.9998H16.668C13.9065 34.9998 11.668 32.7613 11.668 29.9998V16.6665Z"
      fill="url(#paint1_linear_2872_43165)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2872_43165"
        x1={5}
        y1={6.67756}
        x2={31.1501}
        y2={12.4587}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2872_43165"
        x1={11.668}
        y1={13.3441}
        x2={37.8181}
        y2={19.1252}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
