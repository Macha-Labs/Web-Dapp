import { style } from "@/styles/StyledConstants";
import { Children } from "react";

type Props = {
  header?: any;
  children: any;
  gstyle?: any;
};

const FlexBody = ({ header, children, gstyle }: Props) => {
  return (
    <>
      <div
        style={{
          background: `${style.body.bg.default}`,
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
