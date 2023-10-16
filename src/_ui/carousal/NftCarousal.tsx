import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import FlexRow from "../flex/FlexRow";
import MCard from "@/_sdk/MCard";
import IconImage from "../icons/IconImage";
import { useRouter } from "next/router";
import { style } from "@/styles/StyledConstants";

type Props = {
  isLoading?: any;
  results?: any;
  //   router?: any;
  next?: any;
};
const NftCarousal = ({ isLoading, results, next }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? results.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === results.length - 1 ? 0 : prevIndex + 1
    );
  };
  const router = useRouter();
  return (
    <Box
      overflow="hidden"
      display="flex"
      justifyContent="center"
    >
      <FlexRow vrAlign="center" hrAlign="center" width="40%">
        <IconImage
          slug="icon-chevron"
          onClick={handlePrev}
          size="sm"
          style={{ marginRight: "md" }}
        />
        <Box
          display="flex"
          width="35%"
          transition="transform 0.3s ease-in-out"
          transform={`translateX(-${activeIndex * 100}%)`}
        >
          {results?.map((item: any, index: any) => {
            return (
              <Box
                key={index}
                display="flex"
                flex="0 0 100%"
                opacity={activeIndex === index ? 1 : 0}
                transform={`translateX(${(index - activeIndex) * 100}%)`}
              >
                <FlexRow>
                  <MCard
                    music={results[
                      index
                    ]?.meta?.data?.modified?.meta_audio?.substr(
                      5,
                      results[index]?.meta?.data?.modified?.meta_audio.length -
                        5
                    )}
                    title={results[index]?.meta?.data?.modified?.meta_title}
                    key={index}
                    image={results[index]?.meta?.data?.modified?.meta_image}
                    slug={results[index]?.meta_schema?.name}
                    description={
                      results[index]?.meta?.data?.modified?.meta_description
                    }
                    onClick={() => {
                      router.push(`/search/meta/${results[index]?._id}`);
                    }}
                    cardHeight="500px"
                  />

                  {results?.length > 1 && index < results?.length - 2 && (
                    <MCard
                      music={results[
                        index + 1
                      ]?.meta?.data?.modified?.meta_audio?.substr(
                        5,
                        results[index + 1]?.meta?.data?.modified?.meta_audio
                          .length - 5
                      )}
                      title={
                        results[index + 1]?.meta?.data?.modified?.meta_title
                      }
                      key={index}
                      image={
                        results[index + 1]?.meta?.data?.modified?.meta_image
                      }
                      slug={results[index + 1]?.meta_schema?.name}
                      description={
                        results[index + 1]?.meta?.data?.modified
                          ?.meta_description
                      }
                      onClick={() => {
                        router.push(`/search/meta/${results[index + 1]._id}`);
                      }}
                      cardHeight="500px"
                    />
                  )}

                  {results?.length > 2 && index < results?.length - 3 && (
                    <MCard
                      music={results[
                        index + 2
                      ]?.meta?.data?.modified?.meta_audio?.substr(
                        5,
                        results[index + 2]?.meta?.data?.modified?.meta_audio
                          .length - 5
                      )}
                      title={
                        results[index + 2]?.meta?.data?.modified?.meta_title
                      }
                      key={index}
                      image={
                        results[index + 2]?.meta?.data?.modified?.meta_image
                      }
                      slug={results[index + 2]?.meta_schema?.name}
                      description={
                        results[index + 2]?.meta?.data?.modified
                          ?.meta_description
                      }
                      onClick={() => {
                        router.push(`/search/meta/${results[index + 2]?._id}`);
                      }}
                      cardHeight="500px"
                    />
                  )}
                </FlexRow>
              </Box>
            );
          })}
        </Box>
        <IconImage
          slug="icon-chevron-next"
          onClick={handleNext}
          size="sm"
          style={{ marginLeft: "md" }}
        />
      </FlexRow>
    </Box>
  );
};
export default NftCarousal;
