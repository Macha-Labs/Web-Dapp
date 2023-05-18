import { AddIcon } from "@chakra-ui/icons";
import { Tag, TagLabel, TagLeftIcon, TagRightIcon } from "@chakra-ui/react";

type Props = {
  size?: string;
  variant?: string;
  value?: string;
  icon?: any;
  leftElement?: any;
  rightElement?: any;
};

const TagNative = ({ size, variant, value, icon }: Props) => {
  return (
    <Tag
      size={size}
      key={size ? size : "md"}
      // variant={variant ? variant : "solid"}
    >
      {icon && icon.align == "left" && (
        <TagLeftIcon boxSize="12px" as={AddIcon} />
      )}
      <TagLabel>{value}</TagLabel>
      {icon && icon.align == "right" && (
        <TagRightIcon boxSize="12px" as={AddIcon} />
      )}
    </Tag>
  );
};

export default TagNative;
