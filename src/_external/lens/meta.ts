import { useRouter } from "next/router";
import { ethers } from "ethers";
import { graphQuery } from "@/service/MetaService";
import { useEffect } from "react";

export const useMetaLens = () => {
    const router = useRouter();

    useEffect(() => {
        // console.log("posaph", hookGraph);
        const fetchData = async () => {
          if (router.isReady) {
            if (metaId) {
              if (address) {
                const actorProfileId = await getActorProfileId(address);
                const id = metaId.toString().split("-");
                const profileId = parseInt(id[0]);
                const publicationId = parseInt(id[1]);
                let actionModuleData = abiCoder.encode(["address"], [address]);
                actionModuleData =
                  actionModuleData +
                  "0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
                setArgs([
                  profileId,
                  publicationId,
                  actorProfileId,
                  [],
                  [],
                  "0x0D90C58cBe787CD70B5Effe94Ce58185D72143fB",
                  actionModuleData,
                ]);
                console.log("args", [
                  profileId,
                  publicationId,
                  actorProfileId,
                  [],
                  [],
                  "0x0D90C58cBe787CD70B5Effe94Ce58185D72143fB",
                  actionModuleData,
                ]);
              }
              if (typeof window !== "undefined" && window.ethereum) {
                const provider = new ethers.providers.Web3Provider(
                  window?.ethereum as ethers.providers.ExternalProvider
                );
                const signer = provider.getSigner();
                setContract(
                  new ethers.Contract(
                    "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d",
                    lenshubAbi,
                    signer
                  )
                );
              }
              await hookGraph._fetch(metaId, metaType);
    
              // console.log("window.ethereum defined", contract);
            }
          }
        };
        fetchData();
      }, [metaId, address, metaType]);
    
      const getActorProfileId = async (address: any) => {
        const data = {
          data: address,
        };
        const res = await graphQuery("lens_id", data);
        return parseInt(res?.modified?.lensId);
      };
}