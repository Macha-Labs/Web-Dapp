import { Icon, Row, StyledOptionsCard } from "@/styles/StyledComponents";
import { Heading, Text } from "@chakra-ui/react";

const LayoutOptions = (props: any) => {
    return (
        <StyledOptionsCard className={props.style.class + ' border'}>
            {props.options.length ? (
                <>
                    {props.options?.map((item:any) => {
                        return (
                            <Row className="item m-b-0-5 hr-between">
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
            
        </StyledOptionsCard>
    )
}

export default LayoutOptions;