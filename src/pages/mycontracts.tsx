import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavStudio from "@/_ui/nav/NavStudio";
import TagNative from "@/_ui/tag/TagNative";
import CreateContractModal from "@/components/studio/ContractCreateModal";
import chains from "@/data/network";
import useContractCreate from "@/hooks/studio/useContractCreate";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";

const renderNav = () => {
    return <NavStudio />;
};

const RenderBody = () => {

    const contractModal = useDisclosure();
    const hookContractCreate = useContractCreate(contractModal);

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
                <Box
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
                        <Image src={GlobalIcons["logo-Lens"]} height="4rem" />
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
                                fontWeight: `${style.fontWeight.dark}`
                            }}>Lens</Text>
                            <TagNative value="Approved" lineHeight="1.25rem" />
                        </Box>
                        <Text mb={2}>Created On: 26-07-23</Text>
                        <Text mb={2}>Contract ID: 0xDb46d1D...a1d</Text>
                        <Text mb={2}>Description: Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon.</Text>
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
                            >
                                <Image src={GlobalIcons["icon-dark-edit"]} />
                            </Box>
                            <Box
                                style={{ cursor: "pointer" }}
                            >
                                <Image src={GlobalIcons["icon-dark-delete"]} />
                            </Box>
                        </Box>
                        <Box><Image height="3rem" src={GlobalIcons[chains["137"].chainImage]} /></Box>
                    </Box>
                </Box>
                <Box
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
                        <Image src={GlobalIcons["logo-Lens"]} height="4rem" />
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
                                fontWeight: `${style.fontWeight.dark}`
                            }}>Lens</Text>
                            <TagNative value="Approved" lineHeight="1.25rem" />
                        </Box>
                        <Text mb={2}>Created On: 26-07-23</Text>
                        <Text mb={2}>Contract ID: 0xDb46d1D...a1d</Text>
                        <Text mb={2}>Description: Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon.</Text>
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
                            >
                                <Image src={GlobalIcons["icon-dark-edit"]} />
                            </Box>
                            <Box
                                style={{ cursor: "pointer" }}
                            >
                                <Image src={GlobalIcons["icon-dark-delete"]} />
                            </Box>
                        </Box>
                        <Box><Image height="3rem" src={GlobalIcons[chains["137"].chainImage]} /></Box>
                    </Box>
                </Box>
                <Box
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
                        <Image src={GlobalIcons["logo-Lens"]} height="4rem" />
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
                                fontWeight: `${style.fontWeight.dark}`
                            }}>Lens</Text>
                            <TagNative value="Approved" lineHeight="1.25rem" />
                        </Box>
                        <Text mb={2}>Created On: 26-07-23</Text>
                        <Text mb={2}>Contract ID: 0xDb46d1D...a1d</Text>
                        <Text mb={2}>Description: Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon. Lens contract deployed on network Polygon.</Text>
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
                            >
                                <Image src={GlobalIcons["icon-dark-edit"]} />
                            </Box>
                            <Box
                                style={{ cursor: "pointer" }}
                            >
                                <Image src={GlobalIcons["icon-dark-delete"]} />
                            </Box>
                        </Box>
                        <Box><Image height="3rem" src={GlobalIcons[chains["137"].chainImage]} /></Box>
                    </Box>
                </Box>
            </Box>
            <CreateContractModal modal={contractModal} hookContractCreate={hookContractCreate} />
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