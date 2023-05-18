import TagNative from "@/_ui/tag/TagNative";
import { style } from "@/styles/StyledConstants";
import { Text } from "@chakra-ui/react";

type Props = {
  image: string;
  heading: string;
  description: string;
  tags: any;
};

export default function MetaCard({ image, heading, description, tags }: Props) {
  return (
    <div
      style={{
        border: `${style.card.border.hover}`,
        borderRadius: `${style.card.borderRadius}`,
        background: `${style.card.bg.default}`,
        padding: ` ${style.card.padding.default}`,
        width: ` ${style.card.width.meta}`,
      }}
    >
      <img src={image} width="100%" />
      <Text fontSize="2xl" fontWeight="600">
        {heading}
      </Text>
      <Text>{description}</Text>
      <TagNative value="Tag 1" variant="state_xmtp" />
    </div>
  );
}
