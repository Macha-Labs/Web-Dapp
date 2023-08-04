import { style } from "@/styles/StyledConstants";
import { Heading, Select, Text } from "@chakra-ui/react";
import IconBase from "../icons/IconsBase";
import FlexColumn from "../flex/FlexColumn";

type Props = {
  placeholder?: string;
  size?: string;
  variant?: string;
  icon?: any;
  style?: any;
  options: any[];
  margin?: string;
  onChange?: any;
  width?: any;
  childrenComponent?: any;
  defaultValue?: any;
  marginTop?: string;
  value?: any
  labelText?: any
};

const InputSelect = ({
  placeholder,
  size,
  variant,
  icon,
  width,
  options,
  margin,
  onChange,
  childrenComponent,
  defaultValue,
  marginTop,
  value,
  labelText
}: Props) => {
  // console.log("children", children);
  return (
    <FlexColumn
      width="100%"
      vrAlign="flex-start"
      height="fit-content"
      hrAlign="flex-start"
      marginTop={marginTop}
    >
      {labelText && (
        <Heading
          as="h6"
          size="sm"
          bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
          bgClip="text"
        >
          {labelText}
        </Heading>
      )}
      <Select
        value={value}
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
        onChange={onChange}
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
                  value={item?.value}
                  style={{
                    background: `${style.input.bg.default}`,
                  }}
                >
                  <Text> {item.title}</Text>
                </option>
              );
            })}
          </>
        )}
      </Select>
    </FlexColumn>
  );
};

export default InputSelect;
