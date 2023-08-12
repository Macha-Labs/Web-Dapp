import { style } from "@/styles/StyledConstants"
import { Avatar, Box, Text } from "@chakra-ui/react"
type Props = {
    value?: string,
    icon?: any,
    height?: any,
    width?: any,
    fontSize?: any
    marginRight?: any,
    marginLeft?: any,
    marginTop?: any,
    marginBottom?: any
    onClick?: any
    selected?: boolean
}

const TagFilter = ({ value, icon, height, width, fontSize, marginLeft, marginBottom, marginRight, marginTop, onClick,selected }: Props) => {
    return (
        <Box style={{
            display: "flex",
            flexDirection: "row",
            height: `${height}`,
            width: `${width}`,
            justifyContent: "center",
            alignItems: "center",
            marginRight: `${marginRight}`,
            marginLeft: `${marginLeft}`,
            marginTop: `${marginTop}`,
            marginBottom: `${marginBottom}`,
            background: `${style.card.bg.default}`,
            border: `${selected ? style.card.border.hover :style.card.border.default}`,
            boxShadow: `${style.card.shadow.default}`,
            borderRadius: "100px",
            padding: `${style.padding.sm}`,
            cursor: "pointer"
        }}
            _hover={{
                background: `${style.card.bg.hover} !important`,
                border: `${style.card.border.hover} !important`,
                shadow: `${style.card.shadow.hover} !important`,
            }}
            onClick={onClick}
        >
            {icon && icon.align == "left" && <Avatar marginRight={1.5} src={icon.src} size="xs" />}
            <Text mb={0} fontSize={fontSize}>{value}</Text>
            {icon && icon.align == "right" && <Avatar marginLeft={1.5} src={icon.src} size="xs" />}
        </Box>
    )
}
export default TagFilter