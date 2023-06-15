import { Select, Text } from "@chakra-ui/react";
import IconImage from "../icons/IconImage";
import { style } from "@/styles/StyledConstants";
import IconBase from "../icons/IconsBase";

type Props = {
  placeholder?: string;
  size?: string;
  variant?: string;
  icon?: any;
  style?: any;
  options: any[];
  margin?: string;
  onChangeHandler?: any;
  elementRef?: any;
  width?: any;
  childrenComponent?: any;
  defaultValue?: any;
  marginTop?: string;
};

const InputSelect = ({
  placeholder,
  size,
  variant,
  icon,
  width,
  options,
  margin,
  onChangeHandler = (e?: any) => {},
  elementRef,
  childrenComponent,
  defaultValue,
  marginTop,
}: Props) => {
  // console.log("children", children);
  return (
    <>
      <Select
        ref={elementRef}
        placeholder={placeholder}
        size={size}
        width={width ? width : "100%"}
        defaultValue={defaultValue}
        icon={
          <IconBase
            slug={icon ? icon.slug : "icon-chevron-down"}
            size={icon ? icon.size : "md"}
            style={icon ? icon.style : ""}
          />
        }
        variant={variant}
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
        style={{
          background: `${style.input.bg.default}`,
          border: `${style.input.border.default}`,
        }}
        margin={margin}
      >
        {childrenComponent ? (
          <>{childrenComponent}</>
        ) : (
          <>
            {options.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item}
                  style={{
                    background: `${style.input.bg.default}`,
                  }}
                >
                  <Text> {item}</Text>
                </option>
              );
            })}
          </>
        )}
      </Select>
    </>
  );
};

export default InputSelect;
