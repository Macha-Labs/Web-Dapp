import { deploytoLightHouse } from "@/helpers/storage/lightHouseStorage";
import {
  baseScanVerification,
  checkUniqueData,
  createNewContract,
  etherscanVerification,
  opScanVerification,
  polygonScanVerification,
} from "@/service/ApiService";
import useAuthStore from "@/store/useAuthStore";
import useContractFormStore from "@/store/useContractFormStore";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useContractCreate = (modal: any) => {
  const toast = useToast();
  const router = useRouter();
  const [formStep, setFormStep] = useState<any>(1);
  const $contractFormData = useContractFormStore(
    (state: any) => state.contractFormData
  );
  const $loadContractFormData = useContractFormStore(
    (state: any) => state.loadContractFormData
  );
  const [ipfsLoading, setIpfsLoading] = useState<any>(0);
  const $address = useAuthStore((state: any) => state.address);

  useEffect(() => {
    console.log("contract form data", $contractFormData);
  }, [$contractFormData]);

  const addressRegex = /^0x[a-fA-F0-9]{40}$/;

  const setLoadingCallback = (progressData: any) => {
    let percentageDone: any =
      100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log("percentage done: ", percentageDone);
    setIpfsLoading(percentageDone);
  };

  const chainVerification = async (address: any) => {
    if ($contractFormData.chain_id == 1) {
      const res = await etherscanVerification(address);
      if (res?.status == 1) return true;
      else {
        setFormStep(1.5);
        return false;
      }
    } else if ($contractFormData.chain_id == 137) {
      const res = await polygonScanVerification(address);
      if (res?.status == 1) return true;
      else {
        setFormStep(1.5);
        return false;
      }
    } else if ($contractFormData.chain_id == 8453) {
      const res = await baseScanVerification(address);
      if (res?.status == 1) return true;
      else {
        setFormStep(1.5);
        return false;
      }
    } else if ($contractFormData.chain_id == 10) {
      const res = await opScanVerification(address);
      if (res?.status == 1) return true;
      else {
        setFormStep(1.5);
        return false;
      }
    }
  };

  const validateSteps = async () => {
    if (formStep == 1) {
      if (
        $contractFormData.address != "" &&
        addressRegex.test($contractFormData.address) == false
      ) {
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
        const res = await checkUniqueData("address", $contractFormData.address);
        if (res.data == false) {
          toast({
            title: "A contract with the same address already exists.",
            status: "warning",
            duration: 3000,
            position: "top-right",
          });
          return false;
        } else {
          if (
            $contractFormData.read_abi_from != "" &&
            $contractFormData.read_abi_from != undefined
          ) {
            chainVerification($contractFormData.read_abi_from);
          } else {
            chainVerification($contractFormData.address);
          }
          return true;
        }
      }
    }
    if (formStep == 1.5) {
      return true;
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
        const res = await checkUniqueData("slug", $contractFormData.slug);
        if (res.data == false) {
          toast({
            title: "A contract with the same slug already exists.",
            status: "warning",
            duration: 3000,
            position: "top-right",
          });
          return false;
        } else {
          return true;
        }
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

  const validateEditSteps = async () => {
    if (formStep == 1) {
      if (
        $contractFormData.address != "" &&
        addressRegex.test($contractFormData.address) == false
      ) {
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

  const nextFormStep = async () => {
    if (formStep >= 4) {
      return;
    } else {
      if (await validateSteps()) {
        if (formStep == 1.5) {
          const blob = new Blob(
            [JSON.stringify($contractFormData.contract_abi)],
            {
              type: "application/json",
            }
          );
          const files = [new File([blob], "file.json")];
          // const syntheticEvent = createFileInputChangeEvent(file);
          // let e = { target: { files: [files[0]] } };
          // const cid = await deploytoLightHouse(files[0], setLoadingCallback);
          // console.log(cid);
          setFormStep(2);
        } else {
          console.log(formStep);
          setFormStep((currentStep: any) => currentStep + 1);
        }
      } else {
        return;
      }
    }
  };

  const nextFormEditStep = async () => {
    if (formStep >= 4) {
      return;
    } else {
      if (await validateEditSteps()) {
        setFormStep((currentStep: any) => currentStep + 1);
      } else {
        return;
      }
    }
  };

  const prevFormStep = () => {
    if (formStep <= 1) {
      return;
    } else if (formStep == 1.5) {
      setFormStep(1);
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
      id: _id,
      ownerAddress: $address,
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
        toast({
          title: "Contract Edited!!",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        if (window !== undefined) {
          window.sessionStorage.removeItem(contractPayload.slug);
        }
        setClear();
        router.reload();
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
      ownerAddress: $address,
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
        toast({
          title: "Contract created!",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        nextFormStep();
      });
    }
  };

  const lastStep = () => {
    const slug = $contractFormData.slug;
    modal.onClose();
    setClear();
    router.push(`/search/contracts/${slug}`);
  };

  const setClear = () => {
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
    });
    setFormStep(1);
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
    setLoadingCallback: setLoadingCallback,
    lastStep: lastStep,
    setClear: setClear,
    nextFormEditStep: nextFormEditStep,
  };
};
export default useContractCreate;
