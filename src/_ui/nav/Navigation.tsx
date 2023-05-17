import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { style } from "../../styles/StyledConstants";
import { StyledCol, StyledLi } from "@/styles/StyledComponents";
import { StyledRow } from "@/styles/StyledComponents";
import GlobalIcons from "../../styles/GlobalIcons";
import { IconSVG } from "../icons/IconSVG";
import FlexRow from "../flex/FlexRow";
import NavTabs from "./NavTabs";

export default function Navigation() {
  const navOptions = [
    {
      href: "/studio/dashboard",
      value: "Dashboard",
    },
    {
      href: "/studio/settings",
      value: "Settings",
    },
    {
      href: "/studio/explore",
      value: "Explore",
    },
    {
      href: "/studio/docs",
      value: "Docs & Support",
    },
  ];

  return (
    <>
      <nav
        className="fixed-top py-3"
        style={{
          background: `${style.input.bg.default}`,
          padding: `${style.nav.padding}`,
          width: `${style.nav.width}`,
          borderBottom: `${style.nav.border.default}`,
        }}
      >
        <FlexRow width="100%" hrAlign="space-between" vrAlign="center">
          <FlexRow vrAlign="center">
            <Link href="/">
              <Image
                className="headerLogo"
                src="/assets/Macha-logo-text.svg"
                alt="logo"
                width={170}
                height={62}
                // width={246}
              />
            </Link>

            <NavTabs options={navOptions} />
          </FlexRow>

          <FlexRow>
            <Button>Wallet</Button>
          </FlexRow>
        </FlexRow>
      </nav>
    </>
  );
}
