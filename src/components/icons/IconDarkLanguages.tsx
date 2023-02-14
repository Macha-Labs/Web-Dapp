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
            d="m18.438 29.375 5.468-11.719 5.469 11.719M20 26.25h7.813M10.625 13.355a50.496 50.496 0 0 1 6.25-.386m0 0c1.167 0 2.326.04 3.473.119m-3.473-.12v-2.343m3.473 2.463c-1.206 5.514-4.838 10.12-9.723 12.643m9.723-12.644c.933.064 1.86.154 2.777.268m-4.78 8.85a18.774 18.774 0 0 1-3.987-6.045"
            stroke="url(#c)"
            strokeWidth={1.5}
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
                x1={10.625}
                y1={11.973}
                x2={31.639}
                y2={16.619}
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
