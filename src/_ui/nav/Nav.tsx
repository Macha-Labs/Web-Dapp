import React from "react";
import { StyledRow, StyledNav } from "../../styles/StyledComponents";
import { Image, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import ModalPage from "../modal/ModalPage";
import IconImage from "../icons/IconImage";
import { useRouter } from "next/router";
import FlexRow from "../flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import FlexColumn from "../flex/FlexColumn";

const Nav = (props: any) => {
  const router = useRouter();

  return (
    <>
      <FlexRow>
        <div
          style={{
            width: `${style.nav.width}`,
            height: "100vh",
            position: "fixed",
            left: "0",
            padding: "10px 5px",
            background: `${style.nav.bg.default}`,
            borderRight: `${style.nav.border.default}`,
          }}
        >
          <div
            className="header m-b-0-5"
            style={{
              height: " 55px",
              padding: "0px",
            }}
          >
            <FlexColumn className="hr-center vr-center h-100">
              <Tooltip label="Metawork">
                <Image src="/assets/Logo.png" height={"40px"} />
              </Tooltip>
            </FlexColumn>
          </div>
          <div
            className="body"
            style={{ padding: "10px 0px", height: " calc(100% - 55px)" }}
          >
            <FlexColumn hrAlign="space-between" vrAlign="center">
              <FlexColumn height="fit-content">
                <Link href="/">
                  <Tooltip label="Chat">
                    <IconImage
                      slug="icon-chat"
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
                <Link href="/">
                  <Tooltip label="Chat">
                    <IconImage
                      slug="icon-notification"
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
              </FlexColumn>

              <FlexColumn height="fit-content">
                <Link href="/chat/dm">
                  <IconImage
                    slug="icon-compass"
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
                <IconImage slug="icon-wallet" style={{ className: "m-b-1" }} />
              </FlexColumn>
            </FlexColumn>
          </div>
        </div>
      </FlexRow>
    </>
  );
};
export default Nav;
