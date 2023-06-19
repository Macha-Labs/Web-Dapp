import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavTop from "@/_ui/nav/NavTop";
import React from "react";

export default function docs() {
  const renderBody = () => {
    return <></>;
  };
  return (
    <FlexWindow leftElem={<NavLeft />} rightElem={renderBody()}></FlexWindow>
  );
}
