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
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G opacity={0.8}>
      <Rect
        width={30}
        height={30}
        rx={10}
        fill="url(#paint0_linear_2926_49998)"
      />
      <Rect
        x={0.5}
        y={0.5}
        width={29}
        height={29}
        rx={9.5}
        stroke="url(#paint1_linear_2926_49998)"
        strokeOpacity={0.5}
      />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.1875 9.53125C7.1875 8.23683 8.23683 7.1875 9.53125 7.1875H20.4688C21.7632 7.1875 22.8125 8.23683 22.8125 9.53125V20.4688C22.8125 21.7632 21.7632 22.8125 20.4688 22.8125H9.53125C8.23683 22.8125 7.1875 21.7632 7.1875 20.4688V9.53125ZM20.5337 21.2473C20.9107 21.2163 20.9043 20.7392 20.6488 20.4603L13.8821 13.0702C12.9233 12.0242 11.2622 12.0634 10.3538 13.1535L8.93108 14.8608C8.81408 15.0012 8.75 15.1782 8.75 15.361V20.4688C8.75 20.9002 9.09978 21.25 9.53125 21.25H20.4688C20.4906 21.25 20.5123 21.2491 20.5337 21.2473ZM18.9063 12.6563C19.7692 12.6563 20.4688 11.9567 20.4688 11.0938C20.4688 10.2308 19.7692 9.53125 18.9063 9.53125C18.0433 9.53125 17.3438 10.2308 17.3438 11.0938C17.3438 11.9567 18.0433 12.6563 18.9063 12.6563Z"
      fill="url(#paint2_linear_2926_49998)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2926_49998"
        x1={2}
        y1={3.65854}
        x2={29.7102}
        y2={26.5355}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#0D2147" stopOpacity={0.66} />
        <Stop offset={1} stopColor="#0B2049" stopOpacity={0.15} />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2926_49998"
        x1={5.74286}
        y1={1.37143}
        x2={26.5714}
        y2={27.1714}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#353C54" />
        <Stop offset={1} stopColor="#071F4E" stopOpacity={0.76} />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2926_49998"
        x1={7.1875}
        y1={8.31087}
        x2={24.6987}
        y2={12.1821}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#197CEC" />
        <Stop offset={0.608737} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
