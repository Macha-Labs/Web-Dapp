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
          <div className="header">
            <Col className="hr-center vr-center h-100">
              <StyledIcon onClick={orgsDrawer.onOpen}>
                {/* <Logo
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
                /> */}
              </StyledIcon>
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
                {props.context?.currentAccount ? (
                  <>
                    <Link href="/chat">
                      <StyledIcon className="state-2-3 m-b-0-5 scale">
                        <IconImage path="IconBrandChat.png" style={{className: "m-b-1"}} />
                      </StyledIcon>
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
