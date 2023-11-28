"use client";
import { useRouter } from "next/router";

import { Avatar, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

export default function LensEmbed() {
  const router = useRouter();
  // const { toggleColorMode } = useColorMode();
  // console.log("theme is", router.query.theme);

  // useEffect(() => {
  //   if (router.query.theme == "dark") {
  //     toggleColorMode();
  //   }
  // }, []);

  console.log("type id theme ", router.query.type, router.query.id);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `${
          router.query.theme == "light" ? "rgba(255,255,255,1)" : "#030c1a"
        }`,
      }}
    >
      <Box
        height={"95%"}
        width={"50%"}
        sx={{
          "@media screen and (max-width: 950px)": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <iframe
          src={`/embed?id=${router.query.id}&theme=${router.query.theme}&type=${router.query.type}`}
          height={"100%"}
          width={"100%"}
          style={{ borderRadius: "0px" }}
        />
      </Box>
    </div>
  );
}
