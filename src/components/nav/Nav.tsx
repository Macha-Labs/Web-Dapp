import styled from "styled-components";
import { Col, Icon, Logo, Row } from "style";
import ChatIcon from "components/Icon/ChatIcon";
import { Link } from "react-router-dom";
import { useRef } from "react";
import HashIcon from "components/Icon/HashIcon";
import UserIcon from "components/Icon/UserIcon";
import NFTIcon from "components/Icon/NFTIcon";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Nav } from "style/base";

const DashNav = (props) => {
  const orgsDrawer = useDisclosure();

  const templateOrgs = () => {
    return (
      <>
        <Modal
          onClose={orgsDrawer.onClose}
          isOpen={orgsDrawer.isOpen}
          size="full"
        >
          <ModalOverlay />
          <ModalContent className="hidescroll">
            <ModalCloseButton />
            <ModalBody
              className="hidescroll"
              style={{ padding: "0px" }}
            ></ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Row>
        <Nav>
          <div className="header">
            <Col className="hr-center vr-center h-100">
              <Icon onClick={orgsDrawer.onOpen}>
                <Logo
                  className="sm"
                  src={
                    "https://meta-org-logos.s3.ap-south-1.amazonaws.com/" +
                    "6246c7045cc31c36781d668e" +
                    ".png"
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://0xmetame-assets.s3.ap-south-1.amazonaws.com/default-user.png";
                  }}
                />
              </Icon>
            </Col>
          </div>
          <div className="body">
            <Col className="hr-center vr-between h-100">
              <Col className="hr-center">
                <Icon
                  className="state-1-2 scale m-b-1"
                  onClick={() => {
                    props.setNav("channels");
                  }}
                >
                  <HashIcon width="25" fill="#e8e8e8" />
                </Icon>
                <Icon
                  className="state-1-2 scale m-b-1"
                  onClick={() => {
                    props.setNav("users");
                  }}
                >
                  <UserIcon width="25" height="25" fill="#e8e8e8" />
                </Icon>
                <Icon
                  className="state-1-2 scale m-b-1"
                  onClick={() => {
                    props.setNav("nfts");
                  }}
                >
                  <NFTIcon width="25" height="25" fill="#e8e8e8" />
                </Icon>
              </Col>

              <Col className="hr-center">
                {props.context?.currentAccount ? (
                  <>
                    <Link to="/chat">
                      <Icon className="state-2-3 m-b-0-5 scale">
                        <ChatIcon width="35" height="35" fill="#e8e8e8" />
                      </Icon>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Col>
          </div>
        </Nav>
      </Row>
      {templateOrgs()}
    </>
  );
};

export default DashNav;
