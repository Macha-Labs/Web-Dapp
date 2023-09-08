import useAuthStore from "@/store/useAuthStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { PublisherDataInterface } from "@metaworklabs/macha-dev-sdk/lib/interfaces/client";
import { useState } from "react";
import { connect } from "@wagmi/core";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { useEffect } from "react";
import { useAccount, useSigner } from "wagmi";
import { filecoinCalibration, polygon, mainnet, polygonMumbai, optimism, filecoin, goerli } from "wagmi/chains";

const useMacha = () => {
  // const $loadMacha = useMachaStore((state: any) => state.loadMacha);
  //   const $signer = useAuthStore((state: any) => state.signer);
  const [publisherExists, setPublisherExists] = useState<boolean>(false);
  const { data: signer } = useSigner();
  const $address = useAuthStore((state: any) => state.address);
  let macha: Macha;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isConnected } = useAccount();

  useEffect(() => {
    const _fetch = async () => {
      if (window !== undefined) {
        const res = window.sessionStorage.getItem("macha.connected");
        if (res) {
          if (JSON.parse(res) == true) {
            console.log("reconnecting wallet");
            if (!isConnected) {
              const result = await connect({
                connector: new InjectedConnector({
                  chains: [filecoinCalibration, mainnet, polygon, polygonMumbai,goerli,optimism,filecoin],
                }),
              });
            }
          }
        }
      }
    };
    _fetch();
  }, []);

  useEffect(() => {
    connectMachaPublisher();
  }, [signer, $address]);

  useEffect(() => {
    if (window !== undefined) {
      const res = window.sessionStorage.setItem(
        "macha.connected",
        JSON.stringify(isConnected)
      );
    }
  }, [isConnected]);

  const createMachaPublisher = async (
    publisherData: PublisherDataInterface
  ) => {
    try {
      if (signer) {
        macha = new Macha({ owner: $address, signer: signer });
        console.log("create publisher called", macha);
        const res = await macha?.createPublisher(publisherData);
        await connectMachaPublisher();
        window.localStorage.setItem("machaIsPublisher", JSON.stringify(true));
        return res;
      }
    } catch (error) {
      console.log("Error in createMachaPublisher", error);
      return error;
    }
  };

  const checkMachaPublisher = async () => {
    if (signer) {
      macha = new Macha({ owner: $address, signer: signer });
      const machaCreated: any = await macha?.connectPublisher();
      console.log("macha created", machaCreated);
      setPublisherExists(machaCreated?.data?.data == null ? false : true);
      const connectedAddress = $address;
      if (machaCreated?.data?.data != null) {
        let data = null;
        if (window.localStorage !== undefined) {
          data = window.localStorage.getItem("machaIsPublisher");
          if (data != null) {
            data = JSON.parse(data);
            window.localStorage.setItem(
              "machaIsPublisher",
              JSON.stringify({
                ...data,
                [connectedAddress]: true,
              })
            );
          } else {
            window.localStorage.setItem(
              "machaIsPublisher",
              JSON.stringify({
                [connectedAddress]: true,
              })
            );
          }
        }
      }
    }
  };

  const connectMachaPublisher = () => {
    if (window.localStorage !== undefined) {
      const data = window.localStorage.getItem("machaIsPublisher");
      if (data !== null) {
        console.log("local data", JSON.parse(data));
        const res = JSON.parse(data);
        if (res[$address] == true) {
          setPublisherExists(true);
        } else {
          checkMachaPublisher();
        }
      } else {
        checkMachaPublisher();
      }
    } else {
      checkMachaPublisher();
    }
    setIsLoading(false);
  };

  return {
    createMachaPublisher: createMachaPublisher,
    connectMachaPublisher: connectMachaPublisher,
    publisherExists: publisherExists,
    isLoading: isLoading,
  };
};

export default useMacha;
