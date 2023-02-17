import IconImage from "@/components/icons/IconImage";
import { StyledIcon, Row, StyledOptionsCard } from "@/styles/StyledComponents";
import { Heading, Text } from "@chakra-ui/react";

const LayoutOptions = (props: any) => {
  return (
    <StyledOptionsCard className={props.style?.className + " border"}>
      {props.options.length ? (
        <>
          
          {props.options?.map((item: any, index: any) => {
            const handleClick = () => {
              props.setwindow(item.route);
            };  
            return (
              <Row className="item m-b-0-5 hr-between" key={index} onClick={handleClick}>
                <Row className="vr-center">
                  <IconImage path={item.icon} />
                  <Text fontSize="md" className="m-l-0-5">
                    {item.name}
                  </Text>
                </Row>
                <Row></Row>
              </Row>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </StyledOptionsCard>
  );
};

export default LayoutOptions;
