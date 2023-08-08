import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
    modal: any;
    hookContractCreate?: any;
    hookContract?: any
};

const ContractDeleteModal = ({ modal, hookContract }: Props) => {

    const router = useRouter()

    return (
        <>
            <ModalWindow
                event={modal}
                size="3xl"
                header={
                    <FlexRow width="100%" hrAlign="space-between">
                        <Text className="mb-0">Contract</Text>
                        <Image src={GlobalIcons["icon-close"]} onClick={() => modal.onClose()} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
              width: "fit-content",
              height: "fit-content",
              background: `${style.icon.bg.default}`,
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
                    <FlexRow hrAlign="flex-start">
                        <ButtonNative
                            variant="state_brand"
                            marginTop={style.margin["lg"]}
                            onClick={async (e: any) => {
                                e.preventDefault();
                                await hookContract.contractDelete(hookContract.contractDetails[0]?._id);
                            }}
                        >
                            Delete
                        </ButtonNative>

                        <ButtonNative variant="state_default_hover" marginLeft="sm" onClick={() => modal.onClose()}>
                            Cancel
                        </ButtonNative>
                    </FlexRow>
                }
            >
                <FlexColumn
                    width="100%"
                    hrAlign="space-between"
                    height="100%"
                >
                    <FlexColumn hrAlign="space-between" height="35%">
                        <Text
                            fontSize={style.font.h4}
                            textAlign="left" width="100%"
                        >Are you sure you want to delete this contract?</Text>
                    </FlexColumn>
                </FlexColumn>
            </ModalWindow>
        </>
    );
};

export default ContractDeleteModal;
