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
            d="M26.25 22.787v.338c0 .575-.466 1.041-1.042 1.041h-4.166v5.209a1.042 1.042 0 0 1-2.084 0v-5.209h-4.166a1.042 1.042 0 0 1-1.042-1.041v-.338c0-1.741.87-3.367 2.32-4.334l.341-.227c.29-.194.464-.519.464-.867v-1.681c0-.237-.08-.467-.228-.651l-1.627-2.034a1.042 1.042 0 0 1-.228-.65v-1.718c0-.576.466-1.042 1.041-1.042h8.334c.575 0 1.041.466 1.041 1.042v1.718c0 .236-.08.466-.228.65l-1.627 2.034a1.042 1.042 0 0 0-.228.65v1.682c0 .348.174.673.464.867l.342.227a5.208 5.208 0 0 1 2.319 4.334Z"
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
                x1={13.75}
                y1={11.081}
                x2={28.19}
                y2={12.996}
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
