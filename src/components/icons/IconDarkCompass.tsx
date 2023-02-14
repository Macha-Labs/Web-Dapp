import {View, Text} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Svg, {G, Rect, Path, Defs, Stop} from "react-native-svg";

const IconDarkCompass = () => {
    return (
        <Svg
            width={32}
            height={32}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G opacity={0.8}>
                <Rect
                    width={32}
                    height={32}
                    rx={10}
                    fill="url(#a)"
                />
                <Rect
                    x={0.5}
                    y={0.5}
                    width={31}
                    height={31}
                    rx={9.5}
                    stroke="url(#b)"
                    strokeOpacity={0.5}
                />
            </G>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm5.286 4.56c.061-.53.059-1.114-.336-1.51h-.001c-.395-.396-.98-.396-1.51-.336l-.282.037c-1.12.16-2.775.605-4.155 1.242-.673.31-1.352.7-1.83 1.178-.479.479-.869 1.158-1.179 1.83-.637 1.381-1.082 3.036-1.242 4.156l-.019.138-.032.29c-.042.49-.006 1.008.351 1.365.392.392.98.396 1.51.336l.282-.037c1.12-.16 2.775-.605 4.155-1.242.674-.31 1.352-.701 1.83-1.178.479-.479.869-1.158 1.179-1.83.637-1.381 1.082-3.036 1.242-4.156l.037-.283Z"
                fill="url(#c)"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.238 12.762c-.908.155-2.323.55-3.4 1.047-.597.276-1.023.548-1.252.777-.23.229-.501.655-.777 1.252-.496 1.077-.892 2.492-1.047 3.4.908-.155 2.323-.55 3.4-1.047.597-.276 1.023-.548 1.252-.777.23-.229.502-.655.777-1.252.496-1.077.893-2.492 1.047-3.4Zm-2.53 2.53a1 1 0 1 0-1.415 1.415 1 1 0 0 0 1.414-1.414Z"
                fill="url(#d)"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
                fill="url(#e)"
            />
            <Defs>
                <LinearGradient
                    id="a"
                    x1={2.133}
                    y1={3.902}
                    x2={31.691}
                    y2={28.305}
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
                    x1={6.126}
                    y1={1.463}
                    x2={28.343}
                    y2={28.983}
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
                    x1={6}
                    y1={7.438}
                    x2={28.414}
                    y2={12.393}
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
                    x1={6}
                    y1={7.438}
                    x2={28.414}
                    y2={12.393}
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
                    x1={6}
                    y1={7.438}
                    x2={28.414}
                    y2={12.393}
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
};

export default IconDarkCompass;
