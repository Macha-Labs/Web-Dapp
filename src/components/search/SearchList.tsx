import MCard from "@/_sdk/MCard";
import FlexRow from "@/_ui/flex/FlexRow";
import { truncateString } from "@/helpers";
import { Text } from "@chakra-ui/react";

type Props = {
  data: any;
};

const SearchList = ({ data }: Props) => {
  return (
    <FlexRow flexWrap={"wrap"} marginTop={"lg"} hrAlign="flex-start">
      {Object.keys(data).length > 0 ? (
        data.map((result: any, index: number) => {
          return (
            <MCard
              key={index}
              title={truncateString(result.author, 10)}
              description={truncateString(result.body, 150)}
              // floorPrice={item.floorPrice}
            />
          );
        })
      ) : (
        <Text>No result Found</Text>
      )}
    </FlexRow>
  );
};

export default SearchList;
