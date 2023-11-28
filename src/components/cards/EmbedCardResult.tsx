import FlexColumn from "@/_ui/flex/FlexColumn"
import { helperIPFS, truncateAddress, truncateString } from "@/helpers"
import { style } from "@/styles/StyledConstants"
import { Box, Heading, Image, Text, useColorMode } from "@chakra-ui/react"
import MusicPlayer from "../studio/MusicPlayer"

type Props = {
    title: String,
    owner: String,
    media?: any,
    desc?: String
}

const EmbedCardResult = ({ title, owner, media, desc }: Props) => {

    const { colorMode } = useColorMode();

    return (
        <Box>
            <Box textAlign="left" border={style.card.border.card} padding={style.padding.md} borderRadius={style.card.borderRadius.default} width="30rem">
                <Heading color={colorMode == "light" ? "black" : ""} mb={0} fontSize={style.font.h4}>{title}</Heading>
                <Text mb={0} color="green.500" fontSize={style.font.h6}>{truncateAddress(owner)}</Text>
                {media?.type == "VideoMetadataV3" ? (
                    <FlexColumn height="60%" vrAlign="center" hrAlign="flex-start">
                        <div
                            style={{
                                height: "15rem",
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                marginBottom: `${style.margin.sm}`,
                            }}
                        >
                            <video
                                src={helperIPFS(media?.asset?.video?.raw?.uri)}
                                preload="auto"
                                controls={true}
                                style={{ width: "100%", height: "100%" }}
                            ></video>
                        </div>
                    </FlexColumn>
                ) : media?.type == "AudioMetadataV3" ? (
                    <>
                        <div
                            style={{
                                height: "60%",
                                display: "flex",
                                justifyContent: "center",
                                padding: "1rem",
                                background: `${colorMode == "light" ? "#efefef" : "#000A24"
                                    }`,
                                width: "100%",
                            }}
                        >
                            {/* <Image
                                src={audioCover}
                                alt="coverImage"
                                height="100%"
                                objectFit={"cover"}
                                borderRadius={style.card.borderRadius.default}
                            /> */}
                            <MusicPlayer
                                key={"musicplayer"}
                                audioUrl={helperIPFS(media?.attachments[0]?.audio?.raw?.uri)}
                                colorMode={colorMode}
                            />
                        </div>
                    </>
                ) : media?.type == "TextOnlyMetadataV3" ? (
                    <></>
                ) : (
                    <FlexColumn height="60%" vrAlign="flex-start">
                        <div
                            style={{
                                height: "15rem",
                                display: "flex",
                                justifyContent: "center",
                                padding: "1rem",
                                background: `${colorMode == "light" ? "#efefef" : "#000A24"
                                    }`,
                                width: "100%",
                            }}
                        >
                            <Image
                                src={helperIPFS(media?.asset?.image?.raw?.uri)}
                                alt="coverImage"
                                height="100%"
                                objectFit={"cover"}
                                borderRadius={style.card.borderRadius.default}
                            />
                        </div>
                    </FlexColumn>
                )}
                {media?.type !== "TextOnlyMetadataV3" && <Text color={colorMode == "light" ? "black" : ""} mb={0} >{truncateString(desc, 100)}</Text>}
            </Box>
        </Box>
    )
}
export default EmbedCardResult