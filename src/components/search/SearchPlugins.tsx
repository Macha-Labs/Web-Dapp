import { dataPluginsArr } from "@/data/dataPlugins";
import GlobalIcons from "@/styles/GlobalIcons";
import { CardAction } from "@/_ui/cards/CardAction";
import FlexRow from "@/_ui/flex/FlexRow";

type Props = {
    hookSearch: any;
  };

const SearchPlugins = ({hookSearch}: Props) => {
    return (
        <>
        {dataPluginsArr.map((item: any) => {
            return (
                <FlexRow marginBottom="xs" height="fit-content">
                    <CardAction src={GlobalIcons[item?.image]} heading={item.heading} width="100%" onClick={() => {hookSearch?.triggerPlugin(item)}}></CardAction>
                </FlexRow>
            )
        })}
            
        </>
    )
}

export default SearchPlugins;