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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.874 9.583a3.125 3.125 0 0 0-3.125 3.125v1.042h-1.042a3.125 3.125 0 0 0-3.125 3.125V27.29c0 1.726 1.4 3.125 3.125 3.125h10.417c1.726 0 3.125-1.399 3.125-3.125V26.25h1.041c1.726 0 3.125-1.4 3.125-3.125V12.708c0-1.726-1.399-3.125-3.125-3.125H16.874Zm7.291 16.667h-7.291a3.125 3.125 0 0 1-3.125-3.125v-7.292h-1.042c-.575 0-1.042.466-1.042 1.042V27.29c0 .576.467 1.042 1.042 1.042h10.417c.575 0 1.041-.466 1.041-1.042V26.25Zm1.563-10.417a1.562 1.562 0 1 0 0-3.125 1.562 1.562 0 0 0 0 3.125Zm2.063 8.205c.221-.121.206-.415.036-.6-1.075-1.176-4.856-5.31-6.857-7.492a2.604 2.604 0 0 0-3.92.092l-.976 1.172a1.042 1.042 0 0 0-.242.667v5.248c0 .575.466 1.041 1.042 1.041H27.29c.181 0 .352-.046.5-.128Z"
            fill="url(#c)"
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
