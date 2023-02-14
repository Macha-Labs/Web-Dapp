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
            d="M14.793 14.791v1.042a3.125 3.125 0 0 0-3.125 3.125v8.333c0 1.726 1.4 3.125 3.125 3.125H25.21c1.726 0 3.125-1.399 3.125-3.125v-8.333c0-1.726-1.4-3.125-3.125-3.125v-1.042a5.208 5.208 0 0 0-10.417 0Zm5.208-3.125a3.125 3.125 0 0 0-3.125 3.125v1.042h6.25v-1.042c0-1.726-1.399-3.125-3.125-3.125Zm2.084 10.417c0 .771-.42 1.444-1.042 1.805v1.32a1.042 1.042 0 0 1-2.083 0v-1.32A2.082 2.082 0 0 1 20 20c1.15 0 2.084.932 2.084 2.083Z"
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
                x1={11.668}
                y1={11.081}
                x2={30.665}
                y2={14.441}
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
