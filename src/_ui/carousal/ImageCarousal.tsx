import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import IconImage from "../icons/IconImage";
import FlexRow from "../flex/FlexRow";

const carouselData = [
  {
    id: 0,
    coverImage:
      "https://media.sproutsocial.com/uploads/2021/05/twitter-profile-photo-example.png",
    profileImage:
      "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black.png",
    title: "Card 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 1,
    coverImage:
      "https://media.sproutsocial.com/uploads/2021/05/twitter-header-photo-1.png",
    profileImage: "path-to-profile-image-2.jpg",
    title: "Card 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    coverImage:
      "https://media.sproutsocial.com/uploads/2021/05/twitter-header-photo-1.png",
    profileImage: "path-to-profile-image-2.jpg",
    title: "Card 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    coverImage:
      "https://media.sproutsocial.com/uploads/2021/05/twitter-header-photo-1.png",
    profileImage: "path-to-profile-image-2.jpg",
    title: "Card 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
              <FlexRow>
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
              <Text mt={2}>{card.description}</Text>
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
      <FlexRow hrAlign="center" vrAlign="center" width="100%">
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
      </FlexRow>
    </Box>
  );
};

export default CardCarousel;
