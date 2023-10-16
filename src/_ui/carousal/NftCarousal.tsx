import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import MCard from "@/_sdk/MCard";
import IconImage from "../icons/IconImage";
import { useRouter } from "next/router";

type Props = {
  isLoading?: any;
  results?: any;
  next?: any;
};

const NftCarousal = ({ isLoading, results, next }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex - 3;
      return newIndex < 0
        ? results.length - (Math.abs(newIndex) % results.length)
        : newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex + 3;
      return newIndex > results.length ? 0 : newIndex;
    });
  };

  const router = useRouter();

  return (
    <Box width={"100%"}>
      <HStack spacing={4} alignItems="center">
        <IconImage slug="icon-chevron" onClick={handlePrev} size="sm" />
        <Box width="100%" display="flex" justifyContent={"space-evenly"}>
          {results &&
            results
              .slice(activeIndex, activeIndex + 3)
              .map((item: any, index: number) => (
                <Box key={index} width="30%">
                  <MCard
                    key={index}
                    music={item?.meta?.data?.modified?.meta_audio?.substr(5)}
                    title={item?.meta?.data?.modified?.meta_title}
                    image={item?.meta?.data?.modified?.meta_image}
                    slug={item?.meta_schema?.name}
                    description={item?.meta?.data?.modified?.meta_description}
                    onClick={() => {
                      router.push(`/search/meta/${item?._id}`);
                    }}
                    cardHeight="500px"
                  />
                </Box>
              ))}
        </Box>
        <IconImage
          slug="icon-chevron-next"
          onClick={handleNext}
          size="sm"
          style={{ marginLeft: "md" }}
        />
      </HStack>
    </Box>
  );
};

export default NftCarousal;
