import { useRef } from "react";

const useContractCreate = () => {

  const contractDataRef = useRef<any>({});

    const publishContract = async () => {
        const contractPayload = {
            name: contractDataRef.current["name"]?.value,
            description: contractDataRef.current["description"]?.value,
            address: contractDataRef.current["address"]?.value,
            chainId: contractDataRef.current["chainId"]?.value,
            slug: contractDataRef.current["slug"]?.value,
            interested_methods: contractDataRef.current["interested_methods"]?.value,
            interested_events: contractDataRef.current["interested_events"]?.value
        }

        // console.log("The Api payload data is ", apiPayload);
        // console.log("The macha instance is ", $macha);
        // await $macha.publisher.apiCreation(apiPayload);
    }

    return {
            contractDataRef: contractDataRef
        }
}
export default useContractCreate