import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";

const SvgComponent = (props) => (
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
            d="M16.268 14.792h-1.475a3.125 3.125 0 0 0-3.125 3.125v4.166c0 1.726 1.4 3.125 3.125 3.125h2.083l4.878 4.269c1.348 1.178 3.456.222 3.456-1.568v-4.175l-8.942-8.942Z"
            fill="url(#c)"
        />
        <Path
            d="M25.21 20.787v-8.696c0-1.79-2.108-2.746-3.456-1.568l-3.63 3.178 7.086 7.086Z"
            fill="url(#d)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.887 9.888a1.042 1.042 0 0 1 1.473 0l18.75 18.75a1.042 1.042 0 1 1-1.473 1.473l-18.75-18.75a1.042 1.042 0 0 1 0-1.473Z"
            fill="url(#e)"
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
                x1={11.668}
                y1={11.441}
                x2={27.237}
                y2={13.773}
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
                x1={11.668}
                y1={11.441}
                x2={27.237}
                y2={13.773}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="e"
                x1={9.582}
                y1={11.081}
                x2={32.93}
                y2={16.242}
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

export default SvgComponent;
