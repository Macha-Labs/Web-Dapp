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
};

const LayoutInputs = ({
  index,
  style,
  placeholder,
  defaultValue,
  onChange = (e?: any) => {},
  disabled,
  required,
  display,
  variant,
  type,
  elementRef,
}: Props) => {
  return (
    <div className={style.class}>
      <Input
        ref={elementRef}
        key={index}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        isDisabled={disabled}
        isRequired={required}
        className="m-b-0-5"
        display={display}
        variant={variant}
        type={type}
      />
    </div>
  );
};
export default LayoutInputs;
