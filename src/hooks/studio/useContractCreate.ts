import { createNewContract } from "@/service/ApiService";
import useContractFormStore from "@/store/useContractFormStore";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const useContractCreate = (modal: any) => {
  const toast = useToast();
  const router = useRouter();
  const [formStep, setFormStep] = useState<any>(1);
  const $contractFormData = useContractFormStore((state: any) => state.contractFormData);
  const $loadContractFormData = useContractFormStore((state: any) => state.loadContractFormData);
  const [ipfsLoading, setIpfsLoading] = useState<any>(0);

  const addressRegex = /^0x[a-fA-F0-9]{40}$/

  const setLoadingCallback = (progressData: any) => {
    let percentageDone: any = 100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log("percentage done: ", percentageDone);
    setIpfsLoading(percentageDone)
  }

  useEffect(() => {
    console.log($contractFormData)
  },[$contractFormData])

  const validateSteps = () => {
    if (formStep == 1) {
      if ($contractFormData.address != "" && addressRegex.test($contractFormData.address) == false) {
        toast({
          title: "Invalid addresss",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return false;
      }
      if (
        $contractFormData.address == "" ||
        $contractFormData.address == undefined ||
        $contractFormData.chain_id == "" ||
        $contractFormData.chain_id == undefined
      ) {
        toast({
          title: "Required fields cannot be empty",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return false;
      } else {
        return true;
      }
    }
    if (formStep == 2) {
      if (
        $contractFormData.name == "" ||
        $contractFormData.name == undefined ||
        $contractFormData.slug == "" ||
        $contractFormData.slug == undefined ||
        $contractFormData.description == "" ||
        $contractFormData.description == undefined ||
        $contractFormData.image == "" ||
        $contractFormData.description == undefined
      ) {
        toast({
          title: "Required fields cannot be empty",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return false;
      } else {
        return true;
      }
    }
    if (formStep == 3) {
      if (
        $contractFormData.interested_events == "" ||
        $contractFormData.interested_events == undefined ||
        $contractFormData.interested_methods == "" ||
        $contractFormData.interested_methods == undefined
      ) {
        toast({
          title: "Required fields cannot be empty",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return false;
      } else {
        return true;
      }
    }
  };

  const nextFormStep = () => {
    if (formStep >= 3) {
      return;
    } else {
      if (validateSteps()) {
        setFormStep((currentStep: any) => currentStep + 1);
      } else {
        return;
      }
    }
  };

  const prevFormStep = () => {
    if (formStep <= 1) {
      return;
    } else {
      setFormStep((currentStep: any) => currentStep - 1);
    }
  };

  const editContract = async (_id: any) => {
    let interested_events = $contractFormData.interested_events;
    interested_events = interested_events.split(",");
    interested_events = interested_events.map((event: any) => {
      return event.trim();
    });

    let interested_methods = $contractFormData.interested_methods;
    interested_methods = interested_methods.split(",");
    interested_methods = interested_methods.map((event: any) => {
      return event.trim();
    });


    const contractPayload = {
      name: $contractFormData.name,
      description: $contractFormData.description,
      address: $contractFormData.address,
      chain_id: $contractFormData.chain_id,
      slug: $contractFormData.slug,
      read_abi_from: $contractFormData.read_abi_from,
      image: $contractFormData.image,
      interested_methods: interested_methods,
      interested_events: interested_events,
    };

    // console.log("Intereseted methods", contractDataRef.current["interested_methods"].value);
    if (
      contractPayload.name == undefined ||
      contractPayload.name == "" ||
      contractPayload.description == undefined ||
      contractPayload.description == "" ||
      contractPayload.address == undefined ||
      contractPayload.address == "" ||
      contractPayload.chain_id == undefined ||
      contractPayload.chain_id == "" ||
      contractPayload.slug == undefined ||
      contractPayload.slug == "" ||
      $contractFormData.interested_methods == "" ||
      $contractFormData.interested_methods == undefined ||
      $contractFormData.interested_events == "" ||
      $contractFormData.interested_events == undefined
    ) {
      toast({
        title: "Required fields cannot be empty",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
    } else {
      console.log("The contract payload data is ", contractPayload);
      createNewContract(contractPayload).then((res) => {
        modal.onClose();
        toast({
          title: "Contract Edited!!",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        router.push(`/search/contracts/${contractPayload.slug}`);
      });
    }
  };

  const publishContract = async () => {
    let interested_events = $contractFormData.interested_events;
    interested_events = interested_events.split(",");
    interested_events = interested_events.map((event: any) => {
      return event.trim();
    });

    let interested_methods = $contractFormData.interested_methods;
    interested_methods = interested_methods.split(",");
    interested_methods = interested_methods.map((event: any) => {
      return event.trim();
    });

    const contractPayload = {
      name: $contractFormData.name,
      description: $contractFormData.description,
      address: $contractFormData.address,
      chain_id: $contractFormData.chain_id,
      slug: $contractFormData.slug,
      read_abi_from: $contractFormData.read_abi_from,
      image: $contractFormData.image,
      interested_methods: interested_methods,
      interested_events: interested_events,
    };

    // console.log("Intereseted methods", contractDataRef.current["interested_methods"].value);
    if (
      contractPayload.name == undefined ||
      contractPayload.name == "" ||
      contractPayload.description == undefined ||
      contractPayload.description == "" ||
      contractPayload.address == undefined ||
      contractPayload.address == "" ||
      contractPayload.chain_id == undefined ||
      contractPayload.chain_id == "" ||
      contractPayload.slug == undefined ||
      contractPayload.slug == "" ||
      contractPayload.image == undefined ||
      contractPayload.image == "" ||
      $contractFormData.interested_methods == "" ||
      $contractFormData.interested_methods == undefined ||
      $contractFormData.interested_events == "" ||
      $contractFormData.interested_events == undefined
    ) {
      toast({
        title: "Required fields cannot be empty",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
    } else {
      console.log("The contract payload data is ", contractPayload);
      createNewContract(contractPayload).then((res) => {
        modal.onClose()
        toast({
          title: "Contract created!",
          status: "success",
          duration: 3000,
          position: "top-right"
        });
        router.push(`/search/contracts/${contractPayload.slug}`)
        $loadContractFormData({
          name: "",
          description: "",
          address: "",
          chain_id: "",
          slug: "",
          interested_methods: "",
          interested_events: "",
          read_abi_from: "",
          image: "",
        })
      })
    }
  };

  return {
    $contractFormData: $contractFormData,
    $loadContractFormData: $loadContractFormData,
    publishContract: publishContract,
    editContract: editContract,
    formStep: formStep,
    nextFormStep: nextFormStep,
    prevFormStep: prevFormStep,
    ipfsLoading: ipfsLoading,
    setLoadingCallback: setLoadingCallback
  };
};
export default useContractCreate;
