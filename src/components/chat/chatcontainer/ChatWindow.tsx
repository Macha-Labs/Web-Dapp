import LayoutChatEmpty from "@/layouts/chat/LayoutChatEmpty";
import { StyledConversationContainer, StyledConversationView } from "@/styles/StyledComponents";

const ChatWindow = (props: any) => {
    return (
        <StyledConversationContainer>
                <StyledConversationView>
                    {
                        props.hookChannel.messages?.length
                            ?
                            (
                                <>
                                    {
                                        props.hookChannel.messages?.map((item, index) =>
                                            <LayoutChatConversation
                                                chatContext={chatContext}
                                                item={item}
                                                index={index}
                                                context={authContext}
                                                channel={chatContext.channel}
                                                editingId={chatContext.editingId}
                                                setEditingId={chatContext.setEditingId}
                                                editingMessage={chatContext.editingMessage}
                                                setEditingMessage={chatContext.setEditingMessage}
                                                keyDownMessageUpdate={chatContext.keyDownMessageUpdate}
                                                setActionMessage={chatContext.setActionMessage}
                                                handleEditing={chatContext.handleEditing}
                                                copyMessage={chatContext.copyMessage}
                                                pinMessage={chatContext.pinMessage}
                                                forwardMessage={chatContext.forwardMessage}
                                                deleteMessage={chatContext.deleteMessage}
                                                onOpen={onOpen}
                                                reactions={chatContext.reactions}
                                                handleReaction={chatContext.handleReaction}
                                                setReaction={chatContext.setReactions}
                                                setMember={setMember}
                                                handleTask={handleTask}
                                                amountRef={amountRef}
                                                addressRef={addressRef}
                                                txnModalOpen={chatContext?.transactionModal?.onOpen}
                                            />
                                        )
                                    }
                                    
                                </>
                            )
                            :
                            (
                                <LayoutChatEmpty channel={props.channel} />
                            )
                    }
                </StyledConversationView>
        </StyledConversationContainer>
    )
}

export default ChatWindow;