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
            d="M15.485 13.013a1.042 1.042 0 0 0-1.473 1.473L19.526 20l-5.514 5.513a1.042 1.042 0 1 0 1.473 1.473L21 21.473l5.513 5.513a1.042 1.042 0 0 0 1.473-1.473L22.472 20l5.513-5.514a1.042 1.042 0 1 0-1.473-1.473L21 18.526l-5.514-5.513Z"
            fill="#fff"
        />
        <Defs>
            <LinearGradient
                id="b"
                x1={26}
                y1={33}
                x2={1}
                y2={-20}
                gradientUnits="userSpaceOnUse"
            >
                <Stop
                    offset={0.198}
                    stopColor="#C62424"
                />
                <Stop
                    offset={0.841}
                    stopColor="#E77A7A"
                />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default SvgComponent;
