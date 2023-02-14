import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const IconBrandWallet = (props) => (
    <Svg
        width={42}
        height={43}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
            d="M13.707 9.583a3.125 3.125 0 0 0-3.125 3.125v14.583c0 1.726 1.4 3.125 3.125 3.125H28.29c1.726 0 3.125-1.399 3.125-3.125V16.875c0-1.361-.87-2.518-2.083-2.947v-1.22c0-1.726-1.4-3.125-3.125-3.125h-12.5Zm0 2.083a1.042 1.042 0 0 0 0 2.084h13.542v-1.042c0-.575-.467-1.042-1.042-1.042h-12.5ZM26.207 20a2.083 2.083 0 1 0 0 4.166h2.083c.576 0 1.042-.466 1.042-1.041V21.04c0-.575-.466-1.041-1.042-1.041h-2.083Z"
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

export default IconBrandWallet;
