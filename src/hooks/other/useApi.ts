import { ethers } from "ethers";
import { gql } from '@apollo/client'
import useApollo from "./useApollo";
import useIpfs from "./useIpfs";


const useAPI = () => {
    const hookApollo = useApollo();
    const hookIpfs = useIpfs();

    const callContract = async (contractAddress: any, contractABI: any, signer: any, functionName: any, functionParams: any) => {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        let promise = new Promise(async function (resolve, reject) {
            try {
                const tx = await contract[functionName](
                   ...functionParams
                )
                const receipt = await tx.wait();
                resolve(receipt);
            } catch (error) {
                reject(error);
            }
        })
        return promise;
    }

    const callIpfsWithContract = async (ipfsFile: any, ipfsName: any, contractAddress: any, contractABI: any, signer: any, functionName: any, functionParams: any) => {
        const ipfsMeta: any = await hookIpfs.store(ipfsFile, ipfsName);
        functionParams.push(ipfsMeta.url);
        const promise = callContract(contractAddress, contractABI, signer, functionName, functionParams)
        return promise;
    }

    const callGraphQuery = async (graphURL: any, graphSchema: any, graphQuery: any) => {
        return await hookApollo.client(graphURL).query(
          {
            query: gql(graphSchema),
            variables: {
              request: graphQuery
            },
          }
        )
      }
      

    return {
        actionOnContract: callContract,
        withIPFSOnContract: callIpfsWithContract,
        callGraph: callGraphQuery
    }
}

export default useAPI;