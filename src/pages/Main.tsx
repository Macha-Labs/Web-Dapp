import Nav from "@/components/nav/Nav";
import { StyledWindow } from "@/styles/StyledComponents";
import React from "react";
import Chat from "./chat/Chat";

function Main() {
  return (
    <StyledWindow>
      <div className="left"><Nav /></div>
      <div className="right"><Chat /></div>
    </StyledWindow>
  );
}

export default Main;
