import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";

const IconDarkReply = (props) => (
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
            d="M30.063 30.938a.78.78 0 0 1-.687-.391 11.867 11.867 0 0 0-10.157-5.86v4.688a.782.782 0 0 1-.484.719.781.781 0 0 1-.852-.164l-9.375-9.375a.78.78 0 0 1 0-1.11l9.375-9.375a.781.781 0 0 1 .852-.164.781.781 0 0 1 .484.719v4.774a13.43 13.43 0 0 1 11.72 13.28 12.753 12.753 0 0 1-.102 1.563.781.781 0 0 1-.618.672l-.156.023ZM18.83 23.125a13.765 13.765 0 0 1 10.547 4.688 11.961 11.961 0 0 0-11.008-10.938.781.781 0 0 1-.711-.781v-3.586L10.165 20l7.492 7.492v-3.586a.781.781 0 0 1 .781-.781h.422-.031Z"
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
                x1={8.277}
                y1={11.362}
                x2={33.492}
                y2={17.351}
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

export default IconDarkReply;
