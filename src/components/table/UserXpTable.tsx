import FlexRow from "@/_ui/flex/FlexRow";
import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Td, Text, Th } from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { ConnectWalletButton } from "../ConnectWalletButton";
import GlobalIcons from "@/styles/GlobalIcons";

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
                            quest: "Own a .lens handle",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
                        },
                        {
                            quest: "Publish to Mirror.xyz",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Mirror"
                        },
                        {
                            quest: "POAP",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Poap"
                        },
                        {
                            quest: "LENS",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
                        },
                        {
                            quest: "Sound.xyz",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Sound.xyz"
                        },
                        {
                            quest: "Own a .lens handle",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
                        },
                        {
                            quest: "Own a .lens handle",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
                        },
                        {
                            quest: "Own a .lens handle",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
                        },
                        {
                            quest: "Own a .lens handle",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
                        },
                        {
                            quest: "Own a .lens handle",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
                        },
                        {
                            quest: "Own a .lens handle",
                            xp: "10",
                            status: "claimed",
                            image: "logo-Lens"
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
                                    paddingLeft: `${style.padding.xxs}`,
                                }}
                            >
                                Quest
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
                                <FlexRow>
                                    <Text mb={0} color="#8f8f8f" fontWeight="500">XP</Text>
                                    <Image src={GlobalIcons["icon-bolt"]} />
                                </FlexRow>
                            </Th>
                        </>
                    }
                    tbodyChildren={(item: any, index: any) => {
                        return (
                            <>
                                <Td style={{ textAlign: "left", padding: `${style.padding.xxs}` }}>
                                    <FlexRow hrAlign="flex-start">
                                        <Image src={GlobalIcons[item.image]} height="2rem" marginRight={style.margin.xs} />
                                        <Text fontSize={style.font.h4} mb={0}>{item?.quest}</Text>
                                    </FlexRow>
                                </Td>
                                <Td style={{ textAlign: "center", padding: `${style.padding.sm}` }}>
                                    <FlexRow>
                                        <Text mb={0}>{item?.xp}</Text>
                                        <Image src={GlobalIcons["icon-bolt"]} />
                                    </FlexRow>
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