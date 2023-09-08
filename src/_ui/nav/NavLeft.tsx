import CreatorModal from "@/components/studio/CreatorModal";
import useCreatorCreate from "@/hooks/studio/useCreatorCreate";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import FlexColumn from "../flex/FlexColumn";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";

const NavLeft = (props: any) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const creatorModal = useDisclosure();
  const hookCreatorCreate = useCreatorCreate();

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

            background: "#030c1a",
            borderRight: `${style.nav.border.default}`,
          }}
        >
          <div className="body" style={{ padding: "10px 0px", height: "100%" }}>
            <FlexColumn hrAlign="space-between" vrAlign="center">
              <FlexColumn height="fit-content">
                <Link href="/">
                  <Image
                    src="../../assets/MACHALogotext.svg"
                    height={"30px"}
                    marginTop={style.margin.sm}
                    // borderRadius={"8px"}
                    alt="logo"
                    onClick={() => {
                      router.push("/");
                    }}
                  />
                  {/* <IconImage
                    slug={
                      router.pathname === "/" ? "icon-search" : "icon-search"
                    }
                    size="md"
                    style={{
                      className: `m-b-1 ${
                        router.pathname === "/" ? "state_active" : "state_hover"
                      } `,
                    }}
                  /> */}
                </Link>
              </FlexColumn>
              <Box width={"75%"} marginX={"auto"}>
                <FlexColumn height="fit-content" vrAlign="flex-start">
                  <Link
                    href="/explore"
                    style={{ marginBottom: style.margin.sm }}
                  >
                    <FlexRow>
                      <IconImage
                        slug={
                          router.pathname === "/explore"
                            ? "icon-compass"
                            : "icon-compass-outline"
                        }
                        size="md"
                        style={{
                          className: ` ${
                            router.pathname === "/explore"
                              ? "state_active"
                              : "state_hover"
                          } `,
                        }}
                      />
                      <Heading
                        fontSize={style.font.h5}
                        marginBottom={"0px"}
                        marginLeft={style.margin.xxs}
                      >
                        Explore
                      </Heading>
                    </FlexRow>
                  </Link>

                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    onClick={() => {
                      if (address) {
                        router.push(`/u/${address}`);
                      } else {
                        if (openConnectModal) {
                          openConnectModal();
                        }
                        // router.push(`/u/${$address}`);
                      }
                    }}
                  >
                    <FlexRow>
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
                      <Heading
                        fontSize={style.font.h5}
                        marginBottom={"0px"}
                        marginLeft={style.margin.xxs}
                      >
                        Profile
                      </Heading>
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
