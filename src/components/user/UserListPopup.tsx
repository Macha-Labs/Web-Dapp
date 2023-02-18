import { Col, Row } from "@/styles/StyledComponents";
import { Avatar, Button, Checkbox, Text } from "@chakra-ui/react";
import React from "react";
import { helperIPFS, truncateAddress } from "../../helpers";



const UserListPopup = (props) => {
  return (
    <>
      {/* <Popup display={props.visible} style={{ bgColor: "rgb(0,0,0)" }}> */}
        <Col className="p-5">
          <Row className="hr-between w-full">
            <Button onClick={() => props.setVisible(false)}>
              <Text>Cancel</Text>
            </Button>
            <Text size={"sm"}>Add Members</Text>
            <Button onClick={() => props.addMembersToChannel()}>
              <Text>Done</Text>
            </Button>
          </Row>
          {/* <Search input={undefined} callback={undefined} /> */}
        </Col>
        {props.followers.map((item, index) => {
          return (
            <>
              <Row key={index} className="p-5 hr-between">
                <Row className="hr-between">
                  <div>
                    <Avatar
                      src={helperIPFS(
                        item?.wallet?.defaultProfile?.picture?.original?.url
                      )}
                    />
                  </div>
                  <div>
                    <Text>
                      {item?.wallet?.defaultProfile?.name
                        ? item.wallet?.defaultProfile?.name
                        : truncateAddress(
                            item?.wallet?.defaultProfile?.ownedBy
                          )}
                    </Text>
                    <Text color="#6FC62A">
                      @{item?.wallet?.defaultProfile?.handle}
                    </Text>
                  </div>
                </Row>

                <Checkbox
                  value=""
                  onChange={() =>
                    props.handleCheckedUsers(
                      item?.wallet?.defaultProfile?.ownedBy,
                      index
                    )
                  }
                />
              </Row>
            </>
          );
        })}
      {/* </Popup> */}
    </>
  );
};

export default UserListPopup;
