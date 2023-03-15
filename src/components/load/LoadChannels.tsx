import { Row } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import { Button, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoadChannels = () => {
    const items = [1, 2, 3, 4, 5, 6]
    return (

        <>
             {
                items.map((item: any) => {
                    return (
                        <Button
                        className="menu-item w-100 m-b-0-5"
                        size="xl"
                        variant="state_card_hover"
                    >
                        <Row className="w-100 vr-center">
                            <span className="m-r-1" >
                                <SkeletonCircle size='12' startColor={`${style.loader.bg.start}`} endColor={`${style.loader.bg.end}`} />
                            </span>
                            <SkeletonText className="w-90" noOfLines={2} spacing='2' skeletonHeight='2' startColor={`${style.loader.bg.start}`} endColor={`${style.loader.bg.end}`} />
                        </Row>
                    </Button>
                    )
                })
             }
        </>
    )
}

export default LoadChannels;