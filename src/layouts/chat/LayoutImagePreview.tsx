import { Image, Text } from "@chakra-ui/react"

const LayoutImagePreview = (props: any) => {
    return (
        <>
            <Image src={props.attachment?.thumb_url} alt={props.attachment?.name} width="500px" />
            <a href={props.attachment?.thumb_url} target="_blank" rel='noreferrer'>
                <Text>{props.attachment.name}</Text>
            </a>
        </>
    )
}
export default LayoutImagePreview;