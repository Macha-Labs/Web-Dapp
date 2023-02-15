import * as React from "react"
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

const IconBrandPost = (props) => (
  <Svg
    width={42}
    height={43}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G filter="url(#a)">
      <Rect x={1} width={40} height={40} rx={9.874} fill="url(#b)" />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.999 30.416c5.753 0 10.416-4.663 10.416-10.416S26.752 9.583 21 9.583 10.582 14.247 10.582 20s4.664 10.416 10.417 10.416Zm0-15.625c.575 0 1.041.467 1.041 1.042v3.125h3.125a1.042 1.042 0 0 1 0 2.083H22.04v3.125a1.042 1.042 0 0 1-2.083 0v-3.125h-3.125a1.042 1.042 0 1 1 0-2.083h3.125v-3.125c0-.575.466-1.042 1.042-1.042Z"
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
        <Stop offset={0.841} stopColor="#004AD9" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default IconBrandPost;
