import useAuthStore from "@/store/useAuthStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { AuthInterface } from "@metaworklabs/macha-dev-sdk/lib/interfaces";
import { PublisherDataInterface } from "@metaworklabs/macha-dev-sdk/lib/interfaces/client";

import { fetchSigner, watchAccount } from "@wagmi/core";
import { ethers } from "ethers";
import { useEffect } from "react";

const useMacha = () => {
  // const $loadMacha = useMachaStore((state: any) => state.loadMacha);
  //   const $signer = useAuthStore((state: any) => state.signer);
  let signer: any;
  useEffect(() => {
    const _fetchSigner = async () => {
      signer = await fetchSigner();
    };
    _fetchSigner();
    console.log("from usemacha");
  });
  const $address = useAuthStore((state: any) => state.address);

  const createMachaPublisher = async (
    publisherData: PublisherDataInterface
  ) => {
    try {
      const macha = new Macha({ owner: $address, signer: signer });
      console.log("macha class created");
      console.log(macha);
      await macha?.createPublisher(publisherData);
      console.log(await macha?.connectPublisher());
    } catch (error) {
      console.log("Error in createMachaPublisher", error);
    }
  };
  return {
    createMachaPublisher: createMachaPublisher,
  };
};

export default useMacha;
