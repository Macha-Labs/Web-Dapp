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
      d="M30.7529 9.24861C30.1668 8.66267 29.372 8.3335 28.5433 8.3335C27.7146 8.3335 26.9198 8.66267 26.3338 9.24861L24.9564 10.626L29.3755 15.045L30.7529 13.6677C31.3388 13.0816 31.668 12.2868 31.668 11.4581C31.668 10.6294 31.3388 9.83464 30.7529 9.24861ZM28.1124 16.3081L23.6933 11.8891L9.22899 26.3534C8.49429 27.0877 7.9542 27.9936 7.65756 28.9891L6.70518 32.1856C6.6592 32.3398 6.65577 32.5036 6.69525 32.6597C6.73474 32.8157 6.81567 32.9582 6.92948 33.072C7.04329 33.1858 7.18576 33.2667 7.3418 33.3062C7.49783 33.3457 7.66164 33.3423 7.81589 33.2963L11.0123 32.3439C12.0078 32.0473 12.9137 31.5072 13.6481 30.7725L28.1124 16.3081Z"
      fill="url(#paint0_linear_2872_43169)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2872_43169"
        x1={6.66797}
        y1={10.1309}
        x2={34.6859}
        y2={16.3249}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
