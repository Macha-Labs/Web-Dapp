import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text } from "@chakra-ui/react";
import FlexRow from "@/_ui/flex/FlexRow";
import GlobalIcons from "@/styles/GlobalIcons";
import ButtonNative from "@/_ui/buttons/ButtonNative";

const MotionBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const router = useRouter();
  return (
    <motion.div
      onMouseEnter={() => {
        console.log("in", isCloseHovered);
        if (isOpen) setIsCloseHovered(true);
      }}
      onMouseLeave={() => {
        console.log("out", isCloseHovered);
        setIsCloseHovered(false);
      }}
      onClick={() => {
        if (isOpen && isCloseHovered) {
          router.push("/studio");
        }
      }}
      initial={{ y: 0 }}
      animate={
        isOpen
          ? isCloseHovered
            ? {
                y: -10,
                right: 50,
                borderRadius: "20px",
                height: "50px",
                width: "150px",
              }
            : {
                y: -10,
                right: 50,
                borderRadius: "100%",
                height: "50px",
                width: "50px",
              }
          : {
              y: 0,
              borderRadius: `${style.card.borderRadius.default}`,
              height: "auto",
              width: "auto",
            }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: "10px",
        zIndex: "1000",
        background: `${style.nav.bg.meta}`,
        borderRadius: `${style.card.borderRadius.default}`,
        border: `${style.card.border.default}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // width: "50%",
      }}
    >
      {isOpen && !isCloseHovered ? (
        <Box>
          <Image src={GlobalIcons["icon-info"]} />
        </Box>
      ) : isOpen && isCloseHovered ? (
        <Box overflow={"hidden"} cursor="pointer">
          <Text marginBottom={"0px"} width="6.5rem" fontSize={`${style.font.h6}`}>
            Explore studio
          </Text>
        </Box>
      ) : (
        <Box
          style={{
            padding: `${style.padding.xs}`,
            position: "relative",
          }}
        >
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Box
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                zIndex: "100",
                border: `${style.card.border.meta}`,
                borderRadius: "100px",
                padding: "1px",
                background: `${style.nav.bg.meta}`,
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(true)}
            >
              <Image src={GlobalIcons["icon-close"]} alt="" height="1rem" />
            </Box>
            <Text
              fontSize={style.font.h6}
              mb={0}
              marginRight={style.margin.sm}
              fontWeight={style.fontWeight.dark}
            >
              Explore Macha Studio our latest Innovation for developers
            </Text>
            <ButtonNative
              variant="state_brand"
              paddingLeft="xs"
              paddingRight="xs"
              paddingTop="xs"
              paddingBottom="xs"
              onClick={() => router.push("/studio")}
              height="1.5rem"
              textFontSize="h7"
            >
              Explore
            </ButtonNative>
          </FlexRow>
        </Box>
      )}
    </motion.div>
  );
};

export default MotionBar;
