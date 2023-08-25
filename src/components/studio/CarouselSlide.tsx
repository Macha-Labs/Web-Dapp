import ButtonNative from "@/_ui/buttons/ButtonNative";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

type Props = {
  bgBlur: string;
  bannerImage: string;
  avatarImage: string;
  title: string;
  description: string;
  onClick?: any;
  buttonText?: string;
  bgGrid: string;
};

const CarouselSlide = ({
  bgGrid,
  bgBlur,
  bannerImage,
  avatarImage,
  title,
  description,
  onClick,
  buttonText,
}: Props) => {
  return (
    <Box
      style={{
        background: `${style.card.bg.default}`,
        boxShadow:
          " 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        // backgroundImage: `url(${bgGrid})`,
        backdropFilter: "",
        borderRadius: `${style.card.borderRadius.default}`,
        backgroundSize: "90%",
        height: `30rem`,
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${bgBlur})`,
          height: "100%",
          backgroundSize: "130% 160%",
          backgroundPosition: "0% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box width="50%">
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "80%",
            }}
          >
            <Box
            // _hover={{
            //     transform: "scale(1.1,1.1)",
            //     transition: "all 0.2s cubic-bezier(0.64, 0.04, 0.35, 1)"
            // }}
            >
              <Image src={avatarImage} height="9rem" />
            </Box>
            <Box width="70%" textAlign="left" marginLeft={style.margin.lg}>
              <Heading
                fontSize={"3rem"}
                p={0}
                lineHeight={style.font.h1}
                mb={style.margin.lg}
                letterSpacing={1}
              >
                {title}
              </Heading>
              <Text
                fontSize={style.font.h3}
                mb={0}
                fontWeight={style.fontWeight.light}
                letterSpacing={1}
              >
                {description}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          height="100%"
          width="45%"
          _hover={{
            transform: "scale(1.05,1.05)",
            transition: "all 0.2s cubic-bezier(0.64, 0.04, 0.35, 1)",
          }}
        >
          <Image src={bannerImage} height="100%" />
        </Box>
      </Box>
    </Box>
  );
};
export default CarouselSlide;
