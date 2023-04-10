import React from "react";
import {
  Col,
  Row,
  StyledNav,
} from "../../styles/StyledComponents";
import { Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import ModalPage from "../modal/ModalPage";
import IconImage from "../icons/IconImage";
import { useRouter } from "next/router";

const Nav = (props: any) => {
  const router = useRouter();

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
              <Tooltip label="Metawork">
                <IconImage path="Logo.png" size="xl" />
              </Tooltip>
            </Col>
          </div>
          <div className="body">
            <Col className="hr-center vr-between h-100">
              <Col className="hr-center">
                <Link href="/">
                  <Tooltip label="Chat">
                    <IconImage
                      path="IconDarkHash.png"
                      size="md"
                      style={{
                        className: `m-b-1 ${
                          router.pathname === "/"
                            ? "state_active state_hover scale"
                            : ""
                        } `,
                      }}
                    />
                  </Tooltip>
                </Link>
              </Col>

              <Col className="hr-center">
                <Link href="/chat/dm">
                  <IconImage
                    path="IconBrandChat.png"
                    size="md"
                    style={{
                      className: `m-b-1 ${
                        router.pathname === "/chat/dm"
                          ? "state_active state_hover scale"
                          : ""
                      } `,
                    }}
                  />
                </Link>
                <Link href="/user">
                  <IconImage
                    path="IconBrandProfile.png"
                    size="md"
                    style={{
                      className: `m-b-1 ${
                        router.pathname === "/user"
                          ? "state_active state_hover scale"
                          : ""
                      } `,
                    }}
                  />
                </Link>
                <IconImage
                  path="IconDarkBell.png"
                  style={{ className: "m-b-1" }}
                />
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
