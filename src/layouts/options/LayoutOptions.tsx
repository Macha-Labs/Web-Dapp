import IconImage from "@/components/icons/IconImage";
import { StyledIcon, Row, StyledOptionsCard } from "@/styles/StyledComponents";
import { Heading, Text } from "@chakra-ui/react";

const LayoutOptions = (props: any) => {
  return (
    <StyledOptionsCard className={props.style.class + " border"}>
      {props.options.length ? (
        <>
          {props.options?.map((item: any, index: any) => {
            return (
              <Row className="item m-b-0-5 hr-between" key={index}>
                <Row>
                  <IconImage path={item.icon} />
                  <Text fontSize="md" className="m-l-0-5">
                    {item.name}
                  </Text>
                </Row>
                <Row>
                  <StyledIcon></StyledIcon>
                </Row>
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
