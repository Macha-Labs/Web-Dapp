import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const IconBrandImage = (props) => (
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
            d="M10.582 12.708c0-1.726 1.4-3.125 3.125-3.125H28.29c1.726 0 3.125 1.4 3.125 3.125v14.583c0 1.726-1.399 3.125-3.125 3.125H13.707a3.125 3.125 0 0 1-3.125-3.125V12.708Zm17.795 15.621c.503-.04.494-.677.154-1.049l-9.023-9.853a3.125 3.125 0 0 0-4.704.11l-1.897 2.277a1.042 1.042 0 0 0-.242.667v6.81c0 .576.467 1.042 1.042 1.042H28.29c.03 0 .058-.001.087-.003Zm-2.17-11.454a2.083 2.083 0 1 0 0-4.167 2.083 2.083 0 0 0 0 4.167Z"
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

export default IconBrandImage;
