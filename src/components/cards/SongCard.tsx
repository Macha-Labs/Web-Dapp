import GlobalIcons from "@/styles/GlobalIcons"
import { style } from "@/styles/StyledConstants"
import { Box, Image, Text } from "@chakra-ui/react"

const SongCard = ({ title, artist, tag }: any) => {
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                background: `${style.card.bg.meta}`,
                width: "45%",
                padding: `${style.padding.sm}`,
                borderRadius: `${style.card.borderRadius.default}`,
                margin: `${style.margin.sm}`
            }}
        >
            <Image height="3rem" alt="" src={GlobalIcons["logo-Ens"]} marginRight={style.margin.xs} />
            <Box>
                <Text style={{ fontSize: `${style.font.h6}`, marginBottom: "0px" }}>{artist}</Text>
                <Text style={{ fontSize: `${style.font.h5}`, marginBottom: "0px" }}>{title}</Text>
                <Text style={{ fontSize: `${style.font.h7}`, marginBottom: "0px" }}>{tag}</Text>
            </Box>
        </Box>
    )
}

export default SongCard