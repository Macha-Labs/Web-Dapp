import { ethers } from "ethers";
import { gql } from '@apollo/client'
import useApollo from "./useApollo";
import useIpfs from "./useIpfs";


const useAPI = () => {
    const hookApollo = useApollo();
    const hookIpfs = useIpfs();

    const callContract = async (contractAddress, contractABI, signer, functionName, functionParams) => {
        console.log('I am inside action on contract');
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(contract, functionParams);

        let promise = new Promise(async function (resolve, reject) {
            try {
                const tx = await contract[functionName](
                   ...functionParams
                )
                const receipt = await tx.wait();
                console.log("Txn Created", tx.hash);
                resolve(receipt);
            } catch (error) {
                reject(error);
            }
        })
        return promise;
    }

    const callIpfsWithContract = async (ipfsFile, ipfsName, contractAddress, contractABI, signer, functionName, functionParams) => {
        const ipfsMeta: any = await hookIpfs.store(ipfsFile, ipfsName);
        functionParams.push(ipfsMeta.url);
        const promise = callContract(contractAddress, contractABI, signer, functionName, functionParams)
        return promise;
    }

    const callGraphQuery = async (graphURL, graphSchema, graphQuery) => {
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