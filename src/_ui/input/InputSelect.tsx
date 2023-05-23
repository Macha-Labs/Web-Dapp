import { Select, Text } from "@chakra-ui/react";
import IconImage from "../icons/IconImage";
import { style } from "@/styles/StyledConstants";

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
}: Props) => {
  console.log("Inputoptions", options);
  return (
    <Select
      ref={elementRef}
      placeholder={placeholder}
      size={size}
      width={width ? width : "100%"}
      icon={
        <IconImage
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
      {options.map((item, index) => {
        return (
          <option
            key={index}
            value={item}
            style={{ background: `${style.input.bg.default}` }}
          >
            <Text>{item}</Text>
          </option>
        );
      })}
    </Select>
  );
};

export default InputSelect;
