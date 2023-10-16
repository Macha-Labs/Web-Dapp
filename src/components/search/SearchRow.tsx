import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import { Grid, GridItem } from "@chakra-ui/react";
import EmptyCard from "../cards/EmptyCard";

type Props = {
  isLoading?: any;
  results?: any;
  router?: any;
  next?: any;
};

const SearchRow = ({ isLoading, results, router, next }: Props) => {
  return (
    <FlexRow flexWrap={"wrap"} hrAlign="flex-start" marginBottom={"lg"}>
      {!isLoading && !results?.length && <EmptyCard />}

      {results?.length > 0 && (
        <FlexColumn marginBottom={"lg"}>
          <Grid
            templateColumns="repeat(3,1fr)"
            gap="10px"
            width="100%"
            marginBottom={style.margin.md}
          >
            {results?.map((item: any, index: any) => {
              return (
                <GridItem key={index} colSpan={1}>
                  {/* <Box bg="white" border="1px solid #000000">adsa</Box> */}
                  <MCard
                    music={item?.meta?.data?.modified?.meta_audio?.substr(
                      5,
                      item?.meta?.data?.modified?.meta_audio.length - 5
                    )}
                    title={item?.meta?.data?.modified?.meta_title}
                    key={index}
                    image={item?.meta?.data?.modified?.meta_image}
                    slug={item?.meta_schema?.name}
                    description={item?.meta?.data?.modified?.meta_description}
                    onClick={() => {
                      router.push(`/search/meta/${item?._id}`);
                    }}
                    cardHeight="500px"
                  />
                </GridItem>
              );
            })}
          </Grid>
          {!isLoading && (
            <ButtonNative
              text="Display More Results"
              variant="state_empty_brand_to_solid_brand"
              size="xs"
              onClick={next}
            />
          )}
        </FlexColumn>
      )}
      {isLoading && (
        <>
          <Grid templateColumns="repeat(3,1fr)" gap="10px" width="100%">
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
          </Grid>
        </>
      )}
    </FlexRow>
  );
};

export default SearchRow;
