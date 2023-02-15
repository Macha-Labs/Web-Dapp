import { truncateAddress } from "@/helpers";
import { StyledConversation } from "@/styles/StyledComponents";
import { Col, Icon, Row } from "@/styles/StyledComponents";
import { Avatar, Heading, Tag, Textarea } from "@chakra-ui/react";

const ChatMessage = (props: any) => {
    return (
        <StyledConversation>
                    
            <Row className="message">
                
                <Col className="w-100" style={{color: "#ffffff"}}>
                    {
                        props.message?.text
                    }
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