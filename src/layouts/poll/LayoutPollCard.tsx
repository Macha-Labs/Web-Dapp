import { Button, ButtonGroup, Stack, Text } from "@chakra-ui/react";
import useVoting from "hooks/useVoting";
import { useEffect, useState } from "react";
import { Col, Row } from "style";
import { PollCard } from "style/card";

const LayoutPollCard = (props: any) => {

    const hookVoting = useVoting()
    
    const [pollExpire, setPollExpire] = useState(false);
    const [pollResult, setPollResult] = useState<any>();

    const handleClick = async(e: any, index: number) => {
        const tx = await hookVoting.createVote(index);
        if (tx) {
            e.target.style.color = 'blue'
        }
    }

    return (
        <PollCard className="">
                <Row className="w-100 vr-center m-b-1">POLL</Row>
                <Row className="m-b-1">                
                    <Text>{props.poll?.question}</Text>
                </Row>
                <Row className="m-b-1">
                <ButtonGroup gap='4'>
                <Stack>
                    {Object.keys(props.poll?.options).map((c, index) => {
                        return <Button key={index} className="w-100" variant='outline' colorScheme='trasparent' value={props.poll?.options[c]} onClick = {(e) => handleClick(e,c)}>{props.poll?.options[c]}</Button>;
                    })}
                </Stack>
                </ButtonGroup>
                </Row>
        </PollCard>
    )
}
export default LayoutPollCard;