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
  marginLeft?: string;
  marginTop?: string;
  marginRight?: any;
  marginBottom?: string;
  onFilter?: any;
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
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
}: Props) => {
  return (
    <InputGroup
      className={style?.className}
      marginTop={marginTop ? marginTop : "0px"}
      marginBottom={marginBottom ? marginBottom : "0px"}
      marginLeft={marginLeft ? marginLeft : "0px"}
      marginRight={marginRight ? marginRight : "0px"}
    >
      {icon && (
        <InputLeftElement pointerEvents="none">
          <IconImage slug={icon.slug} size={icon.size} />
        </InputLeftElement>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
        size={size}
        onKeyDown={onKeydown ? onKeydown : () => {}}
      />
    </InputGroup>
  );
};

export default InputSearch;
