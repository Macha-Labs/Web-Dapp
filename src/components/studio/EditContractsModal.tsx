import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import TagNative from "@/_ui/tag/TagNative";
import chains from "@/data/network";
import { truncateAddress, truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ContractCreateEditModal from "./ContractCreateEditModal";
import ContractDeleteModal from "./ContractDeleteModal";

type Props = {
    modal: any;
    hookContract: any;
    hookContractCreate: any;
};

const EditContractsModal = ({ modal, hookContract, hookContractCreate }: Props) => {
    const editModal = useDisclosure();
    const router = useRouter()
    const deleteModal = useDisclosure();
    const { colorMode } = useColorMode()
    return (
        <ModalWindow
            scrollBehavior="inside"
            event={modal}
            size="4xl"
            header={
                <FlexRow width="100%" hrAlign="space-between">
                    <Text color={colorMode == "light" ? "#3d3d3d" : ""} className="mb-0">My Contracts</Text>
                    <Image src={GlobalIcons["icon-close"]} onClick={() => {
                        modal.onClose()
                    }}
                        alt=""
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "5px",
                            cursor: "pointer",
                            width: "fit-content",
                            height: "fit-content",
                            background: `${colorMode == "light" ? "#ffff" : style.icon.bg.default}`,
                            borderRadius: `${style.icon.borderRadius}`,
                            boxShadow: `${style.icon.shadow.default}`,
                            marginLeft: `${style.margin[style?.marginLeft]}`,
                            marginRight: `${style.margin[style?.marginRight]}`,
                            marginBottom: `${style.margin[style?.marginBottom]}`,
                            marginTop: `${style.margin[style?.marginTop]}`,
                        }} />
                </FlexRow>
            }
            footer={
                <FlexRow hrAlign="flex-end">
                    <Box
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                    </Box>
                </FlexRow>
            }
        >
            {hookContract.isUserContractsLoading ? (
                <FlexRow height="18rem">
                    <Loader size="lg" />
                </FlexRow>
            ) : (
                <FlexColumn
                    width="100%"
                    hrAlign="space-between"
                    height="100%"
                    padding={style.padding["sm"]}
                >
                    {hookContract.userContracts ? hookContract.userContracts.map((contract: any, index: any) => (
                        <Box
                            key={index}
                            style={{
                                border: `${colorMode == "light" ? "1px solid #e2e2e2" : style.card.border.default}`,
                                borderRadius: `${style.card.borderRadius.default}`,
                                background: `${colorMode == "light" ? "" : style.card.bg.default}`,
                                padding: `${style.padding.sm}`,
                                display: "flex",
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                height: "14rem",
                                marginBottom: `${style.margin.md}`
                            }}
                        >
                            <Box width="80%" style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <Box marginRight={style.margin.sm}>
                                    <Image src={contract?.contract?.image} height="4rem" width="4rem" />
                                </Box>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        width: "70%"
                                    }}
                                >
                                    <Box style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingBottom: "1.25rem"
                                    }}>
                                        <Text
                                            color={colorMode == "light" ? "#3d3d3d" : ""}
                                            style={{
                                                marginBottom: "0",
                                                marginRight: `${style.margin.xxs}`,
                                                fontSize: `${style.font.h4}`,
                                                fontWeight: `${style.fontWeight.dark}`,
                                                cursor: "pointer"
                                            }}
                                            _hover={{ textDecoration: "underline" }}
                                            onClick={() => router.push(`/search/contracts/${contract?.contract?.slug}`)}
                                        >
                                            {contract?.contract?.name}
                                        </Text>
                                        <TagNative value={contract?.contract?.isApproved ? "Approved" : "Pending"} lineHeight="1.25rem" />
                                    </Box>
                                    <Text
                                        color={colorMode == "light" ? "#3d3d3d" : ""}
                                        mb={2}>Created On: {contract?.createdAt}</Text>
                                    <Text
                                        color={colorMode == "light" ? "#3d3d3d" : ""}
                                        mb={2}>Contract ID: {truncateAddress(contract?.contract?.address)}</Text>
                                    <Text
                                        color={colorMode == "light" ? "#3d3d3d" : ""}
                                        mb={2}>Description: {truncateString(contract?.contract?.description, 100)}</Text>
                                </Box>
                            </Box>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                    height: "100%",
                                    width: "20%"
                                }}
                            >
                                <Box style={{
                                    display: "flex"
                                }}>
                                    <Box
                                        style={{ marginRight: `${style.margin.xxs}`, cursor: "pointer" }}
                                        onClick={() => {
                                            hookContract._fetchEdit(contract?.contract?.slug)
                                            editModal.onOpen()
                                        }}
                                    >
                                        <Image src={colorMode == "light" ? GlobalIcons["icon-edit-light"] : GlobalIcons["icon-dark-edit"]} />
                                    </Box>
                                    <Box
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            hookContract._fetchEdit(contract?.contract?.slug)
                                            deleteModal.onOpen()
                                        }}
                                    >
                                        <Image src={colorMode == "light" ? GlobalIcons["icon-delete-light"] : GlobalIcons["icon-dark-delete"]} />
                                    </Box>
                                </Box>
                                <Box><Image height="3rem" src={GlobalIcons[chains[contract?.contract?.chain_id].chainImage]} /></Box>
                            </Box>
                            <ContractCreateEditModal modal={editModal} hookContractCreate={hookContractCreate} hookContract={hookContract} isEdit={true} />
                            <ContractDeleteModal modal={deleteModal} hookContract={hookContract} />
                        </Box>
                    )) : <Box ml={0}>
                        <Text color={colorMode == "light" ? "#3d3d3d" : ""} mb={0}>
                            No Contracts Found
                        </Text>
                    </Box>}
                </FlexColumn>
            )}
        </ModalWindow>
    );
};

export default EditContractsModal;
