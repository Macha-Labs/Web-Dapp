import { style } from "@/styles/StyledConstants";
import { Image, Tooltip, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import FlexColumn from "../flex/FlexColumn";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import useAuthStore from "@/store/useAuthStore";
import useCreatorCreate from "@/hooks/studio/useCreatorCreate";
import CreatorModal from "@/components/studio/CreatorModal";

const NavLeft = (props: any) => {
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

            background: `${style.nav.bg.default}`,
            borderRight: `${style.nav.border.default}`,
          }}
        >
          <div className="body" style={{ padding: "10px 0px", height: "100%" }}>
            <FlexColumn hrAlign="space-between" vrAlign="center">
              <FlexColumn height="fit-content">
                <Link href="/">
                  <IconImage
                    slug={
                      router.pathname === "/" ? "icon-search" : "icon-search"
                    }
                    size="md"
                    style={{
                      className: `m-b-1 ${router.pathname === "/" ? "state_active" : "state_hover"
                        } `,
                    }}
                  />
                </Link>
                <Link href="/explore">
                  <IconImage
                    slug={
                      router.pathname === "/explore"
                        ? "icon-compass"
                        : "icon-compass-outline"
                    }
                    size="md"
                    style={{
                      className: `m-b-1 ${router.pathname === "/explore"
                        ? "state_active"
                        : "state_hover"
                        } `,
                    }}
                  />
                </Link>
                <Link href="/feed">
                  <IconImage
                    slug={
                      router.pathname === "/feed"
                        ? "icon-posts"
                        : "icon-posts-outline"
                    }
                    size="md"
                    style={{
                      className: `m-b-1 ${router.pathname === "/feed"
                        ? "state_active"
                        : "state_hover"
                        } `,
                    }}
                  />
                </Link>
              </FlexColumn>
              <FlexColumn height="fit-content">
                <IconImage
                  onClick={() => {
                    creatorModal.onOpen()
                  }}
                  slug={
                    router.pathname === "/create" ? "icon-add" : "icon-add"
                  }
                  size="md"
                  style={{
                    className: `m-b-1 ${router.pathname === "/create"
                      ? "state_active "
                      : "state_hover"
                      } `,
                  }}
                />
                <Image
                  src="../../assets/Logo.png"
                  height={"40px"}
                  borderRadius={"8px"}
                  alt="logo"
                />
              </FlexColumn>
            </FlexColumn>
          </div>
        </div>
        <CreatorModal modal={creatorModal} hookCreatorCreate={hookCreatorCreate} />
      </FlexRow>
    </>
  );
};
export default NavLeft;
