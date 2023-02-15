import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";

const IconDarkEdit = () => (
    <Svg
        width={40}
        height={40}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
            d="m11.653 29.574 5.524-1.105c.202-.04.387-.14.532-.285l6.927-6.927a1.042 1.042 0 0 0 0-1.473l-4.42-4.42a1.042 1.042 0 0 0-1.472 0l-6.927 6.928c-.146.145-.245.33-.285.532l-1.105 5.524a1.042 1.042 0 0 0 1.226 1.226Z"
            fill="url(#c)"
        />
        <Path
            d="m28.535 12.94-1.473-1.474a3.125 3.125 0 0 0-4.42 0l-1.026 1.027a1.042 1.042 0 0 0 0 1.473l4.42 4.42a1.042 1.042 0 0 0 1.473 0l1.026-1.027a3.125 3.125 0 0 0 0-4.42Z"
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
                x1={10.406}
                y1={11.92}
                x2={31.749}
                y2={16.639}
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
                x1={10.406}
                y1={11.92}
                x2={31.749}
                y2={16.639}
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

export default IconDarkEdit;
