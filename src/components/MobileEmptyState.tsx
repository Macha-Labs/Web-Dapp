import { StyledCol } from "@/styles/StyledComponents";
import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function MobileEmptyState() {
  return (
    <StyledCol className="hr-center">
      <div
        style={{
          backgroundImage: `url("assets/blurEmptyState.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25px",
        }}
      >
        <Text
          align={"center"}
          as="b"
          style={{ paddingTop: "25px", paddingBottom: "50px" }}
        >
          Thanks For Visiting !
        </Text>
        {/* <LandingPage path="emptyStateIllustration.svg" /> */}
        <Text
          align={"center"}
          width="300px"
          marginTop={"25px"}
          as="b"
          color={"#246BFD"}
        >
          This link is currently only accessile on desktop.
        </Text>
      </div>
      <Text align={"center"} width="300px" marginTop={"25px"} as="b">
        Good news - our mobile app is in the works and will be available soon
      </Text>
      <Link href="https://twitter.com/intent/follow?screen_name=metaworklabs">
        <Button variant="" marginTop={"15px"}>
          Follow on Twitter
        </Button>
      </Link>
    </StyledCol>
  );
}
