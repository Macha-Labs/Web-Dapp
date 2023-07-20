import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import { style } from "@/styles/StyledConstants";
import { Text } from "@chakra-ui/react";
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
                        <IconImage slug="icon-close" onClick={() => modal.onClose()} />
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
