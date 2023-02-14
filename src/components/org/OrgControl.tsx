import { ChevronDownIcon } from "@chakra-ui/icons";
import { Icon, Logo, Row } from  "@/styles/StyledComponents";
import { Modal, ModalBody, ModalContent, ModalOverlay, Heading, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const OrgControl = (props) => {
    const settingModal = useDisclosure();
    const [org, setOrg] = useState<any>();

    useEffect(() => {
        if (props.org){
            setOrg(props.org)
        }
    }, [props.org])

    const templateSetting = () => {
        return (
            <>
            <Modal onClose={settingModal.onClose} isOpen={settingModal.isOpen} size='full'>
                <ModalOverlay />
                <ModalContent className="hidescroll">
                    <ModalBody className="hidescroll" style={{ padding: "0px" }}>
                        {/* <OrgSetting org={org} setOrg={setOrg} modal={settingModal} /> */}
                    </ModalBody>
                </ModalContent>
            </Modal>
            </>
        )
    }

    return (
        <>
            <Row className="header vr-center">
                <Row className="brand vr-center">
                    <Logo src={"https://meta-org-logos.s3.ap-south-1.amazonaws.com/" + props.org?._id + ".png"} onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "https://0xmetame-assets.s3.ap-south-1.amazonaws.com/default-user.png"; }} className="sm m-r-0-5" />
                    <Heading as="h4" size="sm">Portal</Heading>
                </Row>
                {
                    (props.context?.user?._id == props?.org?.owner)
                    ?
                    (
                        <Icon className="state_1_2" onClick={settingModal.onOpen}><ChevronDownIcon /></Icon>
                    )
                    :
                    (
                        <></>
                    )
                }
            
            </Row>
        {templateSetting()}
        </>
    )
}

export default OrgControl;