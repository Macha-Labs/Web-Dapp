import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavTop from "@/_ui/nav/NavTop";
import React from "react";

export default function Docs() {
  const renderBody = () => {
    return <></>;
  };
  return (
    <FlexWindow navLeft={<NavLeft />} rightElem={renderBody()}></FlexWindow>
  );
}
