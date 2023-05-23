import { StyledRow } from '@/styles/StyledComponents';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay
} from '@chakra-ui/react';

type Props = {
    event: any,
    size?: string,
    header?: any,
    childrenComponent?: any,
    footer?: any
    children?: any
}

const ModalSlider = ({event, size, header, childrenComponent, footer, children}: Props) => {


    return (
        <Drawer
            isOpen={event.isOpen}
            onClose={event.onClose}
            size={size ? size : 'xs'}
        >
            <DrawerOverlay overflow='scroll' />
            <DrawerContent>
                
                {header && <DrawerHeader>
                    <StyledRow className="vr-center justify-content-center">
                       {header}
                    </StyledRow>
                </DrawerHeader>}
                
                <DrawerBody style={{overflowY:"scroll"}}>
                        {childrenComponent}
                </DrawerBody>

                {footer && <DrawerFooter>
                    {footer}
                </DrawerFooter>}
            </DrawerContent>
        </Drawer>
    )
}

export default ModalSlider;