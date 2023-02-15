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
      d="M8.33464 13.3335C7.41416 13.3335 6.66797 14.0797 6.66797 15.0002V31.6668C6.66797 34.4283 8.90654 36.6668 11.668 36.6668H28.3346C31.0961 36.6668 33.3346 34.4283 33.3346 31.6668V15.0002C33.3346 14.0797 32.5884 13.3335 31.668 13.3335H8.33464ZM15.0013 18.3335C15.9218 18.3335 16.668 19.0797 16.668 20.0002V30.0002C16.668 30.9206 15.9218 31.6668 15.0013 31.6668C14.0808 31.6668 13.3346 30.9206 13.3346 30.0002V20.0002C13.3346 19.0797 14.0808 18.3335 15.0013 18.3335ZM26.668 20.0002C26.668 19.0797 25.9218 18.3335 25.0013 18.3335C24.0808 18.3335 23.3346 19.0797 23.3346 20.0002V30.0002C23.3346 30.9206 24.0808 31.6668 25.0013 31.6668C25.9218 31.6668 26.668 30.9206 26.668 30.0002V20.0002Z"
      fill="url(#paint0_linear_2872_43170)"
    />
    <Path
      d="M6.66667 10.0002C5.74619 10.0002 5 9.25397 5 8.3335C5 7.41302 5.74619 6.66683 6.66667 6.66683H11.9512C12.6376 4.72484 14.4896 3.3335 16.6667 3.3335H23.3333C25.5104 3.3335 27.3624 4.72484 28.0488 6.66683H33.3333C34.2538 6.66683 35 7.41302 35 8.3335C35 9.25397 34.2538 10.0002 33.3333 10.0002H6.66667Z"
      fill="url(#paint1_linear_2872_43170)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2872_43170"
        x1={6.66797}
        y1={15.0111}
        x2={36.1335}
        y2={22.4557}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2872_43170"
        x1={5}
        y1={3.8128}
        x2={22.7237}
        y2={21.4449}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
