import { Icon, Row, StyledCard } from "@/styles/StyledComponents";
import { Heading, Text } from "@chakra-ui/react";

const LayoutOptions = (props: any) => {
    return (
        <StyledCard className="border">
            {props.options.length ? (
                <>
                    {props.options?.map((item:any) => {
                        return (
                            <Row className="m-b-0-5 hr-between">
                                <Row>
                                    <Icon></Icon>
                                    <Text fontSize="md" className="m-l-0-5">{item.name}</Text>
                                </Row>
                                <Row>
                                    <Icon></Icon>
                                </Row>
                            </Row>
                        )
                    })}
                </>
            ) : (
                <></>
            )}
            
        </StyledCard>
    )
}

export default LayoutOptions;