import CardNative from "@/_ui/cards/CardNative";
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
  account?: any;
  identities?: any;
};
const UserProfileCard = ({
  width,
  cardHeight,
  shadowOnHover = true,
  account,
  identities,
}: Props) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  return (
    <CardNative width="100%" shadowOnHover={true}>
      <FlexRow hrAlign="flex-start">
        <Avatar
          src={account?.image ? account?.image : GlobalIcons["avatar-default"]}
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
            {account?.name ? account?.name : truncateAddress(account?.owner)}
          </Text>
          <FlexRow hrAlign="flex-start" vrAlign="center">
            <Text
              color={colorMode == "light" ? "#3d3d3d" : ""}
              className="m-b-0"
            >
              {truncateAddress(account?.owner)}
            </Text>
            {account?.owner && (
              <IconBase
                slug="icon-copy"
                style={{ marginLeft: "sm" }}
                onClick={() => {
                  navigator.clipboard.writeText(account?.owner);
                  toast({
                    title: "Copied To Clipboard",
                    status: "success",
                    duration: 3000,
                  });
                }}
              />
            )}
          </FlexRow>
        </FlexColumn>
      </FlexRow>
      {account?.description && (
        <Text
          color={colorMode == "light" ? "black" : ""}
          marginTop={style.margin.sm}
        >
          {account?.description}
        </Text>
      )}

      {identities?.length>0 && (
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
    </CardNative>
  );
};

export default UserProfileCard;
