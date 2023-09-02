import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Td, Text, Th } from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { ConnectWalletButton } from "../ConnectWalletButton";

const UserXpTable = () => {
    const $address = useAuthStore((state: any) => state.address);
    return (
        <Box
            position="relative"
        >
            <Box
                opacity={!$address ? "0.4" : 1}
                filter={!$address ? "blur(10px)" : ""}
            >
                <TableNative
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
                            <Box display="flex" alignItems="center" width="80%">
                                <Th
                                    style={{
                                        textAlign: "left",
                                        fontSize: "1.25rem",
                                        textTransform: "capitalize",
                                        color: "#8f8f8f",
                                        fontWeight: "500",
                                        paddingLeft: `${style.padding.xs}`,
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
                            </Box>
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
                                <Box display="flex" alignItems="center" width="80%">
                                    <Td style={{ textAlign: "center", padding: `${style.padding.xxs}`, width: "50%" }}>
                                        <Text
                                            marginBottom={0}
                                            fontSize={style.font.h4}
                                        >
                                            #{item?.rank}
                                        </Text>
                                    </Td>
                                    <Td style={{ padding: `${style.padding.sm}` }}>
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
            {!$address && <Box
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "30%"
                }}
            >
                <ConnectWalletButton />
            </Box>}
        </Box>
    )
}
export default UserXpTable