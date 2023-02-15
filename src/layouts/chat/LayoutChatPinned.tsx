import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Heading, VStack } from "@chakra-ui/react";
import { Col, Logo, Row } from "style";

interface Props {
    drawer: any;
}

const LayoutChatPinned = (props: Props) => {
    return (
        <Drawer isOpen={props.drawer.isOpen} onClose={props.drawer.onClose} placement='right' size='lg'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                    <Heading as="h4" size="md" className="menu-heading m-b-1">
                        Pinned Chats
                    </Heading>
                    <VStack spacing={2} align="stretch">

                        <Box w='100%'
                            p={4}
                            color='white'
                            borderRadius='5px'
                            bg="#061D5D"
                            _hover={{ bg: '#0F2E88' }}>
                            <Row>
                                <Col style={{width: "50px"}}>
                                    <Logo className="sm" src={"https://meta-org-logos.s3.ap-south-1.amazonaws.com/" + "6246c7045cc31c36781d668e" + ".png"} onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "https://0xmetame-assets.s3.ap-south-1.amazonaws.com/default-user.png"; }} />
                                </Col>
                                <Col className="w-100">
                                    <Row className="m-b-0-5">
                                        <Col className="w-100">
                                            username date
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Button size='xs'>
                                                    Jump
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        This is a abox
                                        This is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a aboxThis is a abox
                                    </Row>

                                </Col>
                            </Row>
                        </Box>

                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default LayoutChatPinned;