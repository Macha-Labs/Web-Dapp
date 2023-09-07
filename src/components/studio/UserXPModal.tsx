import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexRow from "@/_ui/flex/FlexRow";
import InputSearch from "@/_ui/input/InputSearch";
import ModalWindow from "@/_ui/modal/ModalWindow";
import TagNative from "@/_ui/tag/TagNative";
import chains from "@/data/network";
import useXP from "@/hooks/studio/useXP";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

type Props = {
    modal: any;
};

const UserXPModal = ({ modal }: Props) => {
    const hookXP = useXP()
    const {address,isConnected} = useAccount()

    useEffect(() => {
        if(address && isConnected){
            hookXP._fetch()
            hookXP._fetchUserXP(address)
        }
    },[address])

    return (
        <ModalWindow
            event={modal}
            size="2xl"
            header={
                <>
                    <Box
                        style={{
                            position: "absolute",
                            right: "-1rem",
                            top: "-0.5rem",
                        }}
                    >
                        <Image
                            src={GlobalIcons["icon-close"]}
                            onClick={() => {
                                modal.onClose();
                            }}
                            alt=""
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "7px",
                                cursor: "pointer",
                                width: "2rem",
                                height: "2rem",
                                background: `${style.icon.bg.default}`,
                                borderRadius: "50%",
                                boxShadow: `${style.icon.shadow.default}`,
                            }}
                        />
                    </Box>
                    <FlexRow hrAlign="space-between">
                        <Text
                            mb={0}
                            fontSize={style.font.h4}
                            fontWeight={style.fontWeight.dark}
                        >
                            Earn Rewards
                        </Text>
                        <FlexRow width="50%">
                            <ButtonMenu
                                width="40%"
                                size={"lg"}
                                text="Highest"
                                icon={{
                                    slug: "icon-chevron-down",
                                    style: "",
                                }}
                                options={[]}
                            />
                            <InputSearch
                                height="40px"
                                placeholder="Search Token"
                                marginLeft={style.margin.sm}
                            />
                        </FlexRow>
                    </FlexRow>
                </>
            }
            footer={
                <>
                    <Box
                        style={{
                            position: "absolute",
                            right: "-1rem",
                            top: "-0.5rem",
                        }}
                    >
                        <Image
                            src={GlobalIcons["icon-close"]}
                            onClick={() => {
                                modal.onClose();
                            }}
                            alt=""
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "7px",
                                cursor: "pointer",
                                width: "2rem",
                                height: "2rem",
                                background: `${style.icon.bg.default}`,
                                borderRadius: "50%",
                                boxShadow: `${style.icon.shadow.default}`,
                            }}
                        />
                    </Box>
                    <FlexRow hrAlign="space-between">
                        <Text
                            mb={0}
                            fontSize={style.font.h4}
                            fontWeight={style.fontWeight.dark}
                            width="50%"
                        >
                            Your Rewarded XPs
                        </Text>
                        <FlexRow hrAlign="center" width="15%">
                            <Text mb={0}>{hookXP?.userXPList ? hookXP?.userXPList?.points : 0}</Text>
                            <Image src={GlobalIcons["icon-bolt"]} />
                        </FlexRow>
                    </FlexRow>
                </>
            }
        >
            <Box marginTop="1rem" marginBottom={style.margin.md}>
                <TableContainer rounded={"md"} height="400px" overflowY="scroll">
                    <Table variant="unstyled" colorScheme="whiteAlpha" size="sm">
                        <Thead position="sticky" top={0} zIndex="docked" background={style.modal.bg.contractModal}
                            borderBottom={style.modal.border.contract}
                        >
                            <Tr justifyContent="space-between">
                                <Th
                                    style={{
                                        paddingTop: "20px",
                                        paddingBottom: "20px",
                                        textAlign: "left",
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: style.font.h6,
                                        borderCollapse: "separate",
                                        borderSpacing: "0 1rem",

                                    }}
                                >
                                    Quest
                                </Th>
                                <Box style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}>
                                    <Th
                                        style={{
                                            paddingTop: "20px",
                                            paddingBottom: "20px",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: style.font.h6,
                                            borderCollapse: "separate",
                                            borderSpacing: "0 1rem",
                                            width: "50%"
                                        }}
                                    >
                                        Status
                                    </Th>
                                    <Th
                                        style={{
                                            paddingTop: "20px",
                                            paddingBottom: "20px",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: style.font.h6,
                                            borderCollapse: "separate",
                                            borderSpacing: "0 1rem",
                                        }}
                                    >
                                        <FlexRow>
                                            <Text mb={0}>XP</Text>
                                            <Image src={GlobalIcons["icon-bolt"]} />
                                        </FlexRow>
                                    </Th>
                                </Box>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {hookXP.XPList && hookXP.XPList.map((item: any, index: any) => (
                                <Tr justifyContent="space-between" key={index}>
                                    <Td
                                        style={{
                                            paddingTop: "20px",
                                            paddingBottom: "20px",
                                            textAlign: "center",
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: style.font.h6,
                                            borderCollapse: "separate",
                                            borderSpacing: "0 1rem",

                                        }}
                                    >
                                        <FlexRow hrAlign="flex-start">
                                            <Image src={item.chainId ?  GlobalIcons[chains[item.chainId]?.chainImage] : GlobalIcons["avatar-default"]} height="2rem" marginRight={style.margin.xs} />
                                            <Text fontSize={style.font.h4} mb={0}>{item?.title}</Text>
                                        </FlexRow>
                                    </Td>
                                    <Box style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center"
                                    }}>
                                        <Td
                                            style={{
                                                paddingTop: "20px",
                                                paddingBottom: "20px",
                                                textAlign: "center",
                                                justifyContent: "center",
                                                color: "white",
                                                fontWeight: "600",
                                                fontSize: style.font.h6,
                                                borderCollapse: "separate",
                                                borderSpacing: "0 1rem",
                                                marginRight: `0.1rem`,
                                                width: "60%"
                                            }}
                                        >
                                            <TagNative variant={item?.status != "claimed" ? "state_xmtp" : ""} value={item?.status == "claimed" ? "Claimed" : "Claim"} />
                                        </Td>
                                        <Td
                                            style={{
                                                paddingTop: "20px",
                                                paddingBottom: "20px",
                                                textAlign: "center",
                                                color: "white",
                                                fontWeight: "600",
                                                fontSize: style.font.h6,
                                                borderCollapse: "separate",
                                                borderSpacing: "0 1rem",
                                            }}
                                        >
                                            <FlexRow>
                                                <Text mb={0}>{item?.points}</Text>
                                                <Image src={GlobalIcons["icon-bolt"]} />
                                            </FlexRow>
                                        </Td>
                                    </Box>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </ModalWindow>
    );
};
export default UserXPModal;
