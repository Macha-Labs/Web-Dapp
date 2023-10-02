import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import {
  Avatar,
  Box,
  Divider,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { style as gStyle, style } from "@/styles/StyledConstants";
import GlobalIcons from "@/styles/GlobalIcons";

type Props = {
  width?: string;
  onClick?: any;
  slug?: any;
  cardHeight?: any;
  titleMaxw?: any;
  shadowOnHover?: any;
  showMore?: boolean;
  owner_name?: string;
  owner_image?: string;
};

const UserListCard = ({
  width,
  cardHeight,
  shadowOnHover = true,
  owner_image,
  owner_name,
}: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      height={cardHeight ? cardHeight : "auto"}
      borderRadius={gStyle.card.borderRadius.default}
      background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
      padding={style.card.padding.default}
      position="sticky"
      // marginRight={style.margin["sm"]}
      // marginLeft={style.margin["sm"]}
      marginBottom={style.margin["lg"]}
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
      <Text
        color={colorMode == "light" ? "black" : ""}
        fontSize={style.font.h5}
        m={0}
        marginTop={style.margin.xxs}
        marginBottom={style.margin.xxs}
        fontWeight={style.fontWeight.dark}
      >
        Top commenters this week
      </Text>
      <FlexColumn hrAlign="space-between" height="15rem">
        <FlexRow marginBottom="1rem" vrAlign="flex-start">
          <FlexColumn width="80%" hrAlign="center">
            <FlexRow hrAlign="flex-start">
              <Avatar
                src={owner_image ? owner_image : GlobalIcons["avatar-default"]}
                size="sm"
                marginRight="1rem"
              />
              <Text color={colorMode == "light" ? "black" : ""} m={0}>
                Kavir Kaycee
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="20%" hrAlign="center">
            <Image
              alt="addFriend"
              src={
                colorMode == "light"
                  ? GlobalIcons["brand-addFriend"]
                  : GlobalIcons["dark-addFriend"]
              }
              width="30px"
            />
          </FlexColumn>
        </FlexRow>
        <FlexRow marginBottom="5rem" vrAlign="flex-start">
          <FlexColumn width="80%" hrAlign="center">
            <FlexRow hrAlign="flex-start">
              <Avatar
                src={owner_image ? owner_image : GlobalIcons["avatar-default"]}
                size="sm"
                marginRight="1rem"
              />
              <Text color={colorMode == "light" ? "black" : ""} m={0}>
                Kavir Kaycee
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="20%" hrAlign="center">
            <Image
              alt="addFriend"
              src={
                colorMode == "light"
                  ? GlobalIcons["brand-addFriend"]
                  : GlobalIcons["dark-addFriend"]
              }
              width="30px"
            />
          </FlexColumn>
        </FlexRow>
        <FlexRow marginBottom="5rem" vrAlign="flex-start">
          <FlexColumn width="80%" hrAlign="center">
            <FlexRow hrAlign="flex-start">
              <Avatar
                src={owner_image ? owner_image : GlobalIcons["avatar-default"]}
                size="sm"
                marginRight="1rem"
              />
              <Text color={colorMode == "light" ? "black" : ""} m={0}>
                Kavir Kaycee
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="20%" hrAlign="center">
            <Image
              alt="addFriend"
              src={
                colorMode == "light"
                  ? GlobalIcons["brand-addFriend"]
                  : GlobalIcons["dark-addFriend"]
              }
              width="30px"
            />
          </FlexColumn>
        </FlexRow>
        <FlexRow marginBottom="5rem" vrAlign="flex-start">
          <FlexColumn width="80%" hrAlign="center">
            <FlexRow hrAlign="flex-start">
              <Avatar
                src={owner_image ? owner_image : GlobalIcons["avatar-default"]}
                size="sm"
                marginRight="1rem"
              />
              <Text color={colorMode == "light" ? "black" : ""} m={0}>
                Kavir Kaycee
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="20%" hrAlign="center">
            <Image
              alt="addFriend"
              src={
                colorMode == "light"
                  ? GlobalIcons["brand-addFriend"]
                  : GlobalIcons["dark-addFriend"]
              }
              width="30px"
            />
          </FlexColumn>
        </FlexRow>
        <FlexRow marginBottom="5rem" vrAlign="flex-start">
          <FlexColumn width="80%" hrAlign="center">
            <FlexRow hrAlign="flex-start">
              <Avatar
                src={owner_image ? owner_image : GlobalIcons["avatar-default"]}
                size="sm"
                marginRight="1rem"
              />
              <Text color={colorMode == "light" ? "black" : ""} m={0}>
                Kavir Kaycee
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="20%" hrAlign="center">
            <Image
              alt="addFriend"
              src={
                colorMode == "light"
                  ? GlobalIcons["brand-addFriend"]
                  : GlobalIcons["dark-addFriend"]
              }
              width="30px"
            />
          </FlexColumn>
        </FlexRow>
      </FlexColumn>
    </Box>
  );
};

export default UserListCard;
