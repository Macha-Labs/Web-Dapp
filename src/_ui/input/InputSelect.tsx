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
  onClick?: any;
  margin?: string;
};

const InputSelect = ({
  placeholder,
  size,
  variant,
  icon,
  options,
  onClick,
  margin,
}: Props) => {
  return (
    <Select
      placeholder={placeholder}
      size={size}
      icon={<IconImage slug={icon.slug} size={icon.size} style={icon.style} />}
      variant={variant}
      style={{
        background: `${style.input.bg.default}`,
        border: `${style.input.border.default}`,
      }}
      margin={margin}
    >
      {options.map((item, index) => {
        return (
          <option value={item.value} onClick={onClick ? onClick : () => {}}>
            {item.value}
          </option>
        );
      })}
    </Select>
  );
};

export default InputSelect;
