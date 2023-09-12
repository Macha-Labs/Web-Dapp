import CreatorModal from "@/components/studio/CreatorModal";
import useCreatorCreate from "@/hooks/studio/useCreatorCreate";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Heading,
  Image,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import FlexColumn from "../flex/FlexColumn";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import GlobalIcons from "@/styles/GlobalIcons";

const NavLeft = (props: any) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const creatorModal = useDisclosure();
  const hookCreatorCreate = useCreatorCreate();
  const { colorMode, toggleColorMode } = useColorMode();

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
            background: `${
              colorMode == "light"
                ? style.nav.navLeftBgLight
                : style.nav.navLeftBg
            }`,
            borderRight: `${
              colorMode == "light"
                ? style.nav.border.light
                : style.nav.border.default
            }`,
          }}
        >
          <div className="body" style={{ padding: "10px 0px", height: "100%" }}>
            <FlexColumn hrAlign="space-between" vrAlign="center">
              <FlexColumn height="fit-content">
                <Link href="/">
                  <Image
                    src="../../assets/Logo.png"
                    height={"40px"}
                    alt="logo"
                    borderRadius={style.card.borderRadius.button}
                    onClick={() => {
                      router.push("/");
                    }}
                  />
                </Link>
              </FlexColumn>
              <Box width={"100%"} marginX={"auto"}>
                <FlexColumn height="fit-content" vrAlign="center">
                  {/* <Box
                    style={{ marginBottom: style.margin.sm }}
                    onClick={() => {
                      toggleColorMode();
                    }}
                  >
                    <FlexRow>
                      <IconImage
                        slug={
                          router.pathname === "/"
                            ? "icon-search"
                            : "icon-search"
                        }
                        size="md"
                      />
                    </FlexRow>
                  </Box> */}
                  <Link href="/" style={{ marginBottom: style.margin.sm }}>
                    <FlexRow>
                      {colorMode == "light" ? (
                        <Image
                          src="/assets/icons/brand-search.svg"
                          alt="brand-search"
                          width="2rem"
                        />
                      ) : (
                        <IconImage
                          slug={
                            router.pathname === "/"
                              ? "icon-search"
                              : "icon-search"
                          }
                          size="md"
                          style={{
                            className: ` ${
                              router.pathname === "/"
                                ? "state_active"
                                : "state_hover"
                            } `,
                          }}
                        />
                      )}
                    </FlexRow>
                  </Link>
                  <Box
                    cursor={"pointer"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    onClick={() => {
                      if (address) {
                        router.push(`/profile`);
                      } else {
                        if (openConnectModal) {
                          openConnectModal();
                        }
                        // router.push(`/u/${$address}`);
                      }
                    }}
                  >
                    <FlexRow>
                      {colorMode == "light" ? (
                        <Image
                          src="/assets/icons/brand-user.svg"
                          width="2rem"
                          alt="brand-user"
                        />
                      ) : (
                        <IconImage
                          slug={
                            "icon-user"
                            // router.pathname === `/u/${$address}`
                            //   ? "icon-user"
                            //   : "icon-user"
                          }
                          size="md"
                          style={{
                            className: `${
                              router.pathname === `/u/${address}`
                                ? "state_active "
                                : "state_hover"
                            } `,
                          }}
                        />
                      )}
                    </FlexRow>
                  </Box>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      toggleColorMode();
                    }}
                    marginTop="1rem"
                  >
                    <FlexRow>
                      <Image
                        alt="theme-change"
                        src={
                          colorMode == "light"
                            ? GlobalIcons["icon-dark-mode"]
                            : GlobalIcons["icon-light-mode"]
                        }
                        height="2.5rem"
                        width="2.5rem"
                      />
                    </FlexRow>
                  </Box>
                </FlexColumn>
              </Box>
            </FlexColumn>
          </div>
        </div>
        <CreatorModal
          modal={creatorModal}
          hookCreatorCreate={hookCreatorCreate}
        />
      </FlexRow>
    </>
  );
};
export default NavLeft;
