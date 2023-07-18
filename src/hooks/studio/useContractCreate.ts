import { createNewContract } from "@/service/ApiService";
import { useToast } from "@chakra-ui/react";
import { useRef } from "react";


const useContractCreate = (modal: any) => {
  const contractDataRef = useRef<any>({});
  const toast = useToast();

  const publishContract = async () => {
    let interested_events = contractDataRef.current["interested_events"]?.value
    interested_events = interested_events.split(',');
    interested_events =  interested_events.map((event: any) => {
      return event.trim()
    })

    let interested_methods = contractDataRef.current["interested_methods"]?.value
    interested_methods = interested_methods.split(',');
    interested_methods =  interested_methods.map((event: any) => {
      return event.trim()
    })
    const contractPayload = {
      name: contractDataRef.current["name"]?.value,
      description: contractDataRef.current["description"]?.value,
      address: contractDataRef.current["address"]?.value,
      chainId: contractDataRef.current["chainId"]?.value,
      slug: contractDataRef.current["slug"]?.value,
      interested_methods: interested_methods,
      interested_events: interested_events,
      read_abi_from: contractDataRef.current["read_abi_from"]?.value,
    };
    
    // console.log("Intereseted methods", contractDataRef.current["interested_methods"].value);
    if(contractPayload.name == undefined || contractPayload.name == "" || 
    contractPayload.description == undefined || contractPayload.description == "" ||
    contractPayload.address == undefined || contractPayload.address == "" ||
    contractPayload.chainId == undefined || contractPayload.chainId == "" ||
    contractPayload.slug == undefined || contractPayload.slug == "" || 
    contractDataRef.current["interested_methods"].value == "" || contractDataRef.current["interested_methods"].value == undefined || 
    contractDataRef.current["interested_events"].value == "" || contractDataRef.current["interested_events"].value == undefined
    ){
      toast({
        title: "Required fields cannot be empty",
        status: "warning",
        duration: 3000,
        position: "top-right"
      });
    } 
    else{
      console.log("The contract payload data is ", contractPayload);
      createNewContract(contractPayload).then((res) => {
        modal.onClose()
      })
    }

  };

  return {
    contractDataRef: contractDataRef,
    publishContract: publishContract,
  };
};
export default useContractCreate;
