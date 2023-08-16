import GlobalIcons from "@/styles/GlobalIcons"
import { style } from "@/styles/StyledConstants"
import { Box, Image, Text } from "@chakra-ui/react"

const CollectorCard = ({ name, tag, artists }: any) => {
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "30%",
                padding: `${style.padding.sm}`,
                borderRadius: `${style.card.borderRadius.default}`,
                margin: `${style.margin.sm}`
            }}
        >
            <Image height="3rem" alt="" src={GlobalIcons["logo-Optimism"]} marginRight={style.margin.xs} />
            <Box>
                <Text style={{ fontSize: `${style.font.h6}`, marginBottom: "0px" }}>{name}</Text>
                <Text style={{ fontSize: `${style.font.h5}`, marginBottom: "0px" }}>{tag} • {artists}</Text>
            </Box>
        </Box>
    )
}

export default CollectorCard