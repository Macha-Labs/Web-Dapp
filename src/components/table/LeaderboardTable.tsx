import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Box, Td, Text, Th } from "@chakra-ui/react";
import Avatar from "boring-avatars";

const LeaderboardTable = () => {
    return (
        <Box>
            <TableNative
                height="20rem"
                overflow="scroll"
                theadBackground={style.modal.bg.contractModal}
                theadBottomBorder="none"
                data={[
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 1
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 2
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 3
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 4
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 5
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 6
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 7
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 8
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 9
                    },
                    {
                        user_address: "0x3265476456",
                        xp: "262,500",
                        rank: 10
                    },
                ]}
                theadChildren={
                    <>
                        <Th
                            style={{
                                textAlign: "left",
                                fontSize: "1.25rem",
                                textTransform: "capitalize",
                                color: "#8f8f8f",
                                fontWeight: "500",
                                marginLeft: `${style.padding.sm}`,
                            }}
                        >
                            Rank
                        </Th>
                        <Th
                            style={{
                                fontSize: "1.25rem",
                                textAlign: "center",
                                textTransform: "capitalize",
                                color: "#8f8f8f",
                                fontWeight: "500",
                                paddingLeft: `${style.padding.xxs}`
                            }}
                        >
                            Address
                        </Th>
                        <Th
                            style={{
                                textAlign: "center",
                                fontSize: "1.25rem",
                                textTransform: "capitalize",
                                color: "#8f8f8f",
                                fontWeight: "500",
                            }}
                        >
                            XP
                        </Th>
                    </>
                }
                tbodyChildren={(item: any, index: any) => {
                    return (
                        <>
                            <Td style={{ textAlign: "center", paddingLeft: `0px` }}>
                                <Text
                                    marginBottom={0}
                                    fontSize={style.font.h4}
                                >
                                    #{item?.rank}
                                </Text>
                            </Td>
                            <Td style={{ paddingLeft: `${style.padding.xxs}` }}>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box width="2rem" height="2rem" marginRight={style.margin.xxs}>
                                        <Avatar size="2rem" name={item?.user_address} />
                                    </Box>
                                    <Text
                                        paddingLeft={2}
                                        fontSize={style.font.h4}
                                        marginBottom={0}
                                        fontWeight={style.fontWeight.dark}
                                    >
                                        {truncateAddress(item?.user_address)}
                                    </Text>
                                </Box>
                            </Td>
                            <Td style={{ textAlign: "center", padding: `${style.padding.sm}` }}>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box>
                                        <Text mb={0} fontSize={style.font.h4}>{item?.xp}</Text>
                                    </Box>
                                </Box>
                            </Td>
                        </>
                    );
                }}
            />
        </Box>
    )
}
export default LeaderboardTable