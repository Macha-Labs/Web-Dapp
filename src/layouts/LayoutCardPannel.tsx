import { StyledCardPannel } from "@/styles/StyledComponents";

const LayoutCardPannel = (props) => {
    return (
        <StyledCardPannel>
            <div className="header">
                    {props.header}
            </div>
            <div className="body">
                    {props.children}
            </div>
            {props.footer && <div className="footer">{props.footer}</div>}
        </StyledCardPannel>
    )
}

export default LayoutCardPannel;