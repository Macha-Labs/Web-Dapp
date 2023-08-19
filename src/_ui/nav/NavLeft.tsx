import { style } from "@/styles/StyledConstants";
import { Image, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import FlexColumn from "../flex/FlexColumn";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import useAuthStore from "@/store/useAuthStore";

const NavLeft = (props: any) => {
  const router = useRouter();

  return (
    <>
      <FlexRow>
        <div
          style={{
            width: `${style.nav.widthLeft}`,
            zIndex: 100000,
            height: "100vh",
            position: "fixed",
            left: "0",
            padding: "10px 5px",

            background: `${style.nav.bg.default}`,
            borderRight: `${style.nav.border.default}`,
          }}
        >
          <div className="body" style={{ padding: "10px 0px", height: "100%" }}>
            <FlexColumn hrAlign="space-between" vrAlign="center">
              <FlexColumn height="fit-content">
                <Link href="/home">
                  <IconImage
                    slug={router.pathname === "/home" ? "icon-home" : "icon-home-outline"}
                    size="md"
                    style={{
                      className: `m-b-1 ${
                        router.pathname === "/home" ? "state_active" : "state_hover"
                      } `,
                    }}
                  />
                </Link>
                <Link href="/">
                  <IconImage
                    slug={router.pathname === "/" ? "icon-posts" : "icon-posts-outline"}
                    size="md"
                    style={{
                      className: `m-b-1 ${
                        router.pathname === "/" ? "state_active" : "state_hover"
                      } `,
                    }}
                  />
                </Link>
                {/* <Link href="/feed">
                  <IconImage
                    slug="icon-posts"
                    size="lg"
                    style={{
                      className: `m-b-1 ${
                        router.pathname === "/studio/explore"
                          ? "state_active"
                          : "state_hover"
                      } `,
                    }}
                  />
                </Link> */}
                <Link href="/explore">
                  <Tooltip label="Chat">
                    <IconImage
                      slug={router.pathname === "/explore" ? "icon-compass" : "icon-compass-outline"}
                      size="md"
                      style={{
                        className: `m-b-1 ${
                          router.pathname === "/explore"
                            ? "state_active "
                            : "state_hover"
                        } `,
                      }}
                    />
                  </Tooltip>
                </Link>
              </FlexColumn>
              <Image
                src="../../assets/Logo.png"
                height={"40px"}
                borderRadius={"8px"}
                alt="logo"
              />
            </FlexColumn>
          </div>
        </div>
      </FlexRow>
    </>
  );
};
export default NavLeft;
