import { useState } from "react";

const useUserSetting = () => {
    const {tab, setTab} = useState<any>('');

    return ({tab: tab, setTab: setTab})
}

export default useUserSetting;