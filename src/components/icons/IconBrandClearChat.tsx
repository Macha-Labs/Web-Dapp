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
            d="M13.71 15.833c-.576 0-1.042.466-1.042 1.042V27.29c0 1.726 1.4 3.125 3.125 3.125H26.21c1.726 0 3.125-1.399 3.125-3.125V16.875c0-.576-.467-1.042-1.042-1.042H13.71Zm4.166 3.125c.576 0 1.042.466 1.042 1.042v6.25a1.042 1.042 0 0 1-2.083 0V20c0-.576.466-1.042 1.041-1.042ZM25.168 20a1.042 1.042 0 0 0-2.083 0v6.25a1.042 1.042 0 0 0 2.083 0V20Z"
            fill="#fff"
        />
        <Path
            d="M12.667 13.75a1.042 1.042 0 0 1 0-2.084h3.303a3.126 3.126 0 0 1 2.947-2.083h4.166c1.361 0 2.519.87 2.948 2.083h3.302a1.042 1.042 0 0 1 0 2.084H12.667Z"
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
