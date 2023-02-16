import { Row, StyledCard } from "@/styles/StyledComponents";

const LayoutCard = props => {
  return (
    <StyledCard
      className={
        props.variant +
        ` size-${props.size}` +
        ` padding-${props.padding}` +
        " w-100"
      }
      onClick={props.onClick}
    >
      <Row className={`card-hr-${props.hr}` + ` card-vr-${props.vr}`}>
        {props.text}
      </Row>
    </StyledCard>
  );
};

export default LayoutCard;
