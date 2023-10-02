import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { Box, Divider, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { style as gStyle, style } from "@/styles/StyledConstants";
import IconImage from "@/_ui/icons/IconImage";

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
              Feature Requests
            </Text>
            <Text color={colorMode == "light" ? "black" : ""} m={0}>
              MACHA APIs
            </Text>
          </FlexColumn>
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
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
            <Text color={colorMode == "light" ? "black" : ""} m={0}>
              About
            </Text>
            <Text color={colorMode == "light" ? "black" : ""} m={0}>
              Support
            </Text>
          </FlexColumn>
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
            <Text color={colorMode == "light" ? "black" : ""} m={0}>
              Careers
            </Text>
            <Text color={colorMode == "light" ? "black" : ""} m={0}>
              Services
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
          Connect with us
        </Text>
        <FlexRow marginBottom={style.margin.xxxs} hrAlign="flex-start">
          {/* <IconImage
            slug="IconDarkDiscord.svg"
            style={{ className: "m-r-1" }}
            onClick={() => {
              const discordUrl = `https://discord.com/api/webhooks/{webhook.id}/{webhook.token}`;
              const data = {
                content: `Check out this link: ${inviteLink}`,
              };
              fetch(discordUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          /> */}
          <IconImage
            onClick={() => {
              const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                inviteLink
              )}&text=${encodeURIComponent("text")}`;
              window.open(twitterUrl, "_blank");
            }}
            slug="icon-twitter"
            style={{ className: "m-r-1" }}
          />
          {/* <IconImage
            onClick={() => {
              const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
                inviteLink
              )}&text=${encodeURIComponent("text")}`;
              window.open(telegramUrl, "_blank");
            }}
            slug="IconDarkTwitter.svg"
            style={{ className: "m-r-1" }}
          /> */}
          {/* <IconImage
            onClick={() => {
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                `${"text"} ${inviteLink}`
              )}`;
              window.open(whatsappUrl, "_blank");
            }}
            slug="IconDarkTwitter.svg"
            style={{ className: "" }}
          /> */}
        </FlexRow>
      </FlexColumn>
      <Divider />
      <FlexRow hrAlign="space-between">Privacy • Terms • © 2023 Macha</FlexRow>
    </Box>
  );
};

export default ExternalCard;
