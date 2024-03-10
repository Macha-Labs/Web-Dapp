import FlexColumn from "@/_ui/flex/FlexColumn";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MCard from "@/components/mApp/MCard";

type Props = {
    children?: any;
  };
  

const MainDapp = ({children}: Props) => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const renderBody = () => {
    return (
      <Box overflowX="hidden">
        <FlexColumn
          hrAlign="flex-start"
          vrAlign="flex-start"
          padding="0rem 0rem"
          height="100vh"
        >
          <Box
            border={colorMode ? "" : style.card.border.default}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height="100%"
            width={"100%"}
            backgroundImage={
              colorMode == "dark"
                ? "url(/assets/icons/searchbg.svg)"
                : "url(/assets/explore/searchbg_light.svg)"
            }
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            justifyContent={"flex-start"}
          >
            <Box
              position={"fixed"}
              right={"2rem"}
              top={"1rem"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                toggleColorMode();
              }}
              width={"fit-content"}
            >
              <Image
                alt="icon"
                src={
                  colorMode == "light"
                    ? GlobalIcons["icon-dark-mode"]
                    : GlobalIcons["icon-light-mode"]
                }
                height="2rem"
                width="3rem"
                marginLeft={style.margin.xxs}
              />
            </Box>
            <div
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                height={"80%"}
                width={"50%"}
                sx={{
                  "@media screen and (max-width: 950px)": {
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                {children}
              </Box>
            </div>
          </Box>
        </FlexColumn>
      </Box>
    );
  };

  return <>{renderBody()}</>;
};

export default MainDapp;
