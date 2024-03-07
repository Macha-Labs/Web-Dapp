import { style as gStyle, style } from "../../styles/StyledConstants";
import { uiColors } from "./colors";


export const uiStyleCard = {
    'default': {
        border: gStyle.card.border.default,
        padding: style?.padding['sm']
    },
    'prompt': {
        border: '0px',
        borderRadius: style?.borderRadius['sm'],
        padding: style?.padding['xxs'],
        background: `${uiColors.blueDark}`,
        boxShadow: `${"-0.15px 0.15px 2px 0px #004AD9"}`,
    },
    'search': {
        boxShadow: `${"-0.15px 0.15px 2px 0px #004AD9"}`,
        _hover: {
            background: "#030c1a"
        }
    }
}


export const uiStyleInput = {
    'default': {
        _hover:  {
            background: `.searchHeader:hover {
                background: linear-gradient(
                  141.09deg,
                  rgba(10, 19, 51, 0.5) 11.08%,
                  rgba(0, 15, 44, 0.38) 89.68%
                ) !important;
                border: 1px solid rgba(15, 23, 46, 1) !important;
                box-shadow: -7.993527412414551px 7.993527412414551px 15.987054824829102px 0px rgba(0, 0, 0, 0.2) !important;
              }`
          }
    }
}
