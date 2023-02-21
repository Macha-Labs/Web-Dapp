import { Avatar, Text } from "@chakra-ui/react";
import {  Col, Row, RowHover, StyledChatPreviewCard} from "@/styles/StyledComponents";
import styled from "styled-components";

const ChatMention = (props: any) => {
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
                        <StyledChatPreviewCard>
                            <Text className="m-b-1">Members Matching @</Text>
                            <Col className="w-100 template-body">
                                {
                                    props.users.map((item, index) =>
                                        <RowHover key={index} className="hr-between vr-center w-100" onClick={() => onMemberClick(item)}>
                                            <Row className="vr-center">
                                                <Avatar src={item?.image} className="m-r-1" size="sm" />
                                                <Text>{item?.name}</Text>
                                            </Row>
                                            <Row>
                                                <Text>@{item.handle}</Text>
                                            </Row>
                                        </RowHover>
                                    )
                                }
                            </Col>
                        </StyledChatPreviewCard>
                    )
                    :
                    (
                        <Text>Displaying members</Text>
                    )
            }
        </>
    )
}

export default ChatMention;
