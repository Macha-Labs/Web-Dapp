import React from "react";
import { Col, Icon, Logo, Row, StyledNav } from "../../styles/StyledComponents";
import ChatIcon from "../icons/IconChat";
import HashIcon from "../icons/IconDarkUser";
import UserIcon from "../icons/IconDarkUser";
import NFTIcon from "../icons/IconDarkUser";
import {useDisclosure,} from "@chakra-ui/react";
import Link from "next/link";
import ModalPage from "../modal/ModalPage";

const Nav = (props: any) => {
  const orgsDrawer = useDisclosure();
  const userDrawer = useDisclosure();

  const templateOrgs = () => {
    return (
      <ModalPage></ModalPage>
    );
  };


  const templateNotifications = () => {
    return <></>
  }

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
                  onClick={orgsDrawer.onOpen}
                >
                  <HashIcon />
                </Icon>
                <Icon
                  className="state-1-2 scale m-b-1"
                  onClick={userDrawer.onOpen}
                >
                  <UserIcon />
                </Icon>
                <Icon
                  className="state-1-2 scale m-b-1"
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

export default Nav;
