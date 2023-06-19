import React from "react";
import Tabs from "../../_ui/tabs/Tabs";

const NavTabs = () => {
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

  return <Tabs options={navOptions} />;
};

export default NavTabs;
