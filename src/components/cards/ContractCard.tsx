import { Box, Text, Image, Flex, useColorMode } from "@chakra-ui/react";
import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import {
  UtcTimeStampConversion,
  truncateAddress,
  truncateString,
} from "@/helpers";
import { style } from "@/styles/StyledConstants";
import chains from "@/data/network";
import IconBase from "@/_ui/icons/IconsBase";
import { timeStampConversion } from "@/helpers";

type Props = {
  image?: string;
  heading: string;
  description: string;
  tags?: string[];
  width?: any;
  cardView?: string;
  onCardClick?: any;
  height?: any;
  address?: any;
  chainId?: any;
  createdAt?: any;
};

const ContractCard = ({
  image,
  heading,
  description,
  tags,
  onCardClick = (e?: any) => { },
  height,
  address,
  chainId,
  createdAt,
}: Props) => {

  const { colorMode } = useColorMode()

  return (
    <Box
      _hover={{
        transform: "scale(1.01,1.01)",
        border: "1px solid #197cec !important",
      }}
      style={{
        height: "25rem",
        // width: "25%",
        border: `${colorMode == "light" ? "1px solid #e2e2e2" : style.card.border.card}`,
        borderRadius: `${style.card.borderRadius.default}`,
        background: `${colorMode == "light" ? "#ffff" : "#030c1a"}`,
        padding: ` ${style.padding.md}`,
        display: "flex",
        flexDirection: "column",
        marginRight: ` ${style.margin["lg"]}`,
        marginBottom: ` ${style.margin["lg"]}`,
        cursor: `${style.card.cursor.default}`,
        justifyContent: "space-between",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: " transform ",
        transitionDuration: "600ms",
      }}
      onClick={() => {
        onCardClick();
      }}
    >
      {image && (
        <div
          style={{
            // width: "100%",
            marginRight: style.margin.sm,
            height: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: `${style.margin.xs}`,
            // paddingRight: `${style.padding.xs}`,
          }}
        >
          <Image
            //  display={flex}
            src={image}
            alt="meta-card-image"
            height={"4.5rem"}
            width={"4.5rem"}
            objectFit={"contain"}
            borderRadius={style.card.borderRadius.default}
            marginRight="0.5rem"
          />
          <div style={{ textAlign: "right" }}>
            <Text
              style={{
                background: "-webkit-linear-gradient(270deg, rgb(25, 124, 236),rgb(0, 74, 217))",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontWeight: `${style.fontWeight.dark}`,
              }}
              lineHeight="1rem"
              marginBottom={0}

            >
              Created on
            </Text>
            <Text
              color={colorMode == "light" ? "#3d3d3d" : ""}
              style={{ fontWeight: `${style.fontWeight.dark}`, fontSize: `${style.font.h7}` }}
              lineHeight="1rem"
            >
              {UtcTimeStampConversion(createdAt).date}
            </Text>
          </div>
        </div>
      )}

      <div
        style={{
          // width: "100%",
          height: "70%",
          paddingTop: `${style.padding.xxs}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Text color={colorMode == "light" ? "#3d3d3d" : ""} lineHeight="1.25rem" fontSize={"2xl"} fontWeight={600}>
          {truncateString(heading, 10)}
        </Text>
        <Text color={colorMode == "light" ? "#3d3d3d" : ""}
          lineHeight="1.5rem"
          style={{ height: "3rem", marginBottom: `${style.margin.sm}` }}
        >
          {truncateString(description, 100)}{" "}
        </Text>
        <FlexRow hrAlign="space-between">
          <Box
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <Text
              style={{
                background: "-webkit-linear-gradient(270deg, rgb(25, 124, 236),rgb(0, 74, 217))",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontWeight: `${style.fontWeight.dark}`,
                marginBottom: `0.8rem`,
              }}
              lineHeight="1rem"
            >
              Contract Address:
            </Text>
            <Text
              color={colorMode == "light" ? "#3d3d3d" : ""}
              style={{
                fontWeight: `${style.fontWeight.dark}`,
                marginBottom: "0.5rem",
                fontSize: `${style.font.h7}`,
              }}
              lineHeight="0.8rem"
            >
              {truncateAddress(address)}
            </Text>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              justifyContent: "flex-end",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  background: "-webkit-linear-gradient(270deg, rgb(25, 124, 236),rgb(0, 74, 217))",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  fontWeight: `${style.fontWeight.dark}`,
                  marginBottom: `1.2rem`,
                }}
                lineHeight="1rem"
              >
                Chain:
              </Text>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                color={colorMode == "light" ? "#3d3d3d" : ""}
                style={{
                  fontWeight: `${style.fontWeight.dark}`,
                  marginBottom: "0px",
                  marginTop: "-10px",
                  fontSize: `${style.font.h7}`,
                }}
                lineHeight="1rem"
              >
                {chains[chainId]?.chainName}
              </Text>
              <Box style={{ marginTop: "-10px", marginLeft: "0.25rem" }}>
                <IconBase slug={chains[chainId]?.chainImage} size="xs" />
              </Box>
            </Box>
          </Box>
        </FlexRow>

        <FlexRow
          height="fit-content"
          hrAlign="flex-start"
        //  width="100%"
        >
          {tags?.map((tag: string, index: number) => {
            return (
              <TagNative
                key={index}
                value={tag}
                variant="state_xmtp"
                size="sm"
                lineHeight="1.5"
              />
            );
          })}
        </FlexRow>
      </div>
    </Box>
  );
};

export default ContractCard;
