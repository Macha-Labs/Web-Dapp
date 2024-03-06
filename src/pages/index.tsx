import SearchHeader from "@/components/search/SearchHeader";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import CardColored from "@/_ui/cards/CardColored";
import FlexRow from "@/_ui/flex/FlexRow";
import { dataPlugins, dataPluginsArr } from "@/data/dataPlugins";

const Home = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <>
            <Box height={"80%"}>
              <Heading size={"4xl"} textAlign={"left"}>Hi Saxm,</Heading>
              <Image
                // className="headerLogo"
                src={
                  colorMode == "light"
                    ? "/assets/explore/search-home-title-light.svg"
                    : "/assets/title.png"
                }
                alt="logo"
                // width={255}
                // height={93}
                // width={246}
                marginBottom={style.margin.sm}
              />
              <Box marginBottom={style.margin.xxxl}>
                <FlexRow hrAlign="flex-start" marginTop={"md"} flexWrap="wrap">
                {dataPluginsArr.map((item: any) => {
                  return (
                    <Box width={"30%"} marginBottom={style.margin.lg}>
                      <CardColored
                      heading={item.heading}
                      description={item.description}
                      image={item.image}
                      bg={item.bg}
                      borderColor={item.borderColor}
                      onCardClick={() => {
                        router.push(`/search?plugin=${item.route}`);
                      }}
                      badge={true}
                      active={item.active}
                    />
                    </Box>
                  );
                })}
              </FlexRow>
              </Box>
            </Box>
            <Box position={"fixed"} bottom={"5%"} width={"60%"}>
              <SearchHeader suggestionsActive={true} />
            </Box>
    </>
  );
};

export default Home;
