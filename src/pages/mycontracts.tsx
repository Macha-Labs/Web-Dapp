import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavStudio from "@/_ui/nav/NavStudio";
import TagNative from "@/_ui/tag/TagNative";
import CreateContractModal from "@/components/studio/ContractCreateModal";
import ContractDeleteModal from "@/components/studio/ContractDeleteModal";
import EditContractModal from "@/components/studio/ContractEditModal";
import chains from "@/data/network";
import { truncateAddress, truncateString } from "@/helpers";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useAuthStore from "@/store/useAuthStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const renderNav = () => {
    return <NavStudio />;
};

const RenderBody = () => {

    const contractModal = useDisclosure();
    const hookContractCreate = useContractCreate(contractModal);
    const hookContract = useContract();
    const editModal = useDisclosure();
    const $address = useAuthStore((state: any) => state.address);
    const router = useRouter()
    const deleteModal = useDisclosure();

    useEffect(() => {
        if ($address) {
            hookContract._fetchUserContracts($address)
        }
    }, [$address])

    return (
        <Box
            style={{
                padding: "2% 4%",
                marginTop: `${style.margin.nav}`
            }}
        >
            <Box
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                <Box>
                    <Text style={{ fontSize: `${style.font.h4}`, fontWeight: `${style.fontWeight.dark}` }}>My Contracts</Text>
                </Box>
                <Box
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => contractModal.onOpen()}
                >
                    <Image src={GlobalIcons["icon-dark-add"]} />
                </Box>
            </Box>

            {/* Contract List */}
            <Box
                style={{
                    marginTop: `${style.margin.md}`,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Individual Contract */}
                {hookContract.isUserContractsLoading ? <FlexRow height="18rem">
                    <Loader size="lg" />
                </FlexRow> : (
                    hookContract.userContracts ? hookContract.userContracts.map((contract: any, index: any) => (
                        <Box
                            key={index}
                            style={{
                                border: `${style.card.border.default}`,
                                borderRadius: `${style.card.borderRadius.default}`,
                                background: `${style.card.bg.default}`,
                                padding: `${style.padding.sm}`,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                height: "14rem",
                                marginBottom: `${style.margin.md}`
                            }}
                        >
                            <Box>
                                <Image src={contract?.contract?.image} height="4rem" />
                            </Box>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "85%"
                                }}
                            >
                                <Box style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingBottom: "1.25rem"
                                }}>
                                    <Text style={{
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
                                <Text mb={2}>Created On: {contract?.createdAt}</Text>
                                <Text mb={2}>Contract ID: {truncateAddress(contract?.contract?.address)}</Text>
                                <Text mb={2}>Description: {truncateString(contract?.contract?.description, 200)}</Text>
                            </Box>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                    height: "100%"
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
                                        <Image src={GlobalIcons["icon-dark-edit"]} />
                                    </Box>
                                    <Box
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            hookContract._fetchEdit(contract?.contract?.slug)
                                            deleteModal.onOpen()
                                        }}
                                    >
                                        <Image src={GlobalIcons["icon-dark-delete"]} />
                                    </Box>
                                </Box>
                                <Box><Image height="3rem" src={GlobalIcons[chains[contract?.contract?.chain_id].chainImage]} /></Box>
                            </Box>
                        </Box>
                    )) : <Box ml={0}>
                        No Contracts Found
                    </Box>)}
            </Box>
            <CreateContractModal modal={contractModal} hookContractCreate={hookContractCreate} />
            <EditContractModal modal={editModal} hookContractCreate={hookContractCreate} hookContract={hookContract} />
            <ContractDeleteModal modal={deleteModal} hookContract={hookContract} />
        </Box>
    )
}

const MyContracts = () => {

    return (<FlexWindow
        view="col"
        bodyElem={<RenderBody />}
        navElem={renderNav()}
    ></FlexWindow>
    )
}

export default MyContracts