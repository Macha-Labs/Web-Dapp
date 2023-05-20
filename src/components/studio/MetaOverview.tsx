import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { Text } from "@chakra-ui/react";
import React from "react";

function MetaOverview() {
  return (
    <FlexRow>
      <FlexColumn>
        <Text>
          META_node’s automated options market enables best-in-class pricing
          based on realtime supply and demand, providing fully-featured
          peer-to-pool trading and capital efficiency to DeFi options. Premia's
          automated opdemand, providing fully-featured peer-to-pool trading and
          capital efficiency to DeFi options.
        </Text>
        <FlexRow>
          <FlexColumn>
            <Text>CREATED</Text>
            <Text>20-05-23</Text>
          </FlexColumn>
          <FlexColumn>
            <Text>LAST MODIFIED</Text>
            <Text>5 min ago</Text>
          </FlexColumn>
        </FlexRow>
        <FlexRow>
          <FlexColumn>
            <Text>REQUEST TYPE</Text>
            <Text>GRAPHQL</Text>
          </FlexColumn>
          <FlexColumn>
            <Text>NETWORK</Text>
            <Text>5 min ago</Text>
          </FlexColumn>
        </FlexRow>
      </FlexColumn>
      <FlexColumn></FlexColumn>
    </FlexRow>
  );
}

export default MetaOverview;
