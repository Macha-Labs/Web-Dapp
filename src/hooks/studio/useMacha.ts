import { useState } from "react";
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
  const [publisherExists, setPublisherExists] = useState<boolean>();
  let signer: any;
  useEffect(() => {
    const _fetchSigner = async () => {
      signer = await fetchSigner();
    };
    _fetchSigner();
    console.log("from usemacha");
  });

  const $address = useAuthStore((state: any) => state.address);
  const macha = new Macha({ owner: $address, signer: signer });

  const createMachaPublisher = async (
    publisherData: PublisherDataInterface
  ) => {
    try {
      await macha?.createPublisher(publisherData);
    } catch (error) {
      console.log("Error in createMachaPublisher", error);
    }
  };

  const connectMachaPublisher = async () => {
    const machaCreated = (await macha?.connectPublisher()) ? true : false;
    setPublisherExists(machaCreated);
  };
  return {
    createMachaPublisher: createMachaPublisher,
    connectMachaPublisher: connectMachaPublisher,
    publisherExists: publisherExists,
  };
};

export default useMacha;
