import React from "react";
import styled from "styled-components";
import { Col, Icon, Logo, Row, StyledNav } from "../../styles/StyledComponents";
import ChatIcon from "../icons/IconChat";
import { useRef } from "react";
import HashIcon from "../icons/IconDarkUser";
import UserIcon from "../icons/IconDarkUser";
import NFTIcon from "../icons/IconDarkUser";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";

const Nav = (props: any) => {
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
        <StyledNav>
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
                  <HashIcon />
                </Icon>
                <Icon
                  className="state-1-2 scale m-b-1"
                  onClick={() => {
                    props.setNav("users");
                  }}
                >
                  <UserIcon />
                </Icon>
                <Icon
                  className="state-1-2 scale m-b-1"
                  onClick={() => {
                    props.setNav("nfts");
                  }}
                >
                  <NFTIcon />
                </Icon>
              </Col>

              <Col className="hr-center">
                {props.context?.currentAccount ? (
                  <>
                    <Link href="/chat">
                      <Icon className="state-2-3 m-b-0-5 scale">
                        <ChatIcon />
                      </Icon>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Col>
          </div>
        </StyledNav>
      </Row>
      {templateOrgs()}
    </>
  );
};

export default DashNav;
