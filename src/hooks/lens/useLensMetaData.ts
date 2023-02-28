import { AuthContext } from "@/providers/AuthProvider";
// import { setProfileMetadata } from "helpers/lens/updateMetaData";
import { useContext, useEffect, useRef, useState } from "react";
import useLensAuth from "./useLensAuth";

const useLensMetaData = () => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [loadingText, setLoadingText] = useState<any>("Sending Request");
  const updateLens = useLensAuth();

  const name = useRef<any>();
  const bio = useRef<any>();
  const cover_picture = useRef<any>();
  const twitter = useRef<any>();
  const website = useRef<any>();
  const attributes = useRef<any>([]);
  const authContext = useContext(AuthContext);

  const sendDataToLens = async () => {
    try {
      setIsLoading(true);
      attributes.current = [];
      let metaData = {
        name: name?.current?.value ? name?.current?.value : "",
        bio: bio?.current?.value ? bio?.current?.value : "",
        cover_picture: cover_picture?.current?.value
          ? cover_picture?.current?.value
          : null,
      };
      if (website.current.value)
        attributes.current.push({
          traitType: "string",
          key: "website",
          value: website.current.value,
        });
      if (twitter.current.value)
        attributes.current.push({
          traitType: "string",
          key: "twitter",
          value: `https://twitter.com/${twitter.current.value}`,
        });
      let metadata_obj = { ...metaData, attributes: [...attributes?.current] };
      console.log(metadata_obj);
      console.log("The profile id is", authContext?.user?.profile?.id);
      // setProfileMetadata(metadata_obj, authContext?.user?.profile?.id).then(
      //   (txn: any) => {
      //     console.log(txn);
      //     setIsLoading(false);
      //   }
      // );
      //   await updateLens?.updateLensState();
    } catch (error) {
      console.log(error);
    }
  };

  const sendOnboardingMetaData = async () => {
    try {
      let metaData = {
        name: name?.current?.value,
        bio: bio?.current,
        cover_picture: cover_picture?.current,
      };
      attributes.current = [
        {
          traitType: "string",
          key: "sample",
          value: "sampleValue",
        },
      ];
      let metadata_obj = { ...metaData, attributes: attributes?.current };
      console.log(metadata_obj);
      // setProfileMetadata(metadata_obj, authContext?.user?.profile?.id).then(
      //   (txn: any) => {
      //     console.log(txn);
      //   }
      // );
      //   await updateLens?.updateLensState();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading: isLoading,
    loadingText: loadingText,
    sendDataToLens: sendDataToLens,
    name: name,
    bio: bio,
    cover_picture: cover_picture,
    twitter: twitter,
    website: website,
    attributes: attributes.current,
    sendOnboardingMetaData: sendOnboardingMetaData,
  };
};
export default useLensMetaData;
