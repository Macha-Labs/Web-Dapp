import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import {
  Box,
  Divider,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { style as gStyle, style } from "@/styles/StyledConstants";
import IconImage from "@/_ui/icons/IconImage";
import GlobalIcons from "@/styles/GlobalIcons";

type Props = {
  width?: string;
  onClick?: any;
  slug?: any;
  cardHeight?: any;
  titleMaxw?: any;
  shadowOnHover?: any;
  showMore?: boolean;
};

const ExternalCard = ({ width, cardHeight, shadowOnHover = true }: Props) => {
  const { colorMode } = useColorMode();
  const inviteLink =
    "`${window.location.origin}/invite/c/6415b23b3b7d7f9068994e85`";

  return (
    <Box
      height={cardHeight ? cardHeight : "auto"}
      borderRadius={gStyle.card.borderRadius.default}
      background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
      padding={style.card.padding.default}
      position="sticky"
      // marginRight={style.margin["sm"]}
      // marginLeft={style.margin["sm"]}
      // marginBottom={style.margin["lg"]}
      width={width ? width : "100%"}
      border={
        colorMode == "light" ? "1px solid #e2e2e2" : gStyle.card.border.default
      }
      //   cursor={shadowOnHover && "pointer"}
      // flexWrap={"wrap"}
      style={{
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "all",
        transitionDuration: "600ms",
      }}
      _hover={{
        border: `${shadowOnHover && gStyle.card.border.meta}`,
        boxShadow: `${shadowOnHover && "-0.15px 0.15px 28px 0px #004AD9"}`,
      }}
    >
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start" width="100%">
        <Text
          color={colorMode == "light" ? "black" : ""}
          fontSize={style.font.h5}
          m={0}
          marginTop={style.margin.xxs}
          marginBottom={style.margin.xxs}
          fontWeight={style.fontWeight.dark}
        >
          External links
        </Text>
        <FlexRow marginBottom={style.margin.xxs} vrAlign="flex-start">
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
            <Text color={colorMode == "light" ? "black" : ""} m={0}>
              Documentation
            </Text>
          </FlexColumn>
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
            <Link href="https://mirror.xyz/0xE5717ede08ba94e516b6706A6ccBE30D6DA5d80D"></Link>
            <Text color={colorMode == "light" ? "black" : ""} m={0} p={0}>
              Blogs
            </Text>
          </FlexColumn>
        </FlexRow>
        <Text
          color={colorMode == "light" ? "black" : ""}
          fontSize={style.font.h5}
          m={0}
          marginTop={style.margin.xs}
          marginBottom={style.margin.xxs}
          fontWeight={style.fontWeight.dark}
        >
          Company
        </Text>
        <FlexRow marginBottom={style.margin.xxxs}>
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
            <Link href="https://macha.ai/about">
              <Text color={colorMode == "light" ? "black" : ""} m={0}>
                About
              </Text>
            </Link>
          </FlexColumn>
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
            <Link href="https://metaworkhq.notion.site/Macha-Hiring-ce58c7a7c36e48b79ea8f9041a72f880">
              <Text color={colorMode == "light" ? "black" : ""} m={0}>
                Careers
              </Text>
            </Link>
          </FlexColumn>
        </FlexRow>
        <Text
          color={colorMode == "light" ? "black" : ""}
          fontSize={style.font.h5}
          m={0}
          marginTop={style.margin.xs}
          marginBottom={style.margin.xxs}
          fontWeight={style.fontWeight.dark}
        >
          Connect with us
        </Text>
        <FlexRow marginBottom={style.margin.xxxs} hrAlign="flex-start">
          <Link href="https://twitter.com/Macha0x">
            <Image
              alt="twitter"
              src={
                colorMode == "light"
                  ? GlobalIcons["brand-twitter"]
                  : GlobalIcons["dark-twitter"]
              }
              width="30px"
              marginRight="1rem"
            />
          </Link>
          <Link href="https://www.linkedin.com/company/metaworklab/">
            <Image
              alt="linkedin"
              src={
                colorMode == "light"
                  ? GlobalIcons["brand-linkedin"]
                  : GlobalIcons["dark-linkedin"]
              }
              width="30px"
              marginRight="1rem"
            />
          </Link>
        </FlexRow>
      </FlexColumn>
      <Divider />
      <FlexRow hrAlign="space-between">
        <Link href="https://macha.ai/privacy/">
          <Text color={colorMode == "light" ? "black" : ""}>Privacy</Text>
        </Link>
        <Link href="https://macha.ai/terms/">
          <Text color={colorMode == "light" ? "black" : ""}>• Terms</Text>
        </Link>
        <Text color={colorMode == "light" ? "black" : ""}>
          • © 2023 MetaWork Labs
        </Text>
      </FlexRow>
    </Box>
  );
};

export default ExternalCard;
