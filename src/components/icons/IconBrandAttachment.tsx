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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.7 7.614a3 3 0 0 0-4.242 0L8.8 13.271a1 1 0 1 0 1.414 1.414l5.657-5.657a1 1 0 1 1 1.414 1.415l-5.657 5.656a3 3 0 1 1-4.243-4.242L13.043 6.2a5 5 0 0 1 7.071 7.071l-5.656 5.657a7 7 0 0 1-9.9-9.9l5.657-5.656a1 1 0 1 1 1.414 1.414l-5.657 5.657a5 5 0 1 0 7.071 7.07l5.657-5.656a3 3 0 0 0 0-4.243Z"
            fill="url(#a)"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={2.508}
                y1={4.365}
                x2={23.747}
                y2={9.368}
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
