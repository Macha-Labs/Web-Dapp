import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";

const IconDarkDelete = (props) => (
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
            d="M12.71 15.833c-.576 0-1.042.467-1.042 1.042v10.417c0 1.725 1.4 3.125 3.125 3.125H25.21c1.726 0 3.125-1.4 3.125-3.125V16.875c0-.575-.467-1.042-1.042-1.042H12.71Zm4.166 3.125c.576 0 1.042.467 1.042 1.042v6.25a1.042 1.042 0 0 1-2.083 0V20c0-.575.466-1.042 1.041-1.042ZM24.168 20a1.042 1.042 0 0 0-2.083 0v6.25a1.042 1.042 0 0 0 2.083 0V20Z"
            fill="url(#c)"
        />
        <Path
            d="M11.667 13.75a1.042 1.042 0 1 1 0-2.083h3.303a3.126 3.126 0 0 1 2.947-2.084h4.166c1.361 0 2.519.87 2.948 2.084h3.302a1.042 1.042 0 0 1 0 2.083H11.667Z"
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
                x1={11.668}
                y1={16.882}
                x2={30.084}
                y2={21.535}
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
                x1={10.625}
                y1={9.883}
                x2={21.702}
                y2={20.903}
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

export default IconDarkDelete;
