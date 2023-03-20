import useChatChannelStore from "@/store/useChatChannelStore";
import {useChatMembersStore} from "@/store/useChatMembersStore";
import useChatMessagesStore from "@/store/useChatMessagesStore";
import { createContext, useEffect} from "react";


export type DataContextType = {
  members: any | undefined;
  loadMembers: any | undefined;
  messages: any | undefined;
  loadMessages: any | undefined;
  memberAll: any | undefined;
  loadMemberAll: any | undefined;
  memberIds: any | undefined;
  loadMemberIds: any | undefined;
};

export const DataContext = createContext<DataContextType>({
  members: null,
  loadMembers: () => {},
  messages: null,
  loadMessages: () => {},
  memberAll: null,
  loadMemberAll: () => {},
  memberIds: null,
  loadMemberIds: () => {}
});

export const DataProvider = ({ children }: any) => {
    console.log('Rendering >>>>> DataProvider');


    const $messages = useChatMessagesStore((state: any) => state.messages);
    const $loadMessages = useChatMessagesStore(((state: any) => state.load));
    const $members = useChatMembersStore((state: any) => state.members);
    
    const $memberAll = useChatMembersStore((state: any) => state.memberAll);
    
    const $memberIds = useChatMembersStore((state: any) => state.memberIds);
    const $loadMembers = useChatMembersStore(((state: any) => state.load));
    const $loadMemberAll = useChatMembersStore(((state: any) => state.loadAll));
    const $loadMemberIds = useChatMembersStore(((state: any) => state.loadIds));

    useEffect(() => {console.log('DataProvider ===> messages', $messages)}, [$messages]);

    useEffect(() => {console.log('DataProvider ===> members', $members)}, [$members]);

    useEffect(() => {console.log('DataProvider ===> memberIds', $memberIds)}, [$memberIds]);

    useEffect(() => {console.log('DataProvider ===> memberAll', $memberAll)}, [$memberAll]);


    return (
        <DataContext.Provider
        value={{
            messages: $messages,
            loadMessages: $loadMessages,
            members: $members,
            loadMembers: $loadMembers,
            memberAll: $memberAll,
            loadMemberAll: $loadMemberAll,
            memberIds: $memberIds,
            loadMemberIds: $loadMemberIds
        }}
        >
        {children}
        </DataContext.Provider>
    );
};
