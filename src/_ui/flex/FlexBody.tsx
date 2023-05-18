import { style } from "@/styles/StyledConstants";
import { Children } from "react";

type Props = {
  children: any;
  gstyle?: any;
};

const FlexBody = ({ children, gstyle }: Props) => {
  return (
    <>
      <div
        style={{
          padding: `${style.body.padding}`,
          background: `${style.input.bg.default}`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default FlexBody;
