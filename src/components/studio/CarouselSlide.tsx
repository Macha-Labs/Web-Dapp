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
        background: `url(${bgGrid})`,
        backdropFilter: "",
        borderRadius: `${style.card.borderRadius.default}`,
        backgroundSize: "90%",
        height: `28rem`,
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: `url(${bgBlur})`,
          height: "100%",
          backgroundSize: "130% 160%",
          backgroundPosition: "50% 60%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box width="50%">
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Box
            // _hover={{
            //     transform: "scale(1.1,1.1)",
            //     transition: "all 0.2s cubic-bezier(0.64, 0.04, 0.35, 1)"
            // }}
            >
              <Image
                borderRadius="full"
                src={avatarImage}
                height="9rem"
                alt="avatarImage"
              />
            </Box>
            <Box width="90%" textAlign="left" marginLeft={style.margin.lg}>
              <Heading
                fontSize={"2.2rem"}
                p={0}
                // lineHeight={style.font.h1}
                lineHeight={"2.5rem"}
                // mb={style.margin.lg}
                letterSpacing={1}
              >
                {title}
              </Heading>
              <Text
                fontSize={style.font.h7}
                mb={0}
                fontWeight={style.fontWeight.light}
                letterSpacing={1}
              >
                {description}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            marginTop={style.margin.md}
            width="70%"
            justifyContent={"flex-start"}
          >
            <ButtonNative
              size="lg"
              variant="state_brand"
              backgroundColorHover="#A0CDFF"
              border="1px solid #fff"
              marginTop="xs"
              textFontSize="h4"
              paddingBottom="sm"
              paddingTop="sm"
              paddingLeft="sm"
              paddingRight="sm"
              onClick={onClick ? onClick : () => {}}
              text={buttonText ? buttonText : "View Contract Now"}
              borderColorWhite={false}
            />
          </Box>
        </Box>
        <Box
          height="100%"
          width="80%"
          style={{
            //  marginRight:`${style.margin.md}`,
            marginRight: "-1rem",
            marginTop: "9rem",
          }}
          _hover={{
            transform: "scale(1.05,1.05)",
            transition: "all 0.2s cubic-bezier(0.64, 0.04, 0.35, 1)",
          }}
        >
          <Image src={bannerImage} height="100%" alt="bannerImage" />
        </Box>
      </Box>
    </Box>
  );
};
export default CarouselSlide;
