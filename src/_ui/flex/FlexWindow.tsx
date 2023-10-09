import { style } from "@/styles/StyledConstants";
import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";

type Props = {
  view?: string;
  children?: any;
  navElem?: any;
  bodyElem?: any;
  style?: any;
  marginTop?: any;
  leftElem?: any;
  rightElem?: any;
  navLeft?: any;
  navTop?: any;
  noPaddingTop?: boolean;
  padding?: any;
  background?: any;
  enableBackground?: boolean;
};

export const FlexWindow = ({
  view = "col",
  children,
  bodyElem,
  marginTop,
  navLeft,
  navTop,
  noPaddingTop,
  padding,
  background,
  enableBackground,
}: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      className="window"
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background: `${
          colorMode == "light" ? "#f2f5fd" : style.body.bg.default
        }`,
      }}
    >
      {view == "col" && (
        <Box
          backgroundImage={
            enableBackground
              ? colorMode == "light"
                ? "url(/assets/explore/searchbg_light.svg)"
                : "url(/assets/icons/searchbg.svg)"
              : "none"
          }
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Box
            background={!enableBackground ?
              colorMode == "light" ? "#f2f5fd" : style.body.bg.default :"none"
            }
            style={{
              position: "fixed",
              top: "0",
              zIndex: "1000",
              width: "100%",
              // background: `${
              //   colorMode == "light" ? "#f2f5fd" : style.body.bg.default
              // }`,
              display: "flex",
              justifyContent: "center",
              padding: "1% 2% 1% 3%",
            }}
          >
            {navTop}
          </Box>
          <div
            style={{
              padding: `${padding ? padding : "0% 3%"}`,
              marginTop: `${marginTop ? marginTop : style.margin["5xl"]}`,
            }}
          >
            {bodyElem}
          </div>
        </Box>
      )}

      {view == "row" && (
        <>
          <div
            className="window-left"
            style={{ height: "100vh", position: "fixed", left: "0" }}
          >
            {navLeft}
          </div>
          <div
            className="window-right"
            style={{ marginLeft: `${style.nav.widthLeft}` }}
          >
            {bodyElem}
          </div>
        </>
      )}

      {view == "both" && (
        <Box width={"100%"}>
          <Box
            width={"5%"}
            className="window-left"
            style={{ height: "100vh", position: "fixed", left: "0" }}
          >
            {navLeft}
          </Box>
          <Box width="95%" className="window-right" marginLeft={"5%"}>
            {navTop && (
              <div
                className="windowTop"
                style={{
                  position: "fixed",
                  top: "0",
                  padding: `${padding ? padding : "0% 3%"}`,
                  paddingTop: `${style.margin.xs}`,
                  zIndex: "1000",
                  width: "95%",
                  background: `${
                    colorMode == "light" ? "#f2f5fd" : style.body.bg.default
                  }`,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {navTop}
              </div>
            )}
            <div
              className="window-bottom"
              style={{
                padding: `${padding ? padding : "0% 3%"}`,
                paddingTop: `${noPaddingTop ? "0px" : style.margin["5xl"]}`,
              }}
            >
              {bodyElem}
            </div>
          </Box>
        </Box>
      )}
    </Box>
  );
};
