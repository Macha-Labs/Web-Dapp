import { StyledLi } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import ButtonNative from "../buttons/ButtonNative";

type Props = {
  options: any;
  gstyle?: any;
  icon?: any;
  value?: string;
  onChange?: any;
  width?: string;
  hrAlign?: string;
};

const Tabs = ({
  options,
  gstyle,
  icon,
  value,
  onChange,
  width,
  hrAlign,
}: Props) => {
  return (
    <>
      <ul
        className="navbar-nav d-flex align-items-center flex-row mt-2 mt-md-0"
        style={{
          width: `${width ? width : "100%"}`,
          justifyContent: `${hrAlign ? hrAlign : "flex-start"}`,
        }}
      >
        {options ? (
          options?.map((option: any, idx: any) => {
            return (
              <>
                {option && (
                  <ButtonNative
                    key={idx}
                    onClick={() => onChange(option?.value)}
                    marginRight="xs"
                    variant={
                      value == option?.value
                        ? "state_brand"
                        : "state_transparent_hover"
                    }
                    height="2.2rem"
                  >
                    <Link
                      className=" d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0  "
                      href={option?.href ? option?.href : ""}
                      style={gstyle}
                    >
                      <FlexRow>
                        {icon && <IconImage slug={icon.slug} />}
                        <Text
                          fontSize={style.font.h5}
                          fontWeight={value == option?.value ? "600" : "400"}
                          // bgGradient={
                          //   value == option?.value
                          //     ? "linear(100.07deg, #197cec 100%, #004889 100%)"
                          //     : "linear(100.07deg, #fff 100%, #fff 100%)"
                          // }
                          // bgClip="text"
                          color="#fff"
                          className="m-b-0"
                        >
                          {option?.value}
                        </Text>
                      </FlexRow>
                    </Link>
                  </ButtonNative>
                )}
              </>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </>
  );
};

export default Tabs;
