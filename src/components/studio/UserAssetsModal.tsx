import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexRow from "@/_ui/flex/FlexRow";
import InputSearch from "@/_ui/input/InputSearch";
import ModalWindow from "@/_ui/modal/ModalWindow"
import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Avatar, Box, Image, MenuButton, Td, Text, Th } from "@chakra-ui/react";

type Props = {
    modal: any;
};

const UserAssetsModal = ({ modal }: Props) => {
    return (
        <ModalWindow
            event={modal}
            size="5xl"
        >
            <Box
                padding={style.padding.sm}
                borderRadius={style.card.borderRadius.button}
                position="relative"
                boxShadow={style.card.shadow.default}
            >
                <Box
                    style={{
                        position: "absolute",
                        right: "-2.4rem",
                        top: "-1.3rem",
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
                    <Text mb={0} fontSize={style.font.h4} fontWeight={style.fontWeight.dark}>My Tokens</Text>
                    <FlexRow width="50%">
                        <InputSearch
                            height="40px"
                            placeholder="Search Token"
                            marginRight={style.margin.sm}
                        />
                        <ButtonMenu
                            width="40%"
                            size={"lg"}
                            text="Highest"
                            icon={{
                                slug: "icon-chevron-down",
                                style: "",
                            }}
                            options={[

                            ]}
                        />
                    </FlexRow>
                </FlexRow>
                <Box
                    marginTop="1rem"
                    border={style.table.border.thead}
                    borderRadius="20px"
                    marginBottom={style.margin.md}
                >
                    <TableNative
                        data={[
                            {
                                contract_address: "0x3265476456"
                            },
                            {
                                contract_address: "0x3265476456"
                            },
                            {
                                contract_address: "0x3265476456"
                            },
                            {
                                contract_address: "0x3265476456"
                            },
                            {
                                contract_address: "0x3265476456"
                            },
                        ]}
                        theadChildren={
                            <>
                                <Th
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        paddingTop: "2rem",
                                        paddingBottom: "2rem",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    Name
                                </Th>
                                <Th
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        paddingTop: "2rem",
                                        paddingBottom: "2rem",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    Balance
                                </Th>
                                <Th
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        paddingTop: "2rem",
                                        paddingBottom: "2rem",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    Chains
                                </Th>
                                <Th
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        paddingTop: "2rem",
                                        paddingBottom: "2rem",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    Contract Address
                                </Th>
                            </>
                        }
                        tbodyChildren={(item: any) => {
                            return (
                                <>
                                    <Td style={{ textAlign: "center", padding: `${style.padding.sm}` }}>
                                        <Box
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Box width="3rem" height="3rem">
                                                <Image
                                                    rounded="md"
                                                    src="/assets/token-placeholder.jpeg"
                                                />
                                            </Box>
                                            <Box>
                                            <Text
                                                paddingLeft={2}
                                                marginBottom={1}
                                                fontWeight={style.fontWeight.dark}
                                            >
                                                AAVE
                                            </Text>
                                            <Text
                                                paddingLeft={2}
                                                marginBottom={0}
                                                fontSize={style.font.h7}
                                            >
                                                AAVE
                                            </Text>
                                            </Box>
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
                                            <Box width="1.5rem" height="1.5rem">
                                                <Image
                                                    rounded="2xl"
                                                    src="/assets/icons/coloured-square-gas-price.svg"
                                                />
                                            </Box>
                                            <Text
                                                paddingLeft={2}
                                                marginBottom={0}
                                            >
                                                234
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
                                            <Box width="2rem" height="2rem">
                                                <Image
                                                    src={GlobalIcons["logo-Ethereum"]}
                                                />
                                            </Box>
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
                                            <Box width="1.5rem" height="1.5rem">
                                                <Avatar
                                                    size="xxs"
                                                    src={GlobalIcons["avatar-default"]}
                                                />
                                            </Box>
                                            <Text
                                                paddingLeft={2}
                                                marginBottom={0}
                                            >
                                                {truncateAddress(item?.contract_address)}
                                            </Text>
                                        </Box>
                                    </Td>
                                </>
                            );
                        }}
                    />
                </Box>
            </Box>
        </ModalWindow>
    )
}
export default UserAssetsModal
