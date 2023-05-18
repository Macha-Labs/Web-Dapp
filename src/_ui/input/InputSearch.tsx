import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import IconImage from "@/_ui/icons/IconImage";

type Props = {
  type?: string;
  placeholder?: string;
  value?: string;
  size?: string;
  onChange?: any;
  style?: any;
  onKeydown?: any;
  icon?: any;
};

const InputSearch = ({
  style,
  type,
  placeholder = "Search Here",
  value,
  size = "md",
  onChange,
  onKeydown,
  icon,
}: Props) => {
  return (
    <InputGroup className={style?.className}>
      {icon && (
        <InputLeftElement pointerEvents="none">
          <IconImage slug={icon.slug} size={icon.size} />
        </InputLeftElement>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? onChange : () => {}}
        size={size}
        onKeyDown={onKeydown ? onKeydown : () => {}}
      />
    </InputGroup>
  );
};

export default InputSearch;
