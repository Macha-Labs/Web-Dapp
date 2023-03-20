import { StyledCardPannel } from "@/styles/StyledComponents";

const LayoutCardPannel = (props: any) => {
    return (
        <StyledCardPannel className={props.style?.className}>
            <div className="header">
                    {props?.header}
            </div>
            <div className="body">
                    {props.children}
            </div>
            {props.footer && <div className="footer">{props.footer}</div>}
        </StyledCardPannel>
    )
}

export default LayoutCardPannel;