import { Row, StyledInput } from "@/styles/StyledComponents";

const InputAction = (props: any) => {
    return (
        <StyledInput className={props?.style?.className}>
            <Row className="vr-center">
                {props.children}
                <Row>
                    {props.actions.map((item: any) => {
                        return (
                            <>{item}</>
                        )
                    })}
                </Row>
            </Row>
        </StyledInput>
    )
}

export default InputAction;