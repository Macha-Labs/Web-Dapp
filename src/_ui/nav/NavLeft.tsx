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
                        router.pathname === `/` ? (
                          <Image
                            width="2rem"
                            src="/assets/icons/brand-search.svg"
                            alt="brand-search"
                          />
                        ) : (
                          <Image
                            width="2rem"
                            src="/assets/icons/search-outline.svg"
                            alt="search-outline"
                          />
                        )
                      ) : router.pathname === `/` ? (
                        <Image
                          width="2rem"
                          src="/assets/icons/base-blue-search.svg"
                          alt="icon-user"
                        />
                      ) : (
                        <Image
                          width="2rem"
                          src="/assets/icons/Dark_icons/dark-search.svg"
                          alt="icon-dark-user"
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
                        router.pathname === `/profile` ? (
                          <Image
                            width="2rem"
                            src="/assets/icons/brand-user.svg"
                            alt="brand-user"
                          />
                        ) : (
                          <Image
                            width="2rem"
                            src="/assets/icons/user-outline.svg"
                            alt="user-outline"
                          />
                        )
                      ) : router.pathname === `/profile` ? (
                        <Image
                          width="2rem"
                          src="/assets/icons/Base_blue_icons/base-blue-user.svg"
                          alt="icon-user"
                        />
                      ) : (
                        <Image
                          width="2rem"
                          src="/assets/icons/Dark_icons/dark-user.svg"
                          alt="icon-dark-user"
                        />
                      )}
                    </FlexRow>
                    {/* <FlexRow>
                      <IconImage
                        slug={
                          colorMode == "light"
                            ? router.pathname === `/profile`
                              ? "icon-brand-user"
                              : "icon-user-outline"
                            : router.pathname === `/profile`
                            ? "icon-user"
                            : "icon-dark-user"
                        }
                        size="md"
                      />
                    </FlexRow> */}
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
