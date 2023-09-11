import { config } from "@/config";
import { alchemyNetworksData } from "@/data/studio/constant";
import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";

const useAlchemy = () => {
  const [latestBlock, setLatestBlock] = useState<any>("");
  const [nftByAddress, setNftByAddress] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchFilteredNftsByAddress, setSearchFilteredNftsByAddress] =
    useState<any>(nftByAddress);
  const [searchString, setSearchString] = useState<any>("");

  const alchemyData = async () => {
    const settings = {
      apiKey: config.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);
  };

  const getLatestBlockByChainId = async (chain_id: number) => {
    const settings = {
      apiKey: config.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
      network: alchemyNetworksData[chain_id],
    };
    const alchemy = new Alchemy(settings);
    const _latestBlock = await alchemy.core.getBlockNumber();
    setLatestBlock(_latestBlock);
  };
  // const verifyNftOwner = (owner:string,contractAddress:string)=>{
  //   const settings = {
  //     apiKey: config.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  //     network: alchemyNetworksData[chain_id],
  //   };
  // }

  const getNftsByAddress = async (address: any, chains: any) => {
    const nftPromises = Object.keys(chains).map(async (chain: any) => {
      const settings = {
        apiKey: "vnA-7rIYqhwArKLfBN_qAu7XCquJ0Sw-", // Replace with your Alchemy API Key.
        network: chains[chain].alchemyChain,
      };
      const alchemy = new Alchemy(settings);
      const nfts = await alchemy.nft.getNftsForOwner(address);
      return nfts.ownedNfts;
    });

    try {
      const nftArrays = await Promise.all(nftPromises);
      const combinedNfts = nftArrays.flat(); // Flatten the arrays
      setNftByAddress(combinedNfts);
      setSearchFilteredNftsByAddress(combinedNfts);
      setIsLoading(false);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching NFTs:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (inputValue: string) => {
    const filtered = nftByAddress.filter((item: any) => {
      return item.contract.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });
    setSearchFilteredNftsByAddress(filtered);
  };

  useEffect(() => {
    handleSearch(searchString);
  }, [searchString]);

  return {
    alchemyData: alchemyData,
    getLatestBlockByChainId: getLatestBlockByChainId,
    latestBlock: latestBlock,
    getNftsByAddress: getNftsByAddress,
    nftByAddress: nftByAddress,
    isLoading: isLoading,
    handleSearch: handleSearch,
    searchString: searchString,
    searchFilteredNftsByAddress: searchFilteredNftsByAddress,
    setSearchString: setSearchString,
  };
};
export default useAlchemy;
