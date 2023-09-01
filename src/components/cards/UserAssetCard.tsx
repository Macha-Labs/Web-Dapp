import { style } from "@/styles/StyledConstants"
import { Box, Flex, Image, Text } from "@chakra-ui/react"

type Props = {
    icon: string,
    title: string,
    description?: string
}

const UserAssetCard = ({title,description,icon}: Props) => {
    return (
        <Box
            flex="1"
            borderRadius={style.card.borderRadius.default}
            background={style.card.bg.overview}
            marginRight="10px"
            border={style.card.border.default}
            paddingLeft={`${style.padding.md}`}
            paddingTop={`${style.padding.sm}`}
        >
            <Image
                src={icon}
                alt="brandToken"
                marginBottom={style.margin.xxl}
            />
            <Text fontSize={`${style.font.h4}`} marginBottom="0px">
                {title}
            </Text>
            <Flex>
                <Box
                    flex="1.5"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Text>{description}</Text>
                </Box>
                <Box flex="1" justifyContent="flex-end" alignItems="end">
                    End
                </Box>
            </Flex>
        </Box>
    )
}
export default UserAssetCard