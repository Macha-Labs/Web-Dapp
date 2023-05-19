import Image from "next/image";
import Link from "next/link";
import { style } from "../../styles/StyledConstants";
import ButtonMenu from "../buttons/ButtonMenu";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import NavTabs from "./NavTabs";

export default function Navigation() {
  const navOptions = [
    {
      href: "/studio/dashboard",
      value: "Dashboard",
    },
    {
      href: "/studio/explore",
      value: "Explore",
    },
    {
      href: "/studio/docs",
      value: "Docs",
    },
    {
      href: "/studio/settings",
      value: "Settings",
    },
  ];

  const walletOptions = [
    {
      value: "0xc85554A...19a1e",
      img: "../assets/Avatar.svg",
      rightIcon: "icon-notification",
      onClick: () => {},
    },
    {
      value: "Switch Wallet",
      leftIcon: "icon-notification",
      onClick: () => {},
    },
    {
      value: "Disconnect Wallet",
      leftIcon: "icon-notification",
      onClick: () => {},
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
            <IconImage slug="icon-notification" />
            <ButtonMenu
              avatar="../assets/Avatar.svg"
              text="0xc85554A...19a1e"
              icon={{
                slug: "icon-chevron-down",
                style: ` marginLeft: "10px" `,
              }}
              options={walletOptions}
            />
          </FlexRow>
        </FlexRow>
      </nav>
    </>
  );
}
