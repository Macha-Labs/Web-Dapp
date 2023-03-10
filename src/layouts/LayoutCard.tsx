import { Row, StyledCard } from "@/styles/StyledComponents";

const LayoutCard = (props: any) => {
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
     {props.children}
    </StyledCard>
  );
};

export default LayoutCard;
