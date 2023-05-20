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
};

const TagNative = ({
  size,
  variant,
  value,
  icon,
  close = false,
  margin = "0px",
}: Props) => {
  return (
    <Tag
      size={size}
      key={size ? size : "md"}
      // variant={variant ? variant : "solid"}
      bgGradient={variant == "gray" ? "gray" : style.dropdown.bg.active}
      margin={margin}
    >
      {icon && icon.align == "left" && (
        <TagLeftIcon boxSize="12px" as={AddIcon} />
      )}
      <TagLabel>{value}</TagLabel>
      {icon && icon.align == "right" && (
        <TagRightIcon boxSize="12px" as={AddIcon} />
      )}
      {close && <TagCloseButton />}
    </Tag>
  );
};

export default TagNative;
