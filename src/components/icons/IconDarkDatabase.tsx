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
            d="M11.448 23.464c-.356-.196-.823.05-.823.456v1.288c0 2.367 4.115 4.167 9.375 4.167s9.375-1.8 9.375-4.167V23.92c0-.406-.467-.652-.823-.456a9.996 9.996 0 0 1-.63.317c-1.903.875-4.564 1.427-7.922 1.427-3.358 0-6.019-.552-7.922-1.427a9.996 9.996 0 0 1-.63-.317Z"
            fill="url(#c)"
        />
        <Path
            d="M29.375 13.84c0 1.774-4.197 3.035-9.375 3.035s-9.375-1.26-9.375-3.036c0-1.775 4.197-3.214 9.375-3.214s9.375 1.44 9.375 3.214Z"
            fill="url(#d)"
        />
        <Path
            d="M20 18.958c2.73 0 5.299-.329 7.258-.95.454-.143.904-.311 1.33-.509.354-.164.787.083.787.474v1.506c0 1.563-3.073 3.646-9.375 3.646s-9.375-2.084-9.375-3.646v-1.506c0-.391.433-.638.787-.474.426.198.876.366 1.33.51 1.96.62 4.528.95 7.258.95Z"
            fill="url(#e)"
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
                x1={10.625}
                y1={23.411}
                x2={26.189}
                y2={33.451}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={10.625}
                y1={11.074}
                x2={25.932}
                y2={21.227}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#197CEC" />
                <Stop
                    offset={0.609}
                    stopColor="#004AD9"
                />
            </LinearGradient>
            <LinearGradient
                id="e"
                x1={10.625}
                y1={17.515}
                x2={25.616}
                y2={27.795}
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
