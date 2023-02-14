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
            d="m24.327 18.558 5.446-5.447a.866.866 0 0 1 1.477.612v13.13a.866.866 0 0 1-1.477.612l-5.446-5.446m-12.98 6.058H21.73a2.596 2.596 0 0 0 2.596-2.596V15.096A2.596 2.596 0 0 0 21.73 12.5H11.346a2.596 2.596 0 0 0-2.596 2.596v10.385a2.596 2.596 0 0 0 2.596 2.596Z"
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
                x1={8.75}
                y1={13.62}
                x2={32.751}
                y2={21.284}
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
