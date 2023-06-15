import { style } from "@/styles/StyledConstants";
import { AddIcon } from "@chakra-ui/icons";
import {
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
} from "@chakra-ui/react";

type Props = {
  size?: string;
  variant?: string;
  value?: string;
  icon?: any;
  leftElement?: any;
  rightElement?: any;
  close?: boolean;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
  marginBottom?: string;
  lineHeight?: string;
};

const TagNative = ({
  size,
  variant,
  value,
  icon,
  close = false,
  marginBottom,
  marginLeft,
  marginRight = "xxs",
  marginTop,
  lineHeight,
}: Props) => {
  return (
    <Tag
      size={size}
      key={size ? size : "md"}
      borderRadius={"2xl"}
      // variant={variant ? variant : "solid"}
      bgGradient={variant == "gray" ? "gray" : style.dropdown.bg.active}
      marginTop={marginTop}
      marginRight={style.margin[marginRight]}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
    >
      {icon && icon.align == "left" && (
        <TagLeftIcon boxSize="12px" as={AddIcon} />
      )}
      <TagLabel
        style={{ lineHeight: lineHeight ? lineHeight : "1", fontSize: "12px" }}
      >
        {value}
      </TagLabel>
      {icon && icon.align == "right" && (
        <TagRightIcon boxSize="12px" as={AddIcon} />
      )}
      {close && <TagCloseButton />}
    </Tag>
  );
};

export default TagNative;
