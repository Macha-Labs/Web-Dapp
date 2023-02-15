import * as React from "react";
import Svg, {Path, Defs, LinearGradient, Stop} from "react-native-svg";

const SvgComponent = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M6.295 2.906c-2.386-1.102-4.934 1.18-4.103 3.672l1.261 3.741a1 1 0 0 0 .948.68h8.598a1 1 0 1 1 0 2H4.401a1 1 0 0 0-.948.681l-1.261 3.741c-.831 2.493 1.717 4.774 4.103 3.673l13.802-6.37c2.324-1.073 2.324-4.376 0-5.448L6.295 2.906Z"
            fill="url(#a)"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={2.031}
                y1={3.97}
                x2={24.113}
                y2={9.125}
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
