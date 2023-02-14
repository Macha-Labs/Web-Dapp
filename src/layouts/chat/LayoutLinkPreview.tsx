import { Image, Text } from "@chakra-ui/react";
import { AttachmentChatPreview } from "style/card";

const LayoutLinkPreview = (props) => {
    return (
        <>
            <AttachmentChatPreview className="hr-between vr-center link">
                <a href={props?.attachment?.title_link} target="_blank" rel="noreferrer">
                    <Text as='b'>{props?.attachment?.title}</Text>
                    <Text className="m-b-0-5">{props?.attachment?.author_name}</Text>
                    <Image src={`${props.attachment?.thumb_url}`} alt={props.attachment?.name} width="500px" />
                </a>
            </AttachmentChatPreview>
        </>
    )
}

export default LayoutLinkPreview;