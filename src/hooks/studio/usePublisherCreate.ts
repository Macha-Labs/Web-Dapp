import useAuthStore from "@/store/useAuthStore";
import usePublisherFormStore from "@/store/usePublisherFormStore";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useMacha from "./useMacha";

const usePublisherCreate = (modal: any) => {

  // let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  let regex1 = new RegExp("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  const websiteRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

  const toast = useToast();
  const [formStep, setFormStep] = useState<any>(1);
  const [publisherType, setPublisherType] = useState<any>(undefined);
  const $address = useAuthStore((state: any) => state.address);
  const [isTransactionPending, setIsTransactionPending] = useState<any>(false);
  const [ipfsLoading, setIpfsLoading] = useState<any>(0);
  const $publisherFormData = usePublisherFormStore(
    (state: any) => state.publisherFormData
  );
  const $loadPublisherFormData = usePublisherFormStore(
    (state: any) => state.loadPublisherFormData
  );
  const hookMacha = useMacha();

  useEffect(() => {
    if ($address != null) $loadPublisherFormData({ address: $address });
  }, [$address]);

  const setLoadingCallback = (progressData: any) => {
    let percentageDone: any = 100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log("percentage done: ", percentageDone);
    setIpfsLoading(percentageDone)
  }

  const setClear = () => {
    setFormStep(1);
    setPublisherType(undefined);
    $loadPublisherFormData({
      name: "",
      email: "",
      logo: "",
      website: "",
    });
  };

  const selectPublisher = (type: string) => {
    setPublisherType(type);
  };

  const validateSteps = () => {
    if (formStep == 3) {
      if (publisherType == undefined) {
        return false;
      } else {
        return true;
      }
    } else if (formStep == 4 && publisherType == "Individual") {
      if ($publisherFormData.email != "" && emailRegex.test($publisherFormData.email) == false) {
        toast({
          title: "Invalid email ",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return false;
      }
      if (
        $publisherFormData.name == "" ||
        $publisherFormData.name == undefined ||
        $publisherFormData.address == "" ||
        $publisherFormData.address == undefined ||
        $publisherFormData.email == "" ||
        $publisherFormData.email == undefined
      ) {
        return false;
      } else {
        return true;
      }
    } else if (formStep == 4 && publisherType == "Organization") {
      if ($publisherFormData.website != "" && websiteRegex.test($publisherFormData.website) == false) {
        toast({
          title: "Invalid website ",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return false;
      }
      if (
        $publisherFormData.name == "" ||
        $publisherFormData.name == undefined ||
        $publisherFormData.address == "" ||
        $publisherFormData.address == undefined ||
        $publisherFormData.logo == "" ||
        $publisherFormData.logo == undefined ||
        $publisherFormData.website == "" ||
        $publisherFormData.website == undefined
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const nextFormStep = () => {
    if (formStep >= 6) {
      return;
    } else {
      if (validateSteps()) {
        setFormStep((currentStep: any) => currentStep + 1);
      } else {
        if (($publisherFormData.email != "" && $publisherFormData.email != undefined) && emailRegex.test($publisherFormData.email) == false) {
          return;
        }
        else if (($publisherFormData.website != "" && $publisherFormData.website != undefined) && websiteRegex.test($publisherFormData.website) == false) {
          return;
        }
        else {
          toast({
            title: "Required fields cannot be empty",
            status: "warning",
            duration: 3000,
            position: "top-right",
          });
          return;
        }
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

  const createPublisher = async () => {
    if (publisherType == "Individual") {
      let publisherPayload = {
        name: $publisherFormData.name,
        address: $publisherFormData.address,
        email: $publisherFormData.email,
        id: "",
        image: "",
        ipfsCid: "",
        type: "Individual",
      };
      if (
        publisherPayload.name == undefined ||
        publisherPayload.name == "" ||
        publisherPayload.address == undefined ||
        publisherPayload.address == "" ||
        publisherPayload.email == undefined ||
        publisherPayload.email == ""
      ) {
        toast({
          title: "Required fields cannot be empty",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
      } else {
        console.log("The publisher payload data is ", publisherPayload);
        setIsTransactionPending(true)
        toast({
          title: "Please wait for the transaction to confirm",
          status: "loading",
          duration: 5000,
          position: "top-right",
        });
        hookMacha.createMachaPublisher(publisherPayload).then((res: any) => {
          setIsTransactionPending(false);
          console.log(res)
          if (res?.code) {
            toast({
              title: res.code.code || res?.code,
              status: "error",
              duration: 5000,
              position: "top-right",
            });
          }
          else {
            nextFormStep()
          }
        })
      }
    } else if (publisherType == "Organization") {
      let publisherPayload = {
        name: $publisherFormData.name,
        address: $publisherFormData.address,
        image: $publisherFormData.logo,
        email: "",
        id: "",
        ipfsCid: "",
        type: "Organization",
      };
      if (
        publisherPayload.name == undefined ||
        publisherPayload.name == "" ||
        publisherPayload.address == undefined ||
        publisherPayload.address == "" ||
        publisherPayload.name == undefined ||
        publisherPayload.name == "" ||
        publisherPayload.image == undefined ||
        publisherPayload.image == ""
      ) {
        toast({
          title: "Required fields cannot be empty",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
      } else {
        console.log("The publisher payload data is ", publisherPayload);
        setIsTransactionPending(true)
        toast({
          title: "Please wait for the transaction to confirm",
          status: "loading",
          duration: 5000,
          position: "top-right",
        });
        hookMacha.createMachaPublisher(publisherPayload).then((res: any) => {
          setIsTransactionPending(false);
          if (res?.code) {
            toast({
              title: res.code,
              status: "error",
              duration: 5000,
              position: "top-right",
            });
          }
          else {
            nextFormStep()
          }
        })
      }
    }
  };

  return {
    createPublisher: createPublisher,
    formStep: formStep,
    nextFormStep: nextFormStep,
    prevFormStep: prevFormStep,
    publisherType: publisherType,
    selectPublisher: selectPublisher,
    $address: $address,
    setClear: setClear,
    $publisherFormData: $publisherFormData,
    $loadPublisherFormData: $loadPublisherFormData,
    isTransactionPending: isTransactionPending,
    validateSteps: validateSteps,
    ipfsLoading: ipfsLoading,
    setLoadingCallback: setLoadingCallback
  };
};
export default usePublisherCreate;
