import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import MusicPlayer from "@/components/studio/MusicPlayer";
import { helperIPFS, truncateAddress, truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { Avatar, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { style as gStyle, style } from "../../styles/StyledConstants";
import CardNative from "@/_ui/cards/CardNative";
import { slugToLogoMapping } from "@/data/meta";

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

const PostCard = ({
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
    <CardNative width="100%" shadowOnHover={true} onClick={onClick}>
      <FlexRow
        hrAlign="space-between"
        height="auto"
        vrAlign="flex-start"
        marginBottom="sm"
      >
        <FlexColumn
          width="70%"
          height="auto"
          vrAlign="flex-start"
          padding="0% 3%"
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
                maxW={titleMaxw ? titleMaxw : "30rem"}
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
        <FlexColumn width="30%" vrAlign="flex-end">
          <FlexRow hrAlign="flex-end">
            <TagNative
              icon={{
                align: "left",
                // slug: `${
                //   slug == "lens_post"
                //     ? "logo-Lens"
                //     : slug == "poap_nft"
                //     ? "logo-Poap"
                //     : slug == "ens_ethereum"
                //     ? "logo-Ens"
                //     : "logo-Sound.xyz"
                // }`,
                slug:`${slugToLogoMapping[slug] || "logo-Sound.xyz"}`,
              }}
              size="md"
              value={metaName}
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

          {image && (
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
          )}
        </FlexColumn>
      </FlexRow>

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

export default PostCard;
