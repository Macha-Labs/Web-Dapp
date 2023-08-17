import FlexRow from "@/_ui/flex/FlexRow"
import GlobalIcons from "@/styles/GlobalIcons"
import { style } from "@/styles/StyledConstants"
import { Avatar, Box, Image, Text } from "@chakra-ui/react"

const GraphCard = ({ marginRight, image, title, user, tag }: any) => {
    return (
        <Box
            _hover={{
                border: `${style.card.border.meta}`,
                transform: "scale(1.05,1.05)",
                transition: "all 0.2s cubic-bezier(0.64, 0.04, 0.35, 1)"
            }}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "10rem",
                height: "12rem",
                padding: `${style.padding.xs}`,
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderRadius: `${style.card.borderRadius.button}`,
                marginRight: `${marginRight ? marginRight : style.margin.sm}`,
                zIndex: "2",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer"
            }}
        >
            <Box>
                <Image height="4rem" src={image} alt="" />
                <Image style={{
                    position: "absolute",
                    top: "1rem",
                    left: "0.5rem",
                    height: "10rem",
                    backgroundSize: "250%",
                    filter: "blur(35px)",
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    zIndex: "-1",
                    opacity: "0.64"
                }}
                src={image} alt="" />
            </Box>
            <FlexRow vrAlign="center" hrAlign="center" marginTop="xxs">
                <Avatar height="0.7rem" width="0.7rem" src={GlobalIcons["avatar-default"]} />
                <Text ml={1} mb={1} fontSize={style.font.h7}>{user}</Text>
            </FlexRow>
            <Text mb={2}>{title}</Text>
            <Box
                style={{
                    borderRadius: "20px",
                    border: "1px solid #80808030",
                    padding: "5px"
                }}
            >
                <Text mb={0} fontSize="0.6rem" fontWeight={style.fontWeight.dark}>{tag}</Text>
            </Box>
        </Box>
    )
}
export default GraphCard