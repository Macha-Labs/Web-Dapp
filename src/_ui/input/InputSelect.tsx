import { Select } from "@chakra-ui/react";
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
};

const InputSelect = ({
  placeholder,
  size,
  variant,
  icon,
  options,
  margin,
  onChangeHandler = (e?: any) => {},
}: Props) => {
  return (
    <Select
      placeholder={placeholder}
      size={size}
      icon={<IconImage slug={icon.slug} size={icon.size} style={icon.style} />}
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
            value={item.value}
            style={{ background: `${style.input.bg.default}` }}
          >
            {item.value}
          </option>
        );
      })}
    </Select>
  );
};

export default InputSelect;
