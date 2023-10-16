import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import MusicPlayer from "@/components/studio/MusicPlayer";
import { helperIPFS, truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { Avatar, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { style as gStyle, style } from "../styles/StyledConstants";

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
};

const MCard = ({
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
    <Box
      height={cardHeight ? cardHeight : "auto"}
      borderRadius={gStyle.card.borderRadius.default}
      background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
      padding={style.card.padding.default}
      // marginRight={style.margin["sm"]}
      // marginLeft={style.margin["sm"]}
      // marginBottom={style.margin["lg"]}
      width={width ? width : "auto"}
      border={
        colorMode == "light" ? "1px solid #e2e2e2" : gStyle.card.border.default
      }
      onClick={onClick}
      cursor={shadowOnHover && "pointer"}
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
      <FlexRow
        hrAlign="space-between"
        height="auto"
        vrAlign="flex-start"
        marginBottom="sm"
      >
        <TagNative
          icon={{
            align: "left",
            slug: `${
              slug == "Lens Post"
                ? "logo-Lens"
                : slug == "Poap NFT"
                ? "logo-Poap"
                : slug == "ENS Handles"
                ? "logo-Ens"
                : "logo-Sound.xyz"
            }`,
          }}
          size="md"
          value={slug}
          lineHeight="1.5rem"
        />
        {/* <AudioPlayer /> */}
        {music && (
          <>
            <audio
              ref={audioRef}
              onEnded={handleAudioEnded}
              src={`https://arweave.net/${music}`}
            ></audio>
            {isPlaying ? (
              <Image
                src={GlobalIcons["icon-pause"]}
                onClick={(e) => {
                  stopAudio(e);
                }}
                alt="icon-pause"
              />
            ) : (
              <Image
                src={GlobalIcons["icon-play"]}
                onClick={(e) => {
                  playAudio(e);
                }}
                alt="icon-play"
              />
            )}
          </>
        )}
      </FlexRow>

      {owner_name && (
        <FlexRow height="fit-content" hrAlign="flex-start" marginBottom={"xs"}>
          <Avatar src={owner_image} />
          <FlexColumn vrAlign="flex-start" marginLeft={"xxs"}>
            <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
              {owner_name}
            </Text>
            <Text color={colorMode == "light" ? "#282828" : ""} mb="0">
              {owner_heading}
            </Text>
          </FlexColumn>
        </FlexRow>
      )}

      {image && (
        <div
          style={{
            height: "60%",
            display: "flex",
            justifyContent: "center",
            marginBottom: `${style.margin.sm}`,
          }}
        >
          <Image
            src={helperIPFS(image)}
            alt="coverImage"
            width="auto"
            maxW="16rem"
            maxH="16rem"
            h="auto"
            // objectFit={"cover"}
            borderRadius={gStyle.card.borderRadius.default}
          />
        </div>
      )}

      {musicplayer && (
        <>
          {" "}
          {console.log(
            "musicplayer",
            musicplayer.substr(5, musicplayer.length - 5)
          )}
          <MusicPlayer
            key={musicplayer}
            audioUrl={`https://arweave.net/${musicplayer.substr(
              5,
              musicplayer.length - 5
            )}`}
          />
        </>
      )}

      <FlexColumn height="auto" vrAlign="flex-start" padding="0% 3%">
        <Text
          color={colorMode == "light" ? "#282828" : ""}
          className="m-b-0"
          fontSize={"xl"}
          fontWeight={600}
          marginTop={gStyle.margin["xxxs"]}
        >
          {title}
        </Text>
        {/* <Box width="15rem"> */}
        {description && (
          <>
            <Text
              color={colorMode == "light" ? "#282828" : ""}
              className="m-b-0"
              maxW={titleMaxw ? titleMaxw : "20rem"}
              fontSize={"md"}
              marginTop={gStyle.margin["xxxs"]}
            >
              {image
                ? viewMore
                  ? description
                  : truncateString(description, 110) 
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
      {action_name && (
        <ButtonNative
          text={action_name}
          variant="state_brand"
          width="100%"
          marginTop="sm"
        />
      )}
    </Box>
  );
};

export default MCard;
