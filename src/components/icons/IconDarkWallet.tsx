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
            d="M12.707 9.583a3.125 3.125 0 0 0-3.125 3.125v14.583c0 1.726 1.4 3.125 3.125 3.125H27.29c1.726 0 3.125-1.399 3.125-3.125V16.875c0-1.361-.87-2.518-2.083-2.947v-1.22c0-1.726-1.4-3.125-3.125-3.125h-12.5Zm0 2.083a1.042 1.042 0 0 0 0 2.084h13.542v-1.042c0-.575-.467-1.042-1.042-1.042h-12.5ZM25.207 20a2.083 2.083 0 1 0 0 4.166h2.083c.576 0 1.042-.466 1.042-1.041V21.04c0-.575-.466-1.041-1.042-1.041h-2.083Z"
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
