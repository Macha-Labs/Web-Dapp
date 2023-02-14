import * as React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={30}
    height={31}
    viewBox="0 0 30 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G opacity={0.8}>
      <Rect
        y={0.0888672}
        width={30}
        height={30}
        rx={10}
        fill="url(#paint0_linear_2907_37885)"
      />
      <Rect
        x={0.5}
        y={0.588867}
        width={29}
        height={29}
        rx={9.5}
        stroke="url(#paint1_linear_2907_37885)"
        strokeOpacity={0.5}
      />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.53125 7.27637C8.23683 7.27637 7.1875 8.3257 7.1875 9.62012V20.5576C7.1875 21.852 8.23683 22.9014 9.53125 22.9014H20.4688C21.7632 22.9014 22.8125 21.852 22.8125 20.5576V12.7451C22.8125 11.7246 22.1603 10.8565 21.25 10.5347V9.62012C21.25 8.3257 20.2007 7.27637 18.9062 7.27637H9.53125ZM9.53125 8.83887C9.09978 8.83887 8.75 9.18864 8.75 9.62012C8.75 10.0516 9.09978 10.4014 9.53125 10.4014H19.6875V9.62012C19.6875 9.18864 19.3377 8.83887 18.9062 8.83887H9.53125ZM18.9062 15.0889C18.0433 15.0889 17.3438 15.7884 17.3438 16.6514C17.3438 17.5143 18.0433 18.2139 18.9062 18.2139H20.4688C20.9002 18.2139 21.25 17.8641 21.25 17.4326V15.8701C21.25 15.4386 20.9002 15.0889 20.4688 15.0889H18.9062Z"
      fill="url(#paint2_linear_2907_37885)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2907_37885"
        x1={2}
        y1={3.7474}
        x2={29.7102}
        y2={26.6243}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#0D2147" stopOpacity={0.66} />
        <Stop offset={1} stopColor="#0B2049" stopOpacity={0.15} />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2907_37885"
        x1={5.74286}
        y1={1.4603}
        x2={26.5714}
        y2={27.2603}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#353C54" />
        <Stop offset={1} stopColor="#071F4E" stopOpacity={0.76} />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2907_37885"
        x1={7.1875}
        y1={8.39973}
        x2={24.6987}
        y2={12.271}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
