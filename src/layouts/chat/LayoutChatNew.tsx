
import { Avatar, Button, Checkbox, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Input } from "@chakra-ui/react";
import { Col, Logo } from "style";
import { MemberRow } from "style/app";

interface Props {
    query: any;
    setQuery: any;
    users: any;
    searchResults: any;
    handleCheckBox: any;
    handleCall: any;
    drawer: any;
}

const LayoutChatNew = (props) => {
    return (
        <Drawer isOpen={props.drawer.isOpen} onClose={props.drawer.onClose} placement='right' size='sm'>
        <DrawerOverlay />
        <DrawerContent className="hidescroll">
        <DrawerHeader>
            <Heading as="h4" size="md">New Message</Heading>
        </DrawerHeader>
        <DrawerBody className="hidescroll">
            <Input placeholder='Search' value={props.query} onChange={(e) => {props.setQuery(e.target.value);}}/>

            {
                props.users.length > 0 ? (
                    props.searchResults.map((item, index) => {
                        return (
                            <MemberRow>
                                <Col>
                                    <Avatar icon={<Logo src={"https://meta-profile-photos.s3.ap-south-1.amazonaws.com/" + item?._id + ".png"} onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "https://0xmetame-assets.s3.ap-south-1.amazonaws.com/default-user.png"; }} />} />
                                </Col>
                                <Col className="w-100 vr-center itemcolumn">
                                    {item.first_name} {item.last_name}
                                </Col>
                                <Checkbox onChange={() => {props.handleCheckBox(item._id)}}></Checkbox>
                            </MemberRow>
                        )
                    })
                ) : (<></>)
            }
        </DrawerBody>
        <DrawerFooter>
            <Button bg={"#61ABF0"} size='md' className="w-100" onClick={props.handleCall}>Message</Button>
        </DrawerFooter>
        </DrawerContent>
    </Drawer>
    )
}

export default LayoutChatNew;