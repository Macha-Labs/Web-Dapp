import FlexRow from "@/_ui/flex/FlexRow";
import PostCard from "../cards/PostCard";
import Loader from "@/_ui/loader/Loader";

type Props = {
  results?: any;
  router?: any;
  isLoading?: any;
};

const SearchCol = ({ results, router, isLoading }: Props) => {
  return (
    <>
      {isLoading && (
        <FlexRow height="200px" >
          <Loader size="lg" />
        </FlexRow>
      )}
      {!isLoading &&
        results &&
        results?.map((item: any, index: any) => (
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
    </>
  );
};
export default SearchCol;
