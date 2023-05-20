import { Button, Text } from "@chakra-ui/react";
import React from "react";
import IconImage from "../icons/IconImage";

type Props = {
  size?: string;
  style?: any;
  onClick?: any;
  text?: string;
  isLoading?: boolean;
  loadingText?: string;
  icon?: any;
  variant?: string;
  children?: any;
  width?: string;
  marginTop?: string;
  marginBottom?: string;
};

export default function ButtonNative({
  size = "md",
  style,
  onClick,
  text,
  isLoading = false,
  loadingText = "loading...",
  icon,
  variant,
  children,
  width,
  marginTop,
  marginBottom,
}: Props) {
  return (
    <Button
      size={size}
      variant={variant}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
      width={width}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {icon && (
        <IconImage slug={icon.slug} size={icon.size} style={icon.style} />
      )}
      {text && <Text className="mb-0">{text}</Text>}
      {children}
    </Button>
  );
}
