import Loader from "@/_ui/loader/Loader";
import MetaCard from "../cards/MetaCard";
import FlexRow from "@/_ui/flex/FlexRow";
import useApiList from "@/hooks/studio/useApiList";
import { useRouter } from "next/router";
import MetaTagFilter from "./MetaTagFilter";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import InputSearch from "@/_ui/input/InputSearch";
import { style } from "@/styles/StyledConstants";
import { Text, useDisclosure } from "@chakra-ui/react";
import ApiCreateModal from "./ApiCreateModal";
import useApiCreate from "@/hooks/studio/useApiCreate";

const ApiList = () => {

    const hookApiList = useApiList();
    const router = useRouter()
    const modal = useDisclosure();
    const hookApiCreate = useApiCreate();

    return (
        <>
            <FlexRow
                width="100%"
                paddingTop="2xl"
                marginTop={"subnav"}
            >
                <Text fontSize={style.font.h3}>Soon</Text>
            </FlexRow>
        </>
        // <>
        //     <FlexRow
        //         width="100%"
        //         hrAlign="space-between"
        //         paddingTop="2xl"
        //         marginTop={"subnav"}
        //     >
        //         <FlexRow
        //             width="100%"
        //             hrAlign="flex-start"
        //         // marginTop={style.margin.nav}
        //         >
        //             <FlexRow width="50%">
        //                 <InputSearch
        //                     size="lg"
        //                     placeholder="Search Studio"
        //                     icon={{ slug: "icon-search" }}
        //                     marginRight={style.card.margin.default}
        //                     onChange={(e: any) => hookApiList.handleFilter(e.target.value)}
        //                 />
        //             </FlexRow>
        //             <MetaTagFilter />
        //         </FlexRow>
        //         <ButtonNative
        //             size="sm"
        //             text="Create API"
        //             variant="state_brand"
        //             onClick={() => {
        //                 modal.onOpen();
        //             }}
        //         />
        //     </FlexRow>
        //     <FlexRow
        //         hrAlign="flex-start"
        //         width="100%"
        //         flexWrap="wrap"
        //         // padding={style.body.padding}
        //         paddingTop="md"
        //     >
        //         {hookApiList.isLoading && (
        //             <FlexRow height="500px">
        //                 <Loader size="lg" />
        //             </FlexRow>
        //         )}
        //         {!hookApiList.isLoading &&
        //             hookApiList.filteredData &&
        //             hookApiList.filteredData.map((item: any, index: number) => {
        //                 console.log("Checking request ", item.request);
        //                 return (
        //                     <MetaCard
        //                         key={index}
        //                         cardView="horizontal"
        //                         heading={item.name}
        //                         description={item.description}
        //                         tags={[
        //                             item.request?.requestType,
        //                             item.request?.requestMethod,
        //                         ]}
        //                         onCardClick={() => {
        //                             router.push(
        //                                 {
        //                                     pathname: "/studio/data/api/[id]",
        //                                     query: {
        //                                         id:
        //                                             item.state.status == "PENDING"
        //                                                 ? item._id
        //                                                 : item.id,
        //                                     },
        //                                 },
        //                                 `/studio/data/api/${item.state.status == "PENDING" ? item._id : item.id
        //                                 }`
        //                             );
        //                         }}
        //                     />
        //                 );
        //             })}
        //     </FlexRow>
        //     <ApiCreateModal modal={modal} hookApiCreate={hookApiCreate} />
        // </>
    )
}
export default ApiList