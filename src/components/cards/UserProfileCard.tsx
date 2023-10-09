import { Avatar, Box, Text, useColorMode, useToast } from "@chakra-ui/react";
import React from "react";
import { style as gStyle, style } from "@/styles/StyledConstants";
import GlobalIcons from "@/styles/GlobalIcons";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexColumn from "@/_ui/flex/FlexColumn";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "@/_ui/tag/TagNative";
import { truncateAddress } from "@/helpers/IpfsLink";

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
  owner_address?: string;
  description?: string;
};
const UserProfileCard = ({
  width,
  cardHeight,
  shadowOnHover = true,
  owner_image,
  owner_name,
  owner_address,
  slug,
  description,
}: Props) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
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
      <FlexRow>
        <FlexColumn width="20%" vrAlign="flex-start">
          <Avatar
            src={owner_image ? owner_image : GlobalIcons["avatar-default"]}
            size="xl"
            marginRight="1rem"
          />
        </FlexColumn>
        <FlexColumn width="80%" vrAlign="flex-start">
          <Text
            color={colorMode == "light" ? "black" : ""}
            fontSize={style.font.h3}
            fontWeight={style.fontWeight.dark}
            m={0}
          >
            {slug}
            {truncateAddress(owner_address)}
          </Text>
          <FlexRow hrAlign="flex-start" vrAlign="center">
            <Text
              color={colorMode == "light" ? "#3d3d3d" : ""}
              className="m-b-0"
            >
              {truncateAddress(owner_address)}
            </Text>
            <IconBase
              slug="icon-copy"
              style={{ marginLeft: "sm" }}
              onClick={() => {
                // navigator.clipboard.writeText(data?.address);
                toast({
                  title: "Copied To Clipboard",
                  status: "success",
                  duration: 3000,
                });
              }}
            />
          </FlexRow>
        </FlexColumn>
      </FlexRow>
      <Text color={colorMode == "light" ? "black" : ""} marginTop={style.margin.sm}>{description}</Text>
      <Text
        color={colorMode == "light" ? "black" : ""}
        fontSize={style.font.h4}
        fontWeight={style.fontWeight.dark}
        marginTop={style.margin.sm}
      >
        Profiles
      </Text>
      <FlexRow hrAlign="flex-start">
        <TagNative
          icon={{
            align: "right",
            slug: "logo-Lens",
          }}
          size="md"
          value="stani.lens"
          lineHeight="2rem"
        />
        <TagNative
          icon={{
            align: "right",
            slug: "logo-Ens",
          }}
          size="md"
          value="stani.lens"
          lineHeight="2rem"
        />
        <TagNative
          icon={{
            align: "right",
            slug: "logo-Ens",
          }}
          size="md"
          value="ensofficial.end"
          lineHeight="2rem"
        />
      </FlexRow>
    </Box>
  );
};

export default UserProfileCard;
