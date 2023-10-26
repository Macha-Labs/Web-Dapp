import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const useNftData = () => {
  const [totalNfts, setTotalNfts] = useState(0);
  const [nftData, setNftdata] = useState<any>([]);
  useEffect(() => {
    alchemydata();
  }, []);
  const alchemydata = async () => {
    const settings = {
      apiKey: "vnA-7rIYqhwArKLfBN_qAu7XCquJ0Sw-",
      network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(settings);
    const ownerAddr = "0xB9C42D7c17583C261bA1aDeBe96447Ba29cA75D6";
    try {
      const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);
      setTotalNfts(nftsForOwner.totalCount);
      const nftData = await Promise.all(
        nftsForOwner.ownedNfts.map(async (nft) => {
          const response = await alchemy.nft.getNftMetadata(
            nft.contract.address,
            nft.tokenId
          );
          //console.log("responses", response);
          return {
            contractAddress: nft.contract.address,
            tokenId: nft.tokenId,
            nftName: response?.title,
            tokenType: response.tokenType,
            timeLastUpdated: response.timeLastUpdated,
            imageUrl: response?.rawMetadata?.image,
            floorPrice: response?.contract?.openSea?.floorPrice,
          };
        })
      );

      setNftdata(nftData);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    }
  };

  return {
    totalNfts: totalNfts,
    nftData: nftData,
  };
};
export default useNftData;
