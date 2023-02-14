import { Avatar, Text } from "@chakra-ui/react";
import {  Col, Row } from "style";
import { RowHover } from "style/app";
import { ChatPreviewCard } from "style/card";
import styled from "styled-components";



const LayoutMentionPreview = (props) => {

    // const mentions = props.mention? props.users : props.users.filter(user => user?.first_name?.toLowerCase().includes(props.mention));
    console.log(props.users);

    const onMemberClick = (item) => {
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