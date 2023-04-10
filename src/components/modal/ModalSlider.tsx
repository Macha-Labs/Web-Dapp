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
            <DrawerOverlay overflow='scroll' />
            <DrawerContent>
                
                {props.header && <DrawerHeader>
                    <Row className="vr-center justify-content-center">
                       {props.header}
                    </Row>
                </DrawerHeader>}
                
                <DrawerBody style={{overflowY:"scroll"}}>
                        {props.children}
                </DrawerBody>

                {props.footer && <DrawerFooter>
                    {props.footer}
                </DrawerFooter>}
            </DrawerContent>
        </Drawer>
    )
}

export default ModalSlider;