import { StyledFileCard } from "@/styles/StyledComponents";
import { Image, Text } from "@chakra-ui/react";

const LayoutLinkPreview = (props: any) => {
    return (
        <>
            <StyledFileCard className="hr-between vr-center link">
                <a href={props?.attachment?.title_link} target="_blank" rel="noreferrer">
                    <Text as='b'>{props?.attachment?.title}</Text>
                    <Text className="m-b-0-5">{props?.attachment?.author_name}</Text>
                    <Image src={`${props.attachment?.thumb_url}`} alt={props.attachment?.name} width="500px" />
                </a>
            </StyledFileCard>
        </>
    )
}

export default LayoutLinkPreview;