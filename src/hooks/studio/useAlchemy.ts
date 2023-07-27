import { Alchemy, Network } from "alchemy-sdk";
import {useState} from "react";

const useAlchemy = () => {

  const [latestBlock,setLatestBlock] = useState<any>("");

  const alchemyData = async () => {
    const settings = {
      apiKey: "vnA-7rIYqhwArKLfBN_qAu7XCquJ0Sw-", // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    // Print owner's wallet address:
    const ownerAddr = "vitalik.eth";
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");

    const nftsForOwner = await alchemy.nft.getNftsForOwner("vitalik.eth");
    console.log("number of NFTs found:", nftsForOwner.totalCount);
    console.log("...");

    // Print contract address and tokenId for each NFT:
    for (const nft of nftsForOwner.ownedNfts) {
      console.log("===");
      console.log("contract address:", nft.contract.address);
      console.log("token ID:", nft.tokenId);
    }
    console.log("===");

    // Fetch metadata for a particular NFT:
    console.log("fetching metadata for a Crypto Coven NFT...");
    const response = await alchemy.nft.getNftMetadata(
      "0x5180db8F5c931aaE63c74266b211F580155ecac8",
      "1590"
    );

    // Uncomment this line to see the full api response:
    console.log(response);

    // Print some commonly used fields:
    console.log("NFT name: ", response.title);
    console.log("token type: ", response.tokenType);
    // console.log("tokenUri: ", response.tokenUri.gateway);
    // console.log("image url: ", response.rawMetadata.image);
    console.log("time last updated: ", response.timeLastUpdated);
    console.log("===");
  };

  const getLatestBlockByChainId = async (chain_id: number) => {
    const settings = {
      apiKey: "vnA-7rIYqhwArKLfBN_qAu7XCquJ0Sw-", // Replace with your Alchemy API Key.
      network: chain_id == 1 ? Network.ETH_MAINNET : Network.MATIC_MAINNET, // Replace with your network.
    };
    const alchemy = new Alchemy(settings);
    const _latestBlock = await alchemy.core.getBlockNumber();
    setLatestBlock(_latestBlock)
  }

  return {
    alchemyData: alchemyData,
    getLatestBlockByChainId: getLatestBlockByChainId,
    latestBlock: latestBlock
  }
};
export default useAlchemy;
