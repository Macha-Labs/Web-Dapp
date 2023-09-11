import { config } from "@/config";
import { Alchemy, Network } from "alchemy-sdk";

// export const contractAddresses: any = {
//     "macha_calibration": config.MACHA_CALIBRATION_SBT_CONTRACT_ADDRESS,
//     "macha_mumbai": config.MACHA_MUMBAI_SBT_CONTRACT_ADDRESS,
//     "macha_goerli": config.MACHA_GOERLI_SBT_CONTRACT_ADDRESS,
//     "lens_polygon": "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d",
//     "ens_new": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
//     "ens_old": "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5",
//     "unstoppable_eth_mainnet" : "0x049aba7510f45BA5b64ea9E658E342F904DB358D",
//     "unstoppable_polygon_mainnet" : "0xa9a6A3626993D487d2Dbda3173cf58cA1a9D9e9f",
//     "poap_eth_mainnet": "0x22C1f6050E56d2876009903609a2cC3fEf83B415"
// }

export const checkUserXP: any = {
    //Claim Macha NFT on Polygon
    "64f3177eaf058d0786e3cd44": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.MATIC_MAINNET, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = config.MACHA_POLYGON_MAINNET_SBT_CONTRACT_ADDRESS;
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //alchemy does not support FVM yet, so goerli,
    //Claim Macha NFT on FVM
    "64f3177eaf058d0786e3cd45": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.ETH_GOERLI, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = config.MACHA_CALIBRATION_SBT_CONTRACT_ADDRESS;
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //check contract address for lens and the network,
    //Own a .lens handle
    "64f3177eaf058d0786e3cd46": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.MATIC_MAINNET, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d";
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //check contract address for ENS
    //Own an .ens handle
    "64f3177eaf058d0786e3cd47": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.ETH_MAINNET, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //check contract address for unstoppable
    //add the same for polygon
    //Own a domain from Unstoppable: eth mainnet
    "64f3177eaf058d0786e3cd48": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.ETH_MAINNET, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = "0x049aba7510f45BA5b64ea9E658E342F904DB358D";
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //check contract address for POAP
    //Collect atleast 1 Poap NFT
    "64f3177eaf058d0786e3cd49": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.ETH_MAINNET, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = "0x22C1f6050E56d2876009903609a2cC3fEf83B415";
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //Claim Macha NFT on Ethereum Goerli TestNet
    "64f9cba9916f18765edad0bb": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.ETH_GOERLI, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = config.MACHA_GOERLI_SBT_CONTRACT_ADDRESS;
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //Claim Macha NFT on Polygon TestNet
    "64f9cba9916f18765edad0ba": async (userAddress: any) => {
        if(userAddress){
            const configAlchemy = {
                apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
                network: Network.MATIC_MUMBAI, // Replace with your network
            };
            const alchemy = new Alchemy(configAlchemy);
            const address = config.MACHA_MUMBAI_SBT_CONTRACT_ADDRESS;
            const owner = userAddress;
    
            const response = await alchemy.nft.verifyNftOwnership(owner, address)
            console.log("nftOwnership",response)
            return response
        }
        else{
            console.log("user address",userAddress)
        }
    },
    //check contract address for Mirror
    //Publish on Mirror.xyz
    // "64f3177eaf058d0786e3cd50": async (userAddress: any) => {
    //     if(userAddress){
    //         const configAlchemy = {
    //             apiKey: config.ALCHEMY_API_KEY, // Replace with your API key
    //             network: Network.ETH_MAINNET, // Replace with your network
    //         };
    //         const alchemy = new Alchemy(configAlchemy);
    //         const address = "0x22C1f6050E56d2876009903609a2cC3fEf83B415"; //same address used as POAP
    //         const owner = userAddress;
    
    //         const response = await alchemy.nft.verifyNftOwnership(owner, address)
    //         console.log("nftOwnership",response)
    //         return response
    //     }
    //     else{
    //         console.log("user address",userAddress)
    //     }
    // },
    
}