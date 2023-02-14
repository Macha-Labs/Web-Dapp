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
            d="M28.293 15.313v3.124m0 0v3.125m0-3.125h3.125m-3.125 0h-3.125m-2.344-4.296a3.515 3.515 0 1 1-7.03 0 3.515 3.515 0 0 1 7.03 0ZM12.668 27.537v-.115a6.64 6.64 0 1 1 13.281 0v.113a12.831 12.831 0 0 1-6.641 1.84c-2.429 0-4.7-.672-6.64-1.84v.002Z"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
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
