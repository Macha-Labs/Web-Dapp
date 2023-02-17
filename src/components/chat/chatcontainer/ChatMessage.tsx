import IconImage from "@/components/icons/IconImage";
import { truncateAddress } from "@/helpers";
import LayoutFilePreview from "@/layouts/chat/LayoutFilePreview";
import LayoutImagePreview from "@/layouts/chat/LayoutImagePreview";
import LayoutLinkPreview from "@/layouts/chat/LayoutLinkPreview";
import { Col, Row, StyledConversation, StyledIcon } from "@/styles/StyledComponents";
import {
    Avatar, Checkbox, Text
} from "@chakra-ui/react";

const ChatMessage = (props: any) => {
    const templateAttachment = (attachment: any) => {
        if (attachment?.og_scrape_url) {
            return <LayoutLinkPreview attachment={attachment} />;
        } else if (attachment?.type == "image") {
            return <LayoutImagePreview attachment={attachment} />;
        } else if (
            attachment?.type == "text" ||
            attachment?.type == "application"
        ) {
            return <LayoutFilePreview attachment={attachment} />;
        }
    };

    return (
        <StyledConversation>
            <Row className="message w-100">
                <Col>
                    <Row>
                    {props.hookChat?.actionMessage?.action === "MULTISELECT" && <Checkbox defaultChecked className="m-r-0-5"></Checkbox>}
                        
                        <Avatar
                            src={props.message?.user?.lensImage}
                            className="m-r-1"
                        ></Avatar>
                    </Row>
                </Col>

                <Col className="w-100" style={{ color: "#ffffff" }}>
                    <Text fontSize="sm">
                        {props.message?.user?.lensUsername ||
                            props.message?.user?.lensHandle ||
                            truncateAddress(props.message?.user?.id)}
                    </Text>
                    {props.message?.text}
                    {props?.message?.attachments.map((item: any, index: number) => {
                        return templateAttachment(item);
                    })}
                </Col>
                <Row className="w-100 action">
                    <IconImage
                        path="IconDarkPinned.png"
                        style={{className:"m-r-0-5"}}
                    />

                    <IconImage
                        path="IconDarkUsers.png"
                    />
                </Row>
            </Row>
        </StyledConversation>
    );
}

export default ChatMessage;
