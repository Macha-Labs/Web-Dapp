import { style } from "@/styles/StyledConstants";
import { useColorMode } from "@chakra-ui/react";

type Props = {
  header?: any;
  children: any;
  gstyle?: any;
};

const FlexBody = ({ header, children, gstyle }: Props) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <div
        style={{
          background: `${colorMode == "light" ? "#f2f5fd" : style.body.bg.default}`,
        }}
      >
        {header}
        <div
          style={{
            padding: `${style.body.padding}`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default FlexBody;
