import * as React from "react";
import Svg, {G, Rect, Path, Defs, LinearGradient, Stop} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const IconBrandContacts = (props) => (
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
            d="M9.543 25.209v3.125c0 .575.466 1.041 1.042 1.041h14.583c.575 0 1.042-.466 1.042-1.041v-3.125a4.167 4.167 0 0 0-4.167-4.167H13.71a4.167 4.167 0 0 0-4.167 4.167ZM28.27 28.688c-.038.343.205.687.55.687h2.596c.575 0 1.041-.466 1.041-1.041v-3.125a4.167 4.167 0 0 0-4.166-4.167h-1.032c-.217 0-.335.26-.206.433a6.222 6.222 0 0 1 1.238 3.734v3.125c0 .12-.007.238-.02.354ZM22.04 14.792a4.167 4.167 0 1 1-8.333 0 4.167 4.167 0 0 1 8.333 0ZM23.418 18.899c-.34-.058-.456-.46-.27-.752.618-.97.976-2.12.976-3.355a6.22 6.22 0 0 0-.976-3.356c-.186-.29-.07-.694.27-.752a4.167 4.167 0 1 1 0 8.214Z"
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

export default IconBrandContacts;
