import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "@/_ui/tag/TagNative";
import { truncateAddress } from "@/helpers/IpfsLink";
import GlobalIcons from "@/styles/GlobalIcons";
import { style as gStyle, style } from "@/styles/StyledConstants";
import {
  Avatar,
  Box,
  Heading,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";

type Props = {
  width?: string;
  onClick?: any;
  cardHeight?: any;
  titleMaxw?: any;
  shadowOnHover?: any;
  showMore?: boolean;
  user?: any;
  identities?: any;
};
const UserProfileCard = ({
  width,
  cardHeight,
  shadowOnHover = true,
  user,
  identities,
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
      <FlexRow hrAlign="flex-start">
        <Avatar
          src={user?.image ? user?.image : GlobalIcons["avatar-default"]}
          size="xl"
          marginRight="1rem"
        />
        <FlexColumn width="80%" vrAlign="flex-start">
          <Text
            color={colorMode == "light" ? "black" : ""}
            fontSize={style.font.h3}
            fontWeight={style.fontWeight.dark}
            m={0}
          >
            {user?.name}
          </Text>
          <FlexRow hrAlign="flex-start" vrAlign="center">
            <Text
              color={colorMode == "light" ? "#3d3d3d" : ""}
              className="m-b-0"
            >
              {truncateAddress(user?.address)}
            </Text>
            <IconBase
              slug="icon-copy"
              style={{ marginLeft: "sm" }}
              onClick={() => {
                navigator.clipboard.writeText(user?.address);
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
      {user?.description && (
        <Text
          color={colorMode == "light" ? "black" : ""}
          marginTop={style.margin.sm}
        >
          {user?.description}
        </Text>
      )}

      {identities?.length && (
        <FlexColumn vrAlign="flex-start" marginTop="sm">
          <Heading
            color={colorMode == "light" ? "black" : ""}
            fontSize={style.font.h5}
            fontWeight={style.fontWeight.dark}
            marginBottom={style.margin.sm}
          >
            Identities
          </Heading>
          <FlexRow hrAlign="flex-start">
            {identities.map((item: any, index: any) => (
              <FlexRow key={index} hrAlign="flex-start">
                <TagNative
                  key={index}
                  image={item?.meta?.data?.modified?.meta_image}
                  value={item?.meta?.data?.modified?.meta_title}
                  size="md"
                  lineHeight="2.5"
                />
              </FlexRow>
            ))}
          </FlexRow>
        </FlexColumn>
      )}
    </Box>
  );
};

export default UserProfileCard;
