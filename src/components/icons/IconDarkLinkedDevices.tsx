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
            d="M13.75 16.875c0-1.726 1.4-3.125 3.125-3.125h6.25c1.726 0 3.125 1.4 3.125 3.125v6.25c0 1.726-1.4 3.125-3.125 3.125h-6.25a3.125 3.125 0 0 1-3.125-3.125v-6.25Z"
            fill="url(#c)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.063 24.167c0-.576.466-1.042 1.041-1.042h1.042a1.042 1.042 0 0 1 0 2.083h-1.042a1.042 1.042 0 0 1-1.041-1.041Z"
            fill="url(#d)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.813 24.167c0-.576.466-1.042 1.041-1.042h1.042a1.042 1.042 0 0 1 0 2.083h-1.042a1.042 1.042 0 0 1-1.041-1.041Z"
            fill="url(#e)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.063 20c0-.576.466-1.042 1.041-1.042h1.042a1.042 1.042 0 0 1 0 2.083h-1.042A1.042 1.042 0 0 1 9.063 20Z"
            fill="url(#f)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.813 20c0-.576.466-1.042 1.041-1.042h1.042a1.042 1.042 0 0 1 0 2.083h-1.042A1.042 1.042 0 0 1 27.813 20Z"
            fill="url(#g)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.063 15.834c0-.576.466-1.042 1.041-1.042h1.042a1.042 1.042 0 0 1 0 2.083h-1.042a1.042 1.042 0 0 1-1.041-1.041Z"
            fill="url(#h)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.813 15.834c0-.576.466-1.042 1.041-1.042h1.042a1.042 1.042 0 0 1 0 2.083h-1.042a1.042 1.042 0 0 1-1.041-1.041Z"
            fill="url(#i)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.167 9.063c.575 0 1.041.466 1.041 1.041v1.042a1.042 1.042 0 1 1-2.083 0v-1.042c0-.575.466-1.041 1.042-1.041Z"
            fill="url(#j)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.167 27.813c.575 0 1.041.466 1.041 1.041v1.042a1.042 1.042 0 1 1-2.083 0v-1.042c0-.575.466-1.041 1.042-1.041Z"
            fill="url(#k)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.999 9.063c.575 0 1.041.466 1.041 1.041v1.042a1.042 1.042 0 0 1-2.083 0v-1.042c0-.575.466-1.041 1.042-1.041Z"
            fill="url(#l)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.999 27.813c.575 0 1.041.466 1.041 1.041v1.042a1.042 1.042 0 0 1-2.083 0v-1.042c0-.575.466-1.041 1.042-1.041Z"
            fill="url(#m)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.835 9.063c.575 0 1.041.466 1.041 1.041v1.042a1.042 1.042 0 0 1-2.083 0v-1.042c0-.575.466-1.041 1.042-1.041Z"
            fill="url(#n)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.835 27.813c.575 0 1.041.466 1.041 1.041v1.042a1.042 1.042 0 0 1-2.083 0v-1.042c0-.575.466-1.041 1.042-1.041Z"
            fill="url(#o)"
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
                y1={14.649}
                x2={27.759}
                y2={17.746}
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
                x1={9.063}
                y1={23.275}
                x2={12.372}
                y2={24.372}
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
                x1={27.813}
                y1={23.275}
                x2={31.122}
                y2={24.372}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="f"
                x1={9.063}
                y1={19.108}
                x2={12.372}
                y2={20.205}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="g"
                x1={27.813}
                y1={19.108}
                x2={31.122}
                y2={20.205}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="h"
                x1={9.063}
                y1={14.942}
                x2={12.372}
                y2={16.039}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="i"
                x1={27.813}
                y1={14.942}
                x2={31.122}
                y2={16.039}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="j"
                x1={23.125}
                y1={9.287}
                x2={25.522}
                y2={9.64}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="k"
                x1={23.125}
                y1={28.037}
                x2={25.522}
                y2={28.39}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="l"
                x1={18.957}
                y1={9.287}
                x2={21.354}
                y2={9.64}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="m"
                x1={18.957}
                y1={28.037}
                x2={21.354}
                y2={28.39}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="n"
                x1={14.793}
                y1={9.287}
                x2={17.19}
                y2={9.64}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="o"
                x1={14.793}
                y1={28.037}
                x2={17.19}
                y2={28.39}
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
