import { useState } from "react";

const useXmtpChannel = () => {
    console.log('Rendering >>>>> useXmtpChannel');
    const [channel, setChannel] = useState<any>();  

    const _fetch= (channel: any) => {
        setChannel(channel);
    }

    const _remove = () => {
        setChannel(null)
      }

    return (
        {
            _fetch: _fetch,
            _remove: _remove,
            channel: channel
        }
    )

}

export default useXmtpChannel;