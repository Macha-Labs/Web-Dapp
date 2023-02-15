import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";

const IconDarkCopy = (props) => (
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
            d="M22.083 12.708H13.75c-.575 0-1.042.467-1.042 1.042v8.333c0 .576.467 1.042 1.042 1.042h8.333c.576 0 1.042-.466 1.042-1.042V13.75c0-.575-.466-1.042-1.042-1.042Zm-8.333-2.083a3.125 3.125 0 0 0-3.125 3.125v8.333c0 1.726 1.4 3.125 3.125 3.125h8.333c1.726 0 3.125-1.399 3.125-3.125V13.75c0-1.726-1.399-3.125-3.125-3.125H13.75Z"
            fill="url(#c)"
        />
        <Path
            d="M14.793 17.917c0-1.726 1.4-3.125 3.125-3.125h8.333c1.726 0 3.125 1.399 3.125 3.125v8.333c0 1.726-1.399 3.125-3.125 3.125h-8.333a3.125 3.125 0 0 1-3.125-3.125v-8.333Z"
            fill="url(#d)"
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
                y1={11.674}
                x2={26.969}
                y2={15.287}
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
                x1={14.793}
                y1={15.84}
                x2={31.137}
                y2={19.453}
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

export default IconDarkCopy;
