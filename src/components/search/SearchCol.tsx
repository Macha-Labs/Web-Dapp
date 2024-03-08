import ButtonNative from "@/_ui/buttons/ButtonNative";
import { CardAction } from "@/_ui/cards/CardAction";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import CardPost from "../../_ui/cards/CardPost";

type Props = {
  results?: any;
  router?: any; 
  isLoading?: any;
  next?: any;
  plugin: any;
};

const SearchCol = ({ results, router, isLoading, next, plugin }: Props) => {
  return (
    <>
      <FlexColumn>
        {results?.length > 0 && (
          <FlexColumn width="100%">
            {results?.map((item: any, index: any) => (
              <FlexRow key={index} hrAlign="flex-start" marginBottom="xs">
                {plugin?.format == 'post' && 
                <CardPost
                key={index}
                image={item?.metadata?.__typename == "ImageMetadataV3" ? item?.metadata?.asset?.image?.optimized?.uri : null}
                owner_image={item?.by?.metadata?.picture?.optimized?.uri}
                metaName={item?.meta_schema?.name}
                slug={item?.meta?.slug}
                description={item?.metadata?.content}
                title={`${item?.metadata?.appId} - ${item?.__typename}`}
                owner_name={item?.by?.handle?.localName}
                // onClick={() => {
                //   router.push(`/search/meta/${item?._id}`);
                // }}
                width="100%"
              />
              }
              {plugin?.format == 'action' && 
              <CardAction src={""} heading={""} />
              }
              </FlexRow>
            ))}
            {!isLoading && (
              <ButtonNative
                text="Display More Results"
                variant="state_empty_brand_to_solid_brand"
                size="xs"
                onClick={next}
                borderColor="#2448c7"
              />
            )}
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
