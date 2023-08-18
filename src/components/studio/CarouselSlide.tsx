import ButtonNative from "@/_ui/buttons/ButtonNative"
import GlobalIcons from "@/styles/GlobalIcons"
import { style } from "@/styles/StyledConstants"
import { Box, Heading, Image, Text } from "@chakra-ui/react"

type Props = {
    bgBlur: string,
    bannerImage: string,
    avatarImage: string,
    title: string,
    description: string,
    onClick?: any,
    buttonText?: string
    bgGrid: string
}

const CarouselSlide = ({ bgGrid, bgBlur, bannerImage, avatarImage, title, description, onClick, buttonText }: Props) => {
    return (
        <Box
            style={{
                background: `url(${bgGrid})`,
                borderRadius: `${style.card.borderRadius.default}`,
                marginTop: `${style.margin.xxl}`,
                backgroundSize: "90%",
                height: `40rem`,
                overflow: "visible"
            }}
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    background: `url(${bgBlur})`,
                    height: "100%",
                    backgroundSize: "80%",
                    backgroundPosition: "90% 50%",
                    backgroundRepeat: "no-repeat",
                    padding: `0% ${style.padding.xxl}`,
                }}
            >
                <Box width="50%">
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "80%"
                        }}
                    >
                        <Box
                            width="30%"
                        >
                            <Image src={avatarImage} height="9rem" />
                        </Box>
                        <Box
                            marginLeft={style.margin.sm}
                            width="70%"
                        >
                            <Heading
                                fontSize={style.font.h3}
                                p={0}
                                lineHeight={style.font.h3}
                            >
                                {title}
                            </Heading>
                            <Text fontSize={style.font.h5} mb={0}>
                                {description}
                            </Text>
                        </Box>
                    </Box>
                    <Box display={"flex"} width="80%" justifyContent={"flex-start"}>
                        <ButtonNative
                            size="lg"
                            variant="state_brand"
                            backgroundColorHover="#A0CDFF"
                            border="1px solid #fff"
                            marginTop="xs"
                            textFontSize="h4"
                            onClick={onClick ? onClick : () => { }}
                            text={buttonText ? buttonText : "View Contract Now"}
                        />
                    </Box>
                </Box>
                <Box height="100%">
                    <Image src={bannerImage} height="100%" />
                </Box>
            </Box>
        </Box>
    )
}
export default CarouselSlide