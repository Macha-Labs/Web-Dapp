import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Marquee({ body, speed }: any) {
  return (
    <Box
      marginTop={style.margin["xl"]}
      style={{
        display: "flex",
        // width: "1200px",
        gap: "1rem",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        mask: `linear-gradient(
          to right,
          hsl(0 0% 0% / 0),
          hsl(0 0% 0% / 1) 10%,
          hsl(0 0% 0% / 1) 90%,
          hsl(0 0% 0% / 0)
        )`,
        WebkitMask: `linear-gradient(
          to right,
          hsl(0 0% 0% / 0),
          hsl(0 0% 0% / 1) 10%,
          hsl(0 0% 0% / 1) 90%,
          hsl(0 0% 0% / 0)
        )`,
      }}
    >
      <motion.div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          // whiteSpace: "nowrap",
          minWidth: "100%",
          gap: "1rem",
        }}
        animate={{
          translateX: ["0%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 70,
          ease: "linear",
        }}
      >
        {body}
      </motion.div>
      <motion.div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          // whiteSpace: "nowrap",
          minWidth: "100%",
          gap: "1rem",
        }}
        animate={{
          translateX: ["0%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 70,
          ease: "linear",
        }}
      >
        {body}
      </motion.div>
    </Box>
  );
}

export default Marquee;
