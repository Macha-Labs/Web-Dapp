import React from "react";
import {
  Col,
  StyledIcon,
  Logo,
  Row,
  StyledNav,
} from "../../styles/StyledComponents";
import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import ModalPage from "../modal/ModalPage";
import IconImage from "../icons/IconImage";

const Nav = (props: any) => {
  const orgsDrawer = useDisclosure();
  const userDrawer = useDisclosure();

  const templateOrgs = () => {
    return <ModalPage></ModalPage>;
  };

  const templateNotifications = () => {
    return <></>;
  };

  return (
    <>
      <Row>
        <StyledNav>
          <div className="header m-b-0-5">
            <Col className="hr-center vr-center h-100">
              <IconImage path="Logo.png" size="42"/>
            </Col>
          </div>
          <div className="body">
            <Col className="hr-center vr-between h-100">
              <Col className="hr-center">
                <Link href="/chat">
                  <IconImage path="IconBrandChat.png" style={{className: "m-b-1"}} />
                </Link>
                <Link href="/user">
                  <IconImage path="IconBrandProfile.png" style={{className: "m-b-1"}} />
                </Link>
                <IconImage path="IconBrandDiscover.png" style={{className: "m-b-1"}} />
              </Col>

              <Col className="hr-center">
                <IconImage path="IconDarkBell.png" style={{className: "m-b-1"}} />
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
