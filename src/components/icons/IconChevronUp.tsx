import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.99408 12.8809C4.31951 13.2064 4.84715 13.2064 5.17259 12.8809L10 8.05351L14.8274 12.8809C15.1528 13.2064 15.6805 13.2064 16.0059 12.8809C16.3314 12.5555 16.3314 12.0279 16.0059 11.7024L11.1785 6.875C10.5276 6.22413 9.47236 6.22413 8.82149 6.875L3.99408 11.7024C3.66864 12.0278 3.66864 12.5555 3.99408 12.8809Z"
      fill="url(#paint0_linear_2926_50120)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2926_50120"
        x1={3.75}
        y1={12.6406}
        x2={16.3281}
        y2={7.48209}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
