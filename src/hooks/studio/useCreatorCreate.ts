import useCreatorFormStore from "@/store/useCreatorFormStore";
import { useState } from "react";

const useCreatorCreate = () => {
    const [inputType, setInputType] = useState<string>("");
    const [step, setStep] = useState<number>(1);
    const [tags, setTags] = useState<any>([]);
    const [tagString, setTagString] = useState<string>();
    const [suggestions, setSuggestions] = useState<any>([]);
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
                return false
            }
            else {
                if ($creatorFormData.link == "" || $creatorFormData.link == undefined) {
                    return false
                }
                else {
                    return true
                }
            }
        }
    };


    const lastStep = () => {

    };

    const setClear = () => {

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
        $loadCreatorFormData: $loadCreatorFormData
    };
};
export default useCreatorCreate;
