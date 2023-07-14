import { Textarea } from "@chakra-ui/react";

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
  elementRef?: any;
};

const LayoutTextArea = ({
  index,
  style,
  placeholder,
  defaultValue,
  onChange = (e?: any) => {},
  disabled,
  required,
  display,
  variant,
  elementRef,
}: Props) => {
  return (
    <div>
      <Textarea
        ref={elementRef}
        key={index}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        isDisabled={disabled}
        isRequired={required}
        // className="m-b-0"
        display={display}
        variant={variant}
      />
    </div>
  );
};

export default LayoutTextArea;
