import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import MusicPlayer from "@/components/studio/MusicPlayer";
import { helperIPFS, truncateAddress, truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { Avatar, Divider, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { style as gStyle, style } from "../../styles/StyledConstants";
import { dataPlugins } from "@/data/dataPlugins";
import { uiStyleCard } from "../_style";

type Props = {
  title?: string;
  image?: string;
  floorPrice?: string;
  description?: string;
  owner_name?: string;
  owner_image?: string;
  owner_heading?: string;
  action_name?: string;
  action_type?: string;
  action_value?: string;
  width?: string;
  onClick?: any;
  slug?: any;
  cardHeight?: any;
  music?: any;
  titleMaxw?: any;
  musicplayer?: any;
  shadowOnHover?: any;
  showMore?: boolean;
  metaName?: any;
};

const CardPost = ({
  image,
  title,
  floorPrice,
  description,
  owner_name,
  owner_heading,
  owner_image,
  action_name,
  action_type,
  action_value,
  width,
  onClick,
  slug,
  cardHeight,
  titleMaxw,
  music,
  musicplayer,
  shadowOnHover = true,
  showMore,
  metaName,
}: Props) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewMore, setViewMore] = useState<boolean>(false);

  const playAudio = (e: any) => {
    setIsPlaying(true);
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const stopAudio = (e: any) => {
    setIsPlaying(false);
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  const handleAudioEnded = () => {
    setIsPlaying(false); // Update isPlaying to false when audio ends
  };
  const { colorMode } = useColorMode();

  return (
    <CardNative
      width={width ? width : "100%"}
      onClick={onClick}
      addStyle={uiStyleCard.search}
    >
      <FlexRow
        hrAlign="space-between"
        height="auto"
        vrAlign="flex-start"
        marginBottom="sm"
      >
        <FlexColumn
          width={image ? "70%" : "100%"}
          height="auto"
          vrAlign="flex-start"
          padding="1% 1%"
        >
          {owner_name && (
            <FlexRow
              height="fit-content"
              hrAlign="flex-start"
              marginBottom={"xs"}
            >
              <Avatar
                src={owner_image ? owner_image : GlobalIcons["avatar-default"]}
                size="sm"
              />
              <FlexColumn vrAlign="flex-start" marginLeft={"xxs"}>
                <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
                  {truncateAddress(owner_name)}
                  {/* {owner_name} */}
                </Text>
                <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
                  {owner_heading}
                </Text>
              </FlexColumn>
            </FlexRow>
          )}
          <Text
            color={colorMode == "light" ? "#282828" : ""}
            className="m-b-0"
            fontSize={"xl"}
            fontWeight={600}
            // marginTop={gStyle.margin["xxxs"]}
          >
            {title}
          </Text>
          {/* <Box width="15rem"> */}
          {description && (
            <>
              <Text
                color={colorMode == "light" ? "#282828" : ""}
                className="m-b-0"
                fontSize={"md"}
                marginTop={gStyle.margin["xxs"]}
              >
                {image
                  ? viewMore
                    ? description
                    : truncateString(description, 200)
                  : viewMore
                  ? description
                  : truncateString(description, 500)}
              </Text>

              {showMore && (
                <span>
                  <Text
                    color="blue"
                    _hover={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      if (viewMore) {
                        setViewMore(false);
                      } else {
                        setViewMore(true);
                      }
                    }}
                  >
                    {viewMore ? "View Less" : "View More"}
                  </Text>
                </span>
              )}
            </>
          )}
          {/* </Box> */}
        </FlexColumn>
       

          {image && (
             <FlexColumn width="30%" vrAlign="center" hrAlign="center">
            <div
              style={{
                height: "60%",
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: `${style.margin.sm}`,
                marginTop: `${style.margin.sm}`,
              }}
            >
              <Image
                src={helperIPFS(image)}
                alt="coverImage"
                width={"min-content"}
                objectFit={"cover"}
                borderRadius={gStyle.card.borderRadius.default}
                maxHeight="8rem"
              />
            </div>
            </FlexColumn>
          )}
       
      </FlexRow>

      {musicplayer && (
        <>
          {" "}
          <MusicPlayer
            key={musicplayer}
            audioUrl={`https://arweave.net/${musicplayer.substr(
              5,
              musicplayer.length - 5
            )}`}
          />
        </>
      )}

      {action_name && (
        <ButtonNative
          text={action_name}
          variant="state_brand"
          width="100%"
          marginTop="sm"
        />
      )}

    </CardNative>
  );
};

export default CardPost;
