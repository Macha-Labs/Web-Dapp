import useChatChannelsStore from "@/store/useChatChannelsStore";

const useChatChannelsReload = () => {
    const storeLoad = useChatChannelsStore(((state: any) => state.load))
    

    return (
        {}
    )
}

export default useChatChannelsReload;