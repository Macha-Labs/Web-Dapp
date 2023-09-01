import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Td, Text, Th } from "@chakra-ui/react";
import Avatar from "boring-avatars";

const LeaderboardTable = () => {
    return (
        <Box
            marginTop="1rem"
            border={style.nav.border.default}
            borderRadius="20px"
            marginBottom={style.margin.md}
        >
            <TableNative
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
                        <Box width="80%" display="flex" alignItems="center">
                            <Th
                                style={{
                                    textAlign: "center",
                                    fontSize: "1.25rem",
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                    textTransform: "capitalize",
                                    width: "20%"
                                }}
                            >
                                Rank
                            </Th>
                            <Th
                                style={{
                                    fontSize: "1.25rem",
                                    paddingTop: "2rem",
                                    textAlign: "center",
                                    paddingBottom: "2rem",
                                    textTransform: "capitalize",
                                    width: "30%"
                                }}
                            >
                                Address
                            </Th>
                        </Box>
                        <Th
                            style={{
                                textAlign: "center",
                                fontSize: "1.25rem",
                                paddingTop: "2rem",
                                paddingBottom: "2rem",
                                textTransform: "capitalize",
                            }}
                        >
                            XP
                        </Th>
                    </>
                }
                tbodyChildren={(item: any, index: any) => {
                    return (
                        <>
                            <Box width="80%" display="flex" alignItems="center">
                                <Td style={{ textAlign: "center", padding: `${style.padding.sm}`, width: "20%" }}>
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text
                                            marginBottom={0}
                                            fontSize={style.font.h4}
                                        >
                                            #{item?.rank}
                                        </Text>
                                    </Box>
                                </Td>
                                <Td style={{ padding: `${style.padding.sm}`, width: "70%" }}>
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
                            </Box>
                            <Td style={{ textAlign: "center", padding: `${style.padding.sm}`, width: "15%" }}>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box>
                                        <Text mb={0}
                                        fontSize={style.font.h4}>{item?.xp}</Text>
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