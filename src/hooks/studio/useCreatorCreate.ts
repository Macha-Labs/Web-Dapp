import useCreatorFormStore from "@/store/useCreatorFormStore";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useCreatorCreate = () => {
    const [inputType, setInputType] = useState<string>("");
    const [step, setStep] = useState<number>(1);
    const [tags, setTags] = useState<any>([]);
    const [tagString, setTagString] = useState<string>();
    const [suggestions, setSuggestions] = useState<any>([]);
    const toast = useToast()
    const $creatorFormData = useCreatorFormStore(
        (state: any) => state.creatorFormData
    );
    const $loadCreatorFormData = useCreatorFormStore(
        (state: any) => state.loadCreatorFormData
    );

    const nextFormStep = async () => {
        if (step >= 2) {
            return;
        } else {
            if (validateSteps()) {
                setStep(step + 1)
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
                return false
            }
            else {
                if ($creatorFormData.link == "" || $creatorFormData.link == undefined) {
                    toast({
                        title: "Image cannot be empty.",
                        status: "warning",
                        duration: 3000,
                        position: "top-right",
                      });
                    return false
                }
                else {
                    return true
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
        setStep(1)
    };

    return {
        tags: tags,
        setTags: setTags,
        tagString: tagString,
        setTagString: setTagString,
        suggestions: suggestions,
        setSuggestions: setSuggestions,
        step: step,
        setStep: setStep,
        inputType: inputType,
        setInputType: setInputType,
        nextFormStep: nextFormStep,
        $creatorFormData: $creatorFormData,
        $loadCreatorFormData: $loadCreatorFormData,
        setClear: setClear
    };
};
export default useCreatorCreate;
