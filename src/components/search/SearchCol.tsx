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
                image={item?.image}
                owner_image={item?.by?.metadata?.picture?.optimized?.uri}
                metaName={item?.meta_schema?.name}
                slug={""}
                description={item?.description}
                title={item?.heading}
                owner_name={item?.by?.handle?.localName}
                width="100%"
                onClick={() => {window.open(item?.externalLink)}}
              />
              }
              {plugin?.format == 'action' && 
              <CardAction src={item?.image} heading={item?.heading} onClick={() => {window.open(item?.externalLink)}} />
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
