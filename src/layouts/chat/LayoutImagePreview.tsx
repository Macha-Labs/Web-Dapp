import { Image, Text } from "@chakra-ui/react"

const LayoutImagePreview = (props) => {
    return (
        <>
            <Image src={`https://ipfs.io/ipfs/${props.attachment?.thumb_url}/${props.attachment?.name}`} alt={props.attachment?.name} width="500px" />
            <a href={`https://ipfs.io/ipfs/${props.attachment?.thumb_url}/${props.attachment?.name}`} target="_blank"><Text>{props.attachment.name}</Text></a>
        </>
    )
}
export default LayoutImagePreview;