import { ChatPreviewCard, StyledCol, StyledRow, RowHover } from "@/styles/StyledComponents";
import { Avatar, Text } from "@chakra-ui/react";



const LayoutMentionPreview = (props: any) => {

    // const mentions = props.mention? props.users : props.users.filter(user => user?.first_name?.toLowerCase().includes(props.mention));
    const onMemberClick = (item: any) => {
        props.setMentionList([...props.mentionList, item.id]);
        props.selectedText(item.name);
    }

    return (
        <>
            {
                props.users?.length ?
                    (
                        <ChatPreviewCard>
                            <Text className="m-b-1">Members Matching @</Text>
                            <StyledCol className="w-100 template-body">
                                {
                                    props.users.map((item: any, index: number) =>
                                        <RowHover key={index} className="hr-between vr-center w-100" onClick={() => onMemberClick(item)}>
                                            <StyledRow className="vr-center">
                                                <Avatar src={item?.image} className="m-r-1" size="sm" />
                                                <Text>{item?.name}</Text>
                                            </StyledRow>
                                            <StyledRow>
                                                <Text>@{item.handle}</Text>
                                            </StyledRow>
                                        </RowHover>
                                    )
                                }
                            </StyledCol>
                        </ChatPreviewCard>
                    )
                    :
                    (
                        <></>
                    )
            }
        </>
    )
}

export default LayoutMentionPreview;