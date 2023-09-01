import FlexColumn from "@/_ui/flex/FlexColumn"
import FlexRow from "@/_ui/flex/FlexRow"
import { style } from "@/styles/StyledConstants"
import { Box, Text } from "@chakra-ui/react"

type Props = {
    title?: string,
    description?: string
}

const UserContentCard = ({title,description}: Props) => {
  return (
    <FlexColumn hrAlign="flex-start" vrAlign="flex-start" width="100%">
            <Box borderRadius={style.card.borderRadius.default} width="100%">
              <FlexRow>
                <FlexColumn marginRight="xxxs" width="65%">
                  <Box bg="white" height="15rem" width="100%" borderRadius="28.731px 0px 0px 28.731px">
                  </Box>
                </FlexColumn>
                <FlexColumn hrAlign="space-between" width="35%">
                  <Box bg="blue" height="7.5rem" width="100%" borderRadius="0px 28.731px 0px 0px" marginBottom={`${style.margin.xxxs}`}></Box>
                  <Box bg="red" height="7.5rem" width="100%" borderRadius="0px 0px 28.731px 0px"></Box>
                </FlexColumn>
              </FlexRow>
            </Box>
            <Text marginBottom="0px" marginTop={`${style.margin.md}`}>{title}</Text>
            <Text marginBottom="0px">{description}</Text>
          </FlexColumn>
  )
}
export default UserContentCard