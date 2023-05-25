import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Nav from "@/_ui/nav/Nav";
import Navigation from "@/_ui/nav/Navigation";
import React from "react";

export default function docs() {
  const renderBody = () => {
    return <></>;
  };
  return <FlexWindow leftElem={<Nav />} rightElem={renderBody()}></FlexWindow>;
}
