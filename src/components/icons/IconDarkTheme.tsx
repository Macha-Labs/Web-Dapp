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
            d="M14.309 9.844h11.382a1.338 1.338 0 0 1 1.34 1.34l-.241 7.77H13.116l-.147-7.77c-.013-.742.598-1.34 1.34-1.34Z"
            fill="url(#c)"
            stroke="url(#d)"
            strokeWidth={0.438}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M26.791 18.953v2.413c.09.981-1.11.97-1.89.974-2.86.014-3.454 1.337-3.368 2.755.08 1.34.102 1.51.12 2.265.045 1.817-.83 2.796-1.698 2.796-.869 0-1.743-.979-1.699-2.796.018-.755.04-.925.12-2.265.086-1.418-.507-2.74-3.369-2.755-.778-.005-1.979.007-1.889-.974v-2.413"
            stroke="url(#e)"
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
                x1={12.969}
                y1={10.499}
                x2={27.775}
                y2={15.552}
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
                x1={12.969}
                y1={10.499}
                x2={27.775}
                y2={15.552}
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
                x1={13.113}
                y1={19.759}
                x2={28.105}
                y2={23.806}
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
