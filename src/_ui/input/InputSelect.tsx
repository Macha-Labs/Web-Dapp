import { Select } from "@chakra-ui/react";
import IconImage from "../icons/IconImage";

type Props = {
  placeholder?: string;
  size?: string;
  variant?: string;
  icon?: any;
  style?: any;
  options: any[];
  onClick?: any;
};

const InputSelect = ({
  placeholder,
  size,
  variant,
  icon,
  options,
  onClick,
}: Props) => {
  return (
    <Select
      placeholder={placeholder}
      size={size}
      icon={<IconImage slug={icon.slug} size={icon.size} style={icon.style} />}
      variant={variant}
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
