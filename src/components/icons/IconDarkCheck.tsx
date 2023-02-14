import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";

const IconDarkCheck = (props) => (
    <Svg
        width={40}
        height={40}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G opacity={0.8}>
            <Rect
                width={40}
                height={40}
                rx={10}
                fill="url(#a)"
            />
            <Rect
                x={0.5}
                y={0.5}
                width={39}
                height={39}
                rx={9.5}
                stroke="url(#b)"
                strokeOpacity={0.5}
            />
        </G>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.621 13.775c.505.5.505 1.31 0 1.81L19.51 26.575a3.913 3.913 0 0 1-5.49 0l-4.641-4.59a1.27 1.27 0 0 1 0-1.81c.505-.5 1.325-.5 1.83 0l4.64 4.59c.506.5 1.325.5 1.83 0l11.112-10.99c.505-.5 1.325-.5 1.83 0Z"
            fill="url(#c)"
            stroke="url(#d)"
            strokeWidth={0.438}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={2.667}
                y1={4.878}
                x2={39.614}
                y2={35.381}
                gradientUnits="userSpaceOnUse"
            >
                <Stop
                    stopColor="#0D2147"
                    stopOpacity={0.66}
                />
                <Stop
                    offset={1}
                    stopColor="#0B2049"
                    stopOpacity={0.15}
                />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={7.657}
                y1={1.829}
                x2={35.429}
                y2={36.229}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#353C54" />
                <Stop
                    offset={1}
                    stopColor="#071F4E"
                    stopOpacity={0.76}
                />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={9}
                y1={14.428}
                x2={32.179}
                y2={22.312}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={9}
                y1={14.428}
                x2={32.179}
                y2={22.312}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default IconDarkCheck;
