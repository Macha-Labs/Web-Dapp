import { carouselData } from "@/data/studio/constant";
import { Box, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";

const ImageCarousal = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box overflow="hidden">
      <FlexRow vrAlign="center" hrAlign="center">
        <IconImage
          slug="icon-chevron"
          onClick={handlePrev}
          size="sm"
          style={{ marginRight: "md" }}
        />
        <Box
          display="flex"
          width="100%"
          transition="transform 0.3s ease-in-out"
          transform={`translateX(-${activeIndex * 100}%)`}
        >
          {carouselData.map((card, index) => (
            <Box
              key={index}
              flex="0 0 100%"
              opacity={activeIndex === index ? 1 : 0}
              transform={`translateX(${(index - activeIndex) * 100}%)`}
            >
              <Image src={card.coverImage} alt="Cover Image" w="100%" />
              {/* <FlexRow>
                <Image
                  src={card.profileImage}
                  alt="Profile Image"
                  w="50px"
                  // borderRadius="full"
                  mr={2}
                />
                <Text fontWeight="bold" className="m-b-0">
                  {card.title}
                </Text>
              </FlexRow>
              <Text mt={2}>{card.description}</Text> */}
            </Box>
          ))}
        </Box>
        <IconImage
          slug="icon-chevron-next"
          onClick={handleNext}
          size="sm"
          style={{ marginLeft: "md" }}
        />
      </FlexRow>
      {/* <FlexRow hrAlign="center" vrAlign="center" width="100%">
        {carouselData.map((_, index) => (
          <Box
            key={index}
            w="4px"
            h="4px"
            borderRadius="full"
            bg={activeIndex === index ? "gray.400" : "gray.800"}
            mx={2}
            onClick={() => setActiveIndex(index)}
            cursor="pointer"
          />
        ))}
      </FlexRow> */}
    </Box>
  );
};

export default ImageCarousal;
