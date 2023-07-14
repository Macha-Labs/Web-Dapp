import { StyledRow, StyledInput } from "@/styles/StyledComponents";

const InputAction = (props: any) => {
    return (
        <StyledInput className={props?.style?.className}>
            <StyledRow className="vr-center">
                {props.children}
                <StyledRow>
                    {props.actions.map((item: any) => {
                        return (
                            <>{item}</>
                        )
                    })}
                </StyledRow>
            </StyledRow>
        </StyledInput>
    )
}

export default InputAction;