import FlexRow from "@/_ui/flex/FlexRow";
import PostCard from "../cards/PostCard";
import Loader from "@/_ui/loader/Loader";
import EmptyCard from "../cards/EmptyCard";
import FlexColumn from "@/_ui/flex/FlexColumn";
import ButtonNative from "@/_ui/buttons/ButtonNative";

type Props = {
  results?: any;
  router?: any;
  isLoading?: any;
  next?: any;
};

const SearchCol = ({ results, router, isLoading, next }: Props) => {
  return (
    <>
    <FlexColumn>
      {/* {!isLoading && !results?.length && <EmptyCard />} */}
      {results?.length > 0 && (
        <FlexColumn width="100%">
          {results?.map((item: any, index: any) => (
            <FlexRow key={index} hrAlign="flex-start" marginBottom="xs">
              <PostCard
                // title={item?.meta?.data?.modified?.meta_title}
                key={index}
                image={item?.meta?.data?.modified?.meta_image}
                metaName={item?.meta_schema?.name}
                slug={item?.meta?.slug}
                description={item?.meta?.data?.modified?.meta_description}
                title={item?.meta?.data?.ipfs?.contentURI?.name}
                owner_name={item?.metaOwner}
                onClick={() => {
                  router.push(`/search/meta/${item?._id}`);
                }}
              width="100%"
              />
            </FlexRow>
          ))}
         {!isLoading && <ButtonNative
            text="Display More Results"
            variant="state_empty_brand_to_solid_brand"
            size="xs"
            onClick={next}
            borderColor="#2448c7"
          />}
        </FlexColumn>
      )}
      {isLoading && (
        <FlexRow height="200px">
          <Loader size="lg" />
        </FlexRow>
      )}
      </FlexColumn>
    </>
  );
};
export default SearchCol;
