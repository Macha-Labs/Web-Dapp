import { style } from "@/styles/StyledConstants";
import { Textarea, useColorMode } from "@chakra-ui/react";

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
  value?: any;
  elementRef?: any;
  id?: any;
};

const LayoutTextArea = ({
  index,
  id,
  placeholder,
  defaultValue,
  onChange,
  disabled,
  required,
  display,
  variant,
  elementRef,
  value,
}: Props) => {
  const {colorMode} = useColorMode()
  return (
    <div>
      <Textarea
        background={colorMode == "light" ? "#fff" : style.input.bg.default}
        id={id}
        // ref={elementRef}
        value={value}
        key={index}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
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
