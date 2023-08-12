import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "@/_ui/tag/TagNative";
import { style as gStyle, style } from "@/styles/StyledConstants";
import { Box, Image, Skeleton, SkeletonText, Text } from "@chakra-ui/react";

type Props = {
    width?: string;
};

const MCard = ({
    width,
}: Props) => {

    return (
        <Box
            borderRadius={gStyle.card.borderRadius.default}
            border={gStyle.card.border.meta}
            background={gStyle.card.bg.default}
            padding={style.card.padding.default}
            marginRight={style.margin["lg"]}
            marginBottom={style.margin["lg"]}
            width={width ? width : "100%"}
            cursor={"pointer"}
        >
            <Skeleton width="100%" height="10rem" marginBottom={style.margin.sm}>
                <Image
                    src={"ads"}
                    alt="coverImage"
                    width={"full"}
                    objectFit={"cover"}
                    borderRadius={gStyle.card.borderRadius.default}
                />
            </Skeleton>

            <FlexColumn height="auto" vrAlign="flex-start">
                <SkeletonText marginBottom={style.margin.xxs} width="45%" noOfLines={1}>
                    <Text
                        className="m-b-0"
                        fontSize={"xl"}
                        fontWeight={600}
                        marginTop={gStyle.margin["xxs"]}
                    >
                        lorem ipsum lorem ipsum
                    </Text>
                </SkeletonText>

                <SkeletonText marginBottom={style.margin.sm}>
                    <Text
                        className="m-b-0"
                        fontSize={"md"}
                        marginTop={gStyle.margin["xxs"]}
                        width={"100%"}
                    >
                        lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem
                    </Text>
                </SkeletonText>
            </FlexColumn>
            <Skeleton height="2rem">
                <ButtonNative
                    text={"lorem"}
                    variant="state_brand"
                    width="100%"
                    marginTop="sm"
                />
            </Skeleton>
        </Box>
    );
};

export default MCard;