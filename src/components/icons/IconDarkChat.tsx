import {View, Text} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Svg, {G, Rect, Path, Defs, Stop} from "react-native-svg";

const IconDarkChat = () => {
    return (
        <Svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <G opacity="0.8">
                <Rect
                    width="32"
                    height="32"
                    rx="10"
                    fill="url(#paint0_linear_2724_42356)"
                />
                <Rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="9.5"
                    stroke="url(#paint1_linear_2724_42356)"
                    stroke-opacity="0.5"
                />
            </G>
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.88261 11.667C10.4035 9.17261 13.1212 7.655 16.0462 7.66682C19.5081 7.69219 22.595 9.84849 23.8052 13.0868C25.0154 16.3251 24.0978 19.9731 21.4987 22.2563C18.8995 24.5394 15.1585 24.9838 12.0953 23.3731C12.0891 23.3731 12.0136 23.3294 11.9101 23.2695C11.749 23.1763 11.5203 23.044 11.3799 22.9763C11.1275 22.873 10.8479 22.8563 10.585 22.9287C9.97442 23.1482 9.35044 23.3285 8.71684 23.4684C8.35912 23.4763 8.26373 23.2858 8.26373 22.9525C8.4226 22.2954 8.62171 21.6487 8.85993 21.016C8.94589 20.7388 8.91727 20.4387 8.78044 20.1827L8.6135 19.8573C7.25963 17.2687 7.36172 14.1615 8.88261 11.667ZM11.8336 16.8334C12.2945 16.8334 12.6682 16.4603 12.6682 16.0001C12.6682 15.5398 12.2945 15.1667 11.8336 15.1667C11.3726 15.1667 10.9989 15.5398 10.9989 16.0001C10.9989 16.4603 11.3726 16.8334 11.8336 16.8334ZM16.6429 16.0001C16.6429 16.4603 16.2691 16.8334 15.8082 16.8334C15.3472 16.8334 14.9735 16.4603 14.9735 16.0001C14.9735 15.5398 15.3472 15.1667 15.8082 15.1667C16.2691 15.1667 16.6429 15.5398 16.6429 16.0001ZM19.7828 16.8334C20.2438 16.8334 20.6175 16.4603 20.6175 16.0001C20.6175 15.5398 20.2438 15.1667 19.7828 15.1667C19.3218 15.1667 18.9481 15.5398 18.9481 16.0001C18.9481 16.4603 19.3218 16.8334 19.7828 16.8334Z"
                fill="url(#paint2_linear_2724_42356)"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_2724_42356"
                    x1="2.13333"
                    y1="3.90244"
                    x2="31.6909"
                    y2="28.3045"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop
                        stop-color="#0D2147"
                        stop-opacity="0.66"
                    />
                    <Stop
                        offset="1"
                        stop-color="#0B2049"
                        stop-opacity="0.15"
                    />
                </LinearGradient>
                <LinearGradient
                    id="paint1_linear_2724_42356"
                    x1="6.12571"
                    y1="1.46286"
                    x2="28.3429"
                    y2="28.9829"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stop-color="#353C54" />
                    <Stop
                        offset="1"
                        stop-color="#071F4E"
                        stop-opacity="0.76"
                    />
                </LinearGradient>
                <LinearGradient
                    id="paint2_linear_2724_42356"
                    x1="7.66553"
                    y1="8.865"
                    x2="26.3442"
                    y2="12.9944"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stop-color="#197CEC" />
                    <Stop
                        offset="0.608737"
                        stop-color="#004AD9"
                    />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};

export default IconDarkChat;
