import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = (props) => (
    <Svg
        width={42}
        height={43}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G filter="url(#a)">
            <Rect
                x={1}
                width={40}
                height={40}
                rx={9.874}
                fill="url(#b)"
            />
        </G>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.75 11.667c-.575 0-1.042.466-1.042 1.042v14.583c0 .575.467 1.041 1.042 1.041h12.5c.575 0 1.042-.466 1.042-1.041V20a1.042 1.042 0 1 1 2.083 0v7.292c0 1.726-1.4 3.125-3.125 3.125h-12.5a3.125 3.125 0 0 1-3.125-3.125V12.708c0-1.725 1.4-3.124 3.125-3.124H21a1.042 1.042 0 0 1 0 2.083h-6.25Z"
            fill="#fff"
        />
        <Path
            d="M28.81 11.425a2.604 2.604 0 0 0-3.683 0l-.737.736a.52.52 0 0 0 0 .737l3.683 3.683a.52.52 0 0 0 .737 0l.736-.737a2.604 2.604 0 0 0 0-3.683l-.736-.736ZM22.917 14.371a.52.52 0 0 0-.736 0L16.9 19.65c-.159.16-.262.366-.294.59l-.49 3.437a1.042 1.042 0 0 0 1.178 1.178l3.437-.491c.223-.032.43-.135.59-.295l5.278-5.278a.52.52 0 0 0 0-.737l-3.683-3.683Z"
            fill="#fff"
        />
        <Defs>
            <LinearGradient
                id="b"
                x1={5.361}
                y1={-0.602}
                x2={45.962}
                y2={49.474}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.841}
                    stopColor="#004AD9"
                />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default SvgComponent;
