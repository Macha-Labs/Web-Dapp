import { config } from "../config";

export const fetchAllApis = async () => {
  const response = await fetch(`${config.metaServer}/api/fetchAll`);
  const data = await response.json();
  return data;
};

export const transactionData = async (transactionHash: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetch-by-hash/${transactionHash}`
  );
  const data = await response.json();
  return data;
};

export const contractData = async (contractName: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetch-by-name/${contractName}`
  );
  const data = await response.json();
  return data;
};

export const contractDataBySlug = async (contractSlug: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/fetch-by-slug/${contractSlug}`
  );
  const data = await response.json();
  return data;
};
export const txnDataBySlug = async (contractSlug: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetch-by-slug/${contractSlug}`
  );
  const data = await response.json();
  return data;
};

export const allContracts = async () => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/fetchAll`
  );
  const data = await response.json();
  return data;
};

export const createNewContract = async (data: any) => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/edit-upload`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("form create new contract ", response);
  return response.json();
};

export const deleteContract = async (contract_id: any) => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/delete/${contract_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Deleted Contract", response);
  return response.json();
};

export const txnByChainId = async (chain_id: any,cursor: any) => {
  let url = `${config.metaServer}/indexer/transactions/fetch-by-chain-id/${chain_id}`
  if(cursor != 1){
    url = `${config.metaServer}/indexer/transactions/fetch-by-chain-id/${chain_id}?cursor=${cursor}`
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const txnByUserAddress = async (from_address: any) => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetch-by-user-address/${from_address}`
  );
  const data = await response.json();
  return data;
};

// /indexer/transactions/fetch-by-user-address/:from_address

// /indexer/transactions/fetch-by-chain-id/:chain_id
