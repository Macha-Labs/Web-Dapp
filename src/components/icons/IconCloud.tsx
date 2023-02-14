import {View, Text} from "react-native";
import React from "react";
import Svg, {G, Defs, ClipPath, Path, Rect} from "react-native-svg";

const IconCloud = () => {
    return (
        <Svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G clip-path="url(#clip0_2632_16262)">
                <Path
                    d="M19.35 10.1289C19.0141 8.42658 18.0976 6.89373 16.7571 5.79211C15.4165 4.6905 13.7351 4.08847 12 4.08887C9.11 4.08887 6.6 5.72887 5.35 8.12887C3.88023 8.2877 2.52101 8.98408 1.53349 10.0842C0.545971 11.1843 -0.000171702 12.6105 4.04928e-08 14.0889C4.04928e-08 17.3989 2.69 20.0889 6 20.0889H19C21.76 20.0889 24 17.8489 24 15.0889C24 12.4489 21.95 10.3089 19.35 10.1289ZM19 18.0889H6C3.79 18.0889 2 16.2989 2 14.0889C2 11.8789 3.79 10.0889 6 10.0889H6.71C7.37 7.77887 9.48 6.08887 12 6.08887C15.04 6.08887 17.5 8.54887 17.5 11.5889V12.0889H19C20.66 12.0889 22 13.4289 22 15.0889C22 16.7489 20.66 18.0889 19 18.0889Z"
                    fill="#246BFD"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_2632_16262">
                    <Rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.0888672)"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default IconCloud;
