import { truncateAddress } from "@/helpers";
import LayoutFilePreview from "@/layouts/chat/LayoutFilePreview";
import LayoutImagePreview from "@/layouts/chat/LayoutImagePreview";
import LayoutLinkPreview from "@/layouts/chat/LayoutLinkPreview";
import { StyledConversation } from "@/styles/StyledComponents";
import { Col, Icon, Row } from "@/styles/StyledComponents";
import { Avatar, AvatarBadge, Heading, Tag, Textarea } from "@chakra-ui/react";

const ChatMessage = (props: any) => {

    const templateAttachment = (attachment: any) => {
        if (attachment?.og_scrape_url) {
            return (
                <LayoutLinkPreview attachment={attachment} />
            )
        }
        else if (attachment?.type == "image") {
            return (
                <LayoutImagePreview attachment={attachment} />
            )
        } else if (attachment?.type == "text" || attachment?.type == "application") {
            return (
                <LayoutFilePreview attachment={attachment} />
            )
        }
    }


    return (
        <StyledConversation>
                    
            <Row className="message">
                <Col>
                    <Avatar src={props.message?.user?.lensImage} className="m-r-1"></Avatar>
                </Col>
                
                <Col className="w-100" style={{color: "#ffffff"}}>
                    <Heading as="h6">
                        {props.message?.user?.lensUsername ||
                                    props.message?.user?.lensHandle ||
                                        truncateAddress(
                                            props.message?.user?.id
                                        )
                        }
                        
                    </Heading>
                    {
                        props.message?.text
                    }
                    {props?.message?.attachments.map((item) => {
                            return templateAttachment(item);
                    })}
                </Col>
                <Row className="w-100 action">
                    <Icon className="circled m-r-0-5">
                        {/* <ReplyIcon width="20" height="20" fill="#e8e8e8" /> */}
                    </Icon>
                </Row>
            </Row>
        </StyledConversation>
    )
}

export default ChatMessage;