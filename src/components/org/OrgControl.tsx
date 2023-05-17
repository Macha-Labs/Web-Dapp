import { ChevronDownIcon } from "@chakra-ui/icons";
import { StyledIcon, Logo, StyledRow } from "@/styles/StyledComponents";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalPage from "../modal/ModalPage";

const OrgControl = (props:any) => {
  const settingModal = useDisclosure();
  const [org, setOrg] = useState<any>();

  useEffect(() => {
    if (props.org) {
      setOrg(props.org);
    }
  }, [props.org]);

  const templateSetting = () => {
    return (
      <>
        <ModalPage event={settingModal}></ModalPage>
      </>
    );
  };

  return (
    <>
      <StyledRow className="w-100 vr-center">
        {/* <Logo
          src={
            "https://meta-org-logos.s3.ap-south-1.amazonaws.com/" +
            props.org?._id +
            ".png"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://0xmetame-assets.s3.ap-south-1.amazonaws.com/default-user.png";
          }}
          className="sm m-r-0-5"
        /> */}
        <Heading as="h4" size="sm">
          MetaWork
        </Heading>
      </StyledRow>
      {props.context?.user?._id == props?.org?.owner ? (
        <StyledIcon className="state_1_2" onClick={settingModal.onOpen}>
          <ChevronDownIcon />
        </StyledIcon>
      ) : (
        <></>
      )}
      {templateSetting()}
    </>
  );
};

export default OrgControl;
