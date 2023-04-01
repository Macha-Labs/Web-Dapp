import { Col } from "@/styles/StyledComponents";
import { Button, Text } from "@chakra-ui/react";
import React from "react";

export default function MobileEmptyState() {
  return (
    <Col className="hr-center">
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
          style={{ paddingTop: "25px", paddingBottom:"50px"}}
        >
          Thanks For Visiting !
        </Text>
        <img src="assets/emptyStateIllustration.svg" />
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
      <Text align={"center"} width="300px" marginTop={"15px"} as="b">
        Good news - our mobile app is in the works and will be available soon
      </Text>
      <Button variant="" marginTop={"15px"}>
        Follow on Twitter
      </Button>
    </Col>
  );
}
