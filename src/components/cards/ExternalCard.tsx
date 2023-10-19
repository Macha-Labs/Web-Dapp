import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import {
  Box,
  Divider,
  Image,
  Link,
  Text,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { style as gStyle, style } from "@/styles/StyledConstants";
import IconImage from "@/_ui/icons/IconImage";
import GlobalIcons from "@/styles/GlobalIcons";
import CardNative from "@/_ui/cards/CardNative";

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
  const BoldOnHoverText = chakra(Text, {
    baseStyle: {
      fontWeight: "normal", // Set the default font weight to normal
      transition: "font-weight 0.3s", // Add a smooth transition effect on font-weight change
      _hover: {
        fontWeight: "bold", // Set font weight to bold on hover
        textDecoration: "underline", // Underline the text on hover
      },
    },
  });
  const { colorMode } = useColorMode();
  const inviteLink =
    "`${window.location.origin}/invite/c/6415b23b3b7d7f9068994e85`";

  return (
    <CardNative width="100%">
      <FlexRow
        hrAlign="flex-start"
        vrAlign="flex-start"
        width="100%"
        marginBottom="sm"
      >
        <FlexColumn marginBottom={style.margin.xxs} vrAlign="flex-start">
          <Text
            color={colorMode == "light" ? "black" : ""}
            fontSize={style.font.h5}
            m={0}
            // marginTop={style.margin.xxs}
            marginBottom={style.margin.xxs}
            fontWeight={style.fontWeight.dark}
          >
            External links
          </Text>
          <Link href="https://macha.gitbook.io/" target="blank">
            <BoldOnHoverText color={colorMode == "light" ? "black" : ""} m={0}>
              Documentation
            </BoldOnHoverText>
          </Link>

          <Link
            href="https://mirror.xyz/0xE5717ede08ba94e516b6706A6ccBE30D6DA5d80D"
            target="blank"
          >
            <BoldOnHoverText
              color={colorMode == "light" ? "black" : ""}
              m={0}
              p={0}
            >
              Blogs
            </BoldOnHoverText>
          </Link>
        </FlexColumn>

        <FlexColumn marginBottom={style.margin.xxxs} vrAlign="flex-start">
          <Text
            color={colorMode == "light" ? "black" : ""}
            fontSize={style.font.h5}
            m={0}
            // marginTop={style.margin.xs}
            marginBottom={style.margin.xxs}
            fontWeight={style.fontWeight.dark}
          >
            Company
          </Text>
          <Link href="https://macha.ai/about" target="blank">
            <BoldOnHoverText color={colorMode == "light" ? "black" : ""} m={0}>
              About
            </BoldOnHoverText>
          </Link>

          <Link
            href="https://metaworkhq.notion.site/Macha-Hiring-ce58c7a7c36e48b79ea8f9041a72f880"
            target="blank"
          >
            <BoldOnHoverText color={colorMode == "light" ? "black" : ""} m={0}>
              Careers
            </BoldOnHoverText>
          </Link>
        </FlexColumn>
        <FlexColumn vrAlign="flex-start">
          <Text
            color={colorMode == "light" ? "black" : ""}
            fontSize={style.font.h5}
            m={0}
            // marginTop={style.margin.xs}
            marginBottom={style.margin.xxs}
            fontWeight={style.fontWeight.dark}
          >
            Connect with us
          </Text>
          <FlexRow marginBottom={style.margin.xxxs} hrAlign="flex-start">
            <Link href="https://twitter.com/Macha0x" target="blank">
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
            <Link
              href="https://www.linkedin.com/company/metaworklab/"
              target="blank"
            >
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
      </FlexRow>
      <Divider />
      <FlexRow hrAlign="flex-start" width="90%">
        <Link href="https://macha.ai/privacy/" target="blank">
          <BoldOnHoverText color={colorMode == "light" ? "black" : ""}>
            Privacy 
          </BoldOnHoverText>
        </Link>
        <Text color={colorMode == "light" ? "black" : ""} marginLeft="3px" marginRight="3px"> • </Text>
        <Link href="https://macha.ai/terms/" target="blank">
          <BoldOnHoverText color={colorMode == "light" ? "black" : ""}>
               Terms
          </BoldOnHoverText>
        </Link>
        <Text color={colorMode == "light" ? "black" : ""} marginLeft="3px" marginRight="3px"> • </Text>◊
        <Text color={colorMode == "light" ? "black" : ""}>
          © 2023 MetaWork Labs
        </Text>
      </FlexRow>
    </CardNative>
  );
};

export default ExternalCard;
