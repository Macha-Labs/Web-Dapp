import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const IconBrandFile = (props) => (
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
            d="M14.75 9.583a3.125 3.125 0 0 0-3.125 3.125v14.583c0 1.726 1.4 3.125 3.125 3.125h12.5c1.726 0 3.125-1.399 3.125-3.125V15.565c0-.829-.33-1.624-.915-2.21l-2.857-2.857a3.125 3.125 0 0 0-2.21-.915H14.75Zm9.375 2.3v1.867c0 1.15.933 2.083 2.083 2.083h1.868a.52.52 0 0 0 .368-.89l-3.43-3.43a.52.52 0 0 0-.889.37Z"
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

export default IconBrandFile;
