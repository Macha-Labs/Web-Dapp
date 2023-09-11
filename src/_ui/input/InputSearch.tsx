import { Input, InputGroup, InputLeftElement, useColorMode } from "@chakra-ui/react";
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
  height?: string;
  defaultValue?: string;
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
  height,
  defaultValue,
}: Props) => {

  const {colorMode} = useColorMode()

  return (
    <InputGroup
      className={style?.className}
      marginTop={marginTop ? marginTop : "0px"}
      marginBottom={marginBottom ? marginBottom : "0px"}
      marginLeft={marginLeft ? marginLeft : "2px"}
      marginRight={marginRight ? marginRight : "0px"}
      height={"50px"}
      width={width}
    >
      {icon && (
        <InputLeftElement pointerEvents="none">
          <IconBase slug={icon.slug} size={icon.size} />
        </InputLeftElement>
      )}
      <Input
        color={colorMode == "light" ? `#3d3d3d` :`#fff`}
        variant=""
        type={type}
        background={colorMode == "light" ? "#f2f5fd" : gStyle.input.bg.default}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? onChange : () => {}}
        size={size}
        onKeyDown={onKeydown ? onKeydown : () => {}}
        _placeholder={{ color: colorMode == "light" ? `#e2e2e2` :`#132041` }}
        // width={width}
        height={"50px"}
        border={colorMode == "light" ? "" : gStyle.input.border.search}
        borderRadius={gStyle.input.borderRadius.default}
      />
    </InputGroup>
  );
};

export default InputSearch;
