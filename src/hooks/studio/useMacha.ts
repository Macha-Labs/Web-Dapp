import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { AuthInterface } from "@metaworklabs/macha-dev-sdk/lib/interfaces";
import { PublisherDataInterface } from "@metaworklabs/macha-dev-sdk/lib/interfaces/client";

import { fetchSigner, watchAccount } from "@wagmi/core";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useSigner } from "wagmi";

const useMacha = () => {
  // const $loadMacha = useMachaStore((state: any) => state.loadMacha);
  //   const $signer = useAuthStore((state: any) => state.signer);
  const [publisherExists, setPublisherExists] = useState<boolean>();
  const { data: signer } = useSigner();
  const $address = useAuthStore((state: any) => state.address);
  let macha: Macha;

  useEffect(() => {
    connectMachaPublisher();
  }, [signer, $address]);

  const createMachaPublisher = async (
    publisherData: PublisherDataInterface
  ) => {
    try {
      if (signer) {
        macha = new Macha({ owner: $address, signer: signer });
        console.log("create publisher called", macha);
        await macha?.createPublisher(publisherData);
      }
    } catch (error) {
      console.log("Error in createMachaPublisher", error);
    }
  };

  const connectMachaPublisher = async () => {
    if (signer) {
      macha = new Macha({ owner: $address, signer: signer });
      const machaCreated: any = await macha?.connectPublisher();
      console.log("macha created", machaCreated);
      setPublisherExists(machaCreated?.data?.data == null ? false : true);
    }
  };

  return {
    createMachaPublisher: createMachaPublisher,
    connectMachaPublisher: connectMachaPublisher,
    publisherExists: publisherExists,
  };
};

export default useMacha;
