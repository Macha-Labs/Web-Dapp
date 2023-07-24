import { Input } from "@chakra-ui/react";

type Props = {
  index?: number;
  style?: any;
  placeholder?: string;
  defaultValue?: string;
  onChange?: any;
  disabled?: boolean;
  required?: boolean;
  display?: string;
  variant?: string;
  type?: string;
  elementRef?: any;
  id?: any;
  value?: any;
};

const LayoutInputs = ({
  id,
  index,
  style,
  placeholder,
  defaultValue,
  onChange,
  disabled,
  required,
  display,
  variant,
  type,
  elementRef,
  value
}: Props) => {
  return (
    <div>
      <Input
        id={id}
        value={value}
        key={index}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        isDisabled={disabled}
        isRequired={required}
        // className="m-b-0-5"
        display={display}
        variant={variant}
        type={type}
        style={style}
        _placeholder={{ color: "#132041" }}
      />
    </div>
  );
};
export default LayoutInputs;
