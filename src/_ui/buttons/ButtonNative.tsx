import { Button, Text, background } from "@chakra-ui/react";

import { style as gStyle } from "../../styles/StyledConstants";
import IconBase from "../icons/IconsBase";

type Props = {
  size?: string;
  style?: any;
  onClick?: any;
  text?: string;
  isLoading?: boolean;
  loadingText?: string;
  iconLeft?: any;
  iconRight?: any;
  variant?: string;
  children?: any;
  width?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
  paddingRight?: string;
  paddingLeft?: string;
  paddingTop?: string;
  paddingBottom?: string;
  borderRadius?: string;
  textFontSize?: string;
  height?: string;
  disabled?: boolean;
  boxShadowHover?: any
  border?: any
  backgroundColorHover?: any
};

export default function ButtonNative({
  size,
  style,
  onClick,
  text,
  isLoading = false,
  loadingText = "loading...",
  iconLeft,
  iconRight,
  variant,
  children,
  width,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  borderRadius,
  textFontSize,
  height,
  disabled,
  boxShadowHover,
  border,
  backgroundColorHover
}: Props) {
  return (
    <Button
      _hover={{boxShadow: `${boxShadowHover}`, backgroundColor: `${backgroundColorHover}`,color: `#004ad9 !important`}}
      isDisabled={disabled ? disabled : false}
      size={size ? size : "md"}
      variant={variant}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
      width={width}
      marginTop={`${marginTop ? gStyle.margin[marginTop] : "0px"}`}
      marginBottom={`${marginBottom ? gStyle.margin[marginBottom] : "0px"}`}
      marginRight={`${marginRight ? gStyle.margin[marginRight] : "0px"}`}
      marginLeft={`${marginLeft ? gStyle.margin[marginLeft] : "0px"}`}
      borderRadius={`${borderRadius
        ? gStyle.button.borderRadius[borderRadius]
        : gStyle.button.borderRadius.default
        }`}
      paddingRight={`${paddingRight ? gStyle.padding[paddingRight] : "12px"}`}
      paddingLeft={`${paddingLeft ? gStyle.padding[paddingLeft] : "12px"}`}
      paddingTop={`${paddingTop ? gStyle.padding[paddingTop] : "12px"}`}
      paddingBottom={`${paddingBottom ? gStyle.padding[paddingBottom] : "12px"
        }`}
      borderColor="#14244b"
      border={border}
      height={height ? height : "3rem"}
    >
      {iconLeft && (
        <IconBase
          slug={iconLeft.slug}
          size={iconLeft.size}
          style={iconLeft.style}
        />
      )}
      {text && (
        <Text
          className="mb-0"
          fontSize={textFontSize ? gStyle.font[textFontSize] : "1rem"}
          marginRight={marginRight ? marginRight : gStyle.margin["xxs"]}
          color="inherit"
        >
          {text}
        </Text>
      )}
      {iconRight && (
        <IconBase
          slug={iconRight.slug}
          size={iconRight.size}
          style={iconRight.style}
        />
      )}
      {children}
    </Button>
  );
}
