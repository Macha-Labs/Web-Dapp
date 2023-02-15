import * as React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGComponent = (props) => (
  <Svg
    width={42}
    height={43}
    viewBox="0 0 42 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_dii_2887_43191)">
      <Rect
        x={1}
        width={40}
        height={40}
        rx={9.87429}
        fill="url(#paint0_linear_2887_43191)"
      />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6237 9.5835C12.199 9.5835 12.6654 10.0499 12.6654 10.6252V27.2918C12.6654 27.8671 13.1317 28.3335 13.707 28.3335H30.3737C30.949 28.3335 31.4154 28.7999 31.4154 29.3752C31.4154 29.9505 30.949 30.4168 30.3737 30.4168H13.707C11.9811 30.4168 10.582 29.0177 10.582 27.2918V10.6252C10.582 10.0499 11.0484 9.5835 11.6237 9.5835Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.7917 15.8335C16.367 15.8335 16.8333 16.2999 16.8333 16.8752V25.2085C16.8333 25.7838 16.367 26.2502 15.7917 26.2502C15.2164 26.2502 14.75 25.7838 14.75 25.2085V16.8752C14.75 16.2999 15.2164 15.8335 15.7917 15.8335Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.9596 22.0835C20.5349 22.0835 21.0013 22.5499 21.0013 23.1252V25.2085C21.0013 25.7838 20.5349 26.2502 19.9596 26.2502C19.3843 26.2502 18.918 25.7838 18.918 25.2085V23.1252C18.918 22.5499 19.3843 22.0835 19.9596 22.0835Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.1237 11.6665C24.699 11.6665 25.1654 12.1329 25.1654 12.7082V25.2082C25.1654 25.7835 24.699 26.2498 24.1237 26.2498C23.5484 26.2498 23.082 25.7835 23.082 25.2082V12.7082C23.082 12.1329 23.5484 11.6665 24.1237 11.6665Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.2917 17.9165C28.867 17.9165 29.3333 18.3829 29.3333 18.9582V25.2082C29.3333 25.7835 28.867 26.2498 28.2917 26.2498C27.7164 26.2498 27.25 25.7835 27.25 25.2082V18.9582C27.25 18.3829 27.7164 17.9165 28.2917 17.9165Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2887_43191"
        x1={5.3609}
        y1={-0.601503}
        x2={45.9624}
        y2={49.4737}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.841023} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
