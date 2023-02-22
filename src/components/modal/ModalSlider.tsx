import {
    Avatar,
    Button,
    Heading,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react';
import { Row } from '@/styles/StyledComponents';

const ModalSlider = (props: any) => {


    return (
        <Drawer
            isOpen={props.event.isOpen}
            onClose={props.event.onClose}
            size={props.size ? props.size : 'xs'}
        >
            <DrawerOverlay />
            <DrawerContent>
                
                {props.header ? <DrawerHeader>
                    <Row className="vr-center">
                        <Row className="vr-center">
                            <Heading as="h5" fontSize={18}>{props?.header?.title}</Heading>
                        </Row>
                        
                        <DrawerCloseButton />
                    </Row>
                </DrawerHeader>
                :
                <></>
                }
                
                <DrawerBody>
                        {props.children}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default ModalSlider;