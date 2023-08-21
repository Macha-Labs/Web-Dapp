import FlexRow from "@/_ui/flex/FlexRow"
import chains from "@/data/network"
import { timeStampConversion, truncateAddress } from "@/helpers"
import GlobalIcons from "@/styles/GlobalIcons"
import { style } from "@/styles/StyledConstants"
import { Box, Image, Text } from "@chakra-ui/react"
import Avatar from "boring-avatars"
import Link from "next/link"

type Props = {
    from: string,
    to: string,
    method_name?: string,
    timestamp: string,
    chain_id: any,
    txn_hash: string
}

const TransactionCard = ({ from, to, method_name, timestamp, chain_id, txn_hash }: Props) => {


    return (
        <Link href={`/search/transaction/${txn_hash}`} style={{
            marginRight: `${style.margin.sm}`,
            marginTop: `${style.margin.sm}`,
        }}>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "20rem",
                    border: `${style.card.border.meta}`,
                    borderRadius: `${style.card.borderRadius.button}`,
                    padding: `${style.padding.xs}`,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "5rem",
                    boxShadow: `${style.card.shadow.default}`,
                }}
            >
                <FlexRow hrAlign="flex-start">
                    <Box>
                        <Avatar size="2.5rem" name={`${txn_hash}${from}${to}`} variant="marble" />
                    </Box>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            marginLeft: `${style.margin.xs}`,
                            alignItems: "flex-start",
                            justifyContent: "center"
                        }}
                    >
                        <FlexRow hrAlign="flex-start" height="100%">
                            <Text mb={0} mr={2} fontSize={style.font.h7}>{truncateAddress(from)}</Text>
                            <Text mb={0} color={style.color["white.7"]} fontSize={style.font.h7}>{timeStampConversion(timestamp).time}</Text>
                        </FlexRow>
                        <FlexRow hrAlign="flex-start" height="100%">
                            <Text mb={0} bgGradient="linear(100.07deg,#2a85ff 0.39%,#2448c7 73.45%)"
                                bgClip="text" fontWeight={style.fontWeight.dark} mr={1} fontSize={style.font.h7}>{method_name}</Text>
                            <Text mb={0} color={style.color["white.7"]} mr={1} fontSize={style.font.h7}>to</Text>
                            <Text mb={0} fontSize={style.font.h7}>{truncateAddress(to)}</Text>
                        </FlexRow>
                    </Box>
                </FlexRow>
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "center",
                        width: "20%",
                        alignSelf: "flex-end"
                    }}
                >
                    <Image height="2rem" src={GlobalIcons[chains[chain_id]?.chainImage]} />
                </Box>
            </Box>
        </Link>
    )
}
export default TransactionCard