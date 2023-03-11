import React from "react";
import {
  Col,
  StyledIcon,
  Logo,
  Row,
  StyledNav,
} from "../../styles/StyledComponents";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import ModalPage from "../modal/ModalPage";
import IconImage from "../icons/IconImage";
import { AuthContext } from "@/providers/AuthProvider";

const Nav = (props: any) => {
  const orgsDrawer = useDisclosure();
  const userDrawer = useDisclosure();
  const authContext = React.useContext(AuthContext);
  const [active, setActive] = React.useState(
    window.location.href.split("/")[3]
  );

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
                <Link href="chat/dm">
                  <IconImage path="Logo.png" size="42" />
                </Link>
              </Tooltip>
            </Col>
          </div>
          <div className="body">
            <Col className="hr-center vr-between h-100">
              <Col className="hr-center">
                <Link href="/chat">
                  <Tooltip label="Chat">
                    <IconImage
                      path="IconDarkHash.png"
                      style={{
                        className: `m-b-1 ${
                          active === "chat" ? "state_active state_hover scale" : ""
                        } `,
                      }}
                      onClick={() => setActive("chat")}
                    />
                  </Tooltip>
                </Link>
              </Col>

              <Col className="hr-center">
                <Link href="/chat/dm">
                  <IconImage
                    path="IconBrandChat.png"
                    style={{
                      className: `m-b-1 ${
                        active === "user" ? "state_active state_hover scale" : ""
                      } `,
                    }}
                    onClick={() => setActive("user")}
                  />
                </Link>
                <Link href="/user">
                  <IconImage
                    path="IconBrandProfile.png"
                    style={{
                      className: `m-b-1 ${
                        active === "user" ? "state_active state_hover scale" : ""
                      } `,
                    }}
                    onClick={() => setActive("user")}
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
