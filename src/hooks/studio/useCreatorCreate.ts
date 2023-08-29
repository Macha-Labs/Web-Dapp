import useCreatorFormStore from "@/store/useCreatorFormStore";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import MachaMeta_ABI from "@/data/ABI/MachaMeta_ABI.json";
import { uploadTextToLighthouse } from "@/helpers/storage/lightHouseStorage";

const useCreatorCreate = () => {
  const [inputType, setInputType] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [tags, setTags] = useState<any>([]);
  const [tagString, setTagString] = useState<string>();
  const [suggestions, setSuggestions] = useState<any>([]);
  const [ipfsLoading, setIpfsLoading] = useState<any>(0);
  const [imageName, setImageName] = useState<any>();
  const toast = useToast();
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [contract, setContract] = useState<any>();

  const $creatorFormData = useCreatorFormStore(
    (state: any) => state.creatorFormData
  );
  const $loadCreatorFormData = useCreatorFormStore(
    (state: any) => state.loadCreatorFormData
  );

  const submit = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x7fc1139bBFd13bd63b9fc2D51E4834583371dAB1",
        MachaMeta_ABI,
        signer
      );
      console.log("contractData", contract);

      const tempMetaCID = {
        link: $creatorFormData.link,
        description: $creatorFormData.description,
        chain_id: $creatorFormData.chain_id,
      };
      const metaCID = await uploadTextToLighthouse(JSON.stringify(tempMetaCID));

      const tempSystemCID = {
        updatedAt: Date.now(),
        timeStamp: Date.now(),
        origin: "Macha WebApp",
      };
      const systemCID = await uploadTextToLighthouse(
        JSON.stringify(tempSystemCID)
      );

      contract.uploadMeta([metaCID],[systemCID],{gasLimit:50});
    }
  };

  const nextFormStep = async () => {
    if (step >= 2) {
      return;
    } else {
      if (validateSteps()) {
        setStep(step + 1);
      } else {
        return;
      }
    }
  };

  const validateSteps = () => {
    if (step == 1) {
      if (inputType == "" || inputType == undefined) {
        toast({
          title: "Please select the preferred option.",
          status: "warning",
          duration: 3000,
          position: "top-right",
        });
        return false;
      } else {
        if ($creatorFormData.link == "" || $creatorFormData.link == undefined) {
          toast({
            title: "Image cannot be empty.",
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
  };

  const setClear = () => {
    $loadCreatorFormData({
      link: "",
      description: "",
      chain_id: "",
      tags: "",
    });
    setStep(1);
  };

  const setLoadingCallback = (progressData: any) => {
    let percentageDone: any =
      100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log("percentage done: ", percentageDone);
    setIpfsLoading(percentageDone);
  };

  const handleTagRemove = (tag: any) => {
    const temp = tags;
    temp.splice(tags.indexOf(tag), 1);
    console.log("temp", temp);
    setTags([...temp]);
  };
  const handleTagAdd = (tagToAdd: any) => {
    if (!tags.includes(tagToAdd)) {
      setTags([...tags, tagToAdd]);
    }
    setTagString("");
    setSuggestions([]);
  };
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setTagString(value);

    if (value === "") {
      setSuggestions([]); // Clear hookCreatorCreate.suggestions when input is empty
    } else {
      // Generate hookCreatorCreate.suggestions based on value (you can replace this with your own logic)
      const newSuggestions = ["tag1", "tag2", "tag3"].filter((tag) =>
        tag.includes(value)
      );
      setSuggestions(newSuggestions);
    }
  };

  return {
    submit: submit,
    tags: tags,
    setTags: setTags,
    tagString: tagString,
    setTagString: setTagString,
    suggestions: suggestions,
    setSuggestions: setSuggestions,
    ipfsLoading: ipfsLoading,
    setLoadingCallback: setLoadingCallback,
    step: step,
    setStep: setStep,
    inputType: inputType,
    setInputType: setInputType,
    nextFormStep: nextFormStep,
    $creatorFormData: $creatorFormData,
    $loadCreatorFormData: $loadCreatorFormData,
    imageName: imageName,
    setImageName: setImageName,
    handleTagAdd: handleTagAdd,
    handleTagRemove: handleTagRemove,
    handleInputChange: handleInputChange,
    setClear: setClear,
  };
};
export default useCreatorCreate;
