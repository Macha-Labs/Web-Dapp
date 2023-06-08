import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import IconImage from "@/_ui/icons/IconImage";
import IconBase from "../icons/IconsBase";
import { style as gStyle } from "../../styles/StyledConstants";

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
  width?: string;
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
  width,
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
          <IconBase slug={icon.slug} size={icon.size} />
        </InputLeftElement>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? onChange : () => {}}
        size={size}
        onKeyDown={onKeydown ? onKeydown : () => {}}
        _placeholder={{ color: `#132041` }}
        width={width}
      />
    </InputGroup>
  );
};

export default InputSearch;
