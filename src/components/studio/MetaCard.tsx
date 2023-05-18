import GlobalIcons from "@/styles/GlobalIcons";
import { MetaBox } from "@/styles/StyledComponents";
import { Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  heading: string;
  description: string;
  tags: any;
};

export default function MetaCard({ image, heading, description, tags }: Props) {
  return (
    <MetaBox>
      <img src={image} />
      <Text>{heading}</Text>
      <Text>{description}</Text>
    </MetaBox>
  );
}
