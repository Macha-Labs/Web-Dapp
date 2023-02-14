import { DownloadIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import FileIcon from "components/Icon/FileIcon";
import { truncateString } from "helpers";
import { Icon, Row } from "style";
import { AttachmentFilePreview } from "style/card";

const LayoutFilePreview = (props) => {
    return (
        <>
            <AttachmentFilePreview className="hr-between vr-center">
                <Row className="vr-center">
                    <FileIcon width="20" height="20" fill="#efefef" className="m-r-1" />
                    <Text fontSize='md'>
                        {props.attachment?.name?.length > 30 ? (truncateString(props.attachment?.name)) : (props.attachment?.name)}
                    </Text>
                </Row>
                <Icon>
                    <a href={`https://ipfs.io/ipfs/${props.attachment?.thumb_url}/${props.attachment?.name}`} target="_blank" download>
                        <Icon className="state-2-3"><DownloadIcon width="15" height="15" fill="#efefef" /></Icon>
                    </a>
                </Icon>

            </AttachmentFilePreview>
        </>
    )
}

export default LayoutFilePreview;