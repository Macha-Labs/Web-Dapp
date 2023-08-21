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

export const getLatestTransactions = async () => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetchLatest`
  );
  const data = await response.json();
  return data;
};

export const getAllTransactions = async () => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetchAll`
  );
  const data = await response.json();
  return data;
};


export const searchAllMetas = async (searchTerm: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/metas/fetch-by-search/${searchTerm}?limit=30`
  );
  if(response.status == 200){
    console.log("response search api",response)
    const data = await response.json();
    return data;
  }
  else{
    return {
      error: "Not found"
    }
  }
};

export const contractData = async (contractName: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetch-by-name/${contractName}`
  );
  const data = await response.json();
  return data;
};

export const contractsByUserAddress = async (userAddress: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/user-contracts/${userAddress}`
  );
  try{
    const data = await response.json();
    return data;
  }
  catch(err){
    console.log(err);
    return undefined
  }
};

export const contractDataBySlug = async (contractSlug: string) => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/fetch-by-slug/${contractSlug}`
  );
  const data = await response.json();
  return data;
};

export const contractDataByAddress = async (contractAddress: any) => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/fetch-by-address/${contractAddress}`
  );
  const data = await response.json();
  return data;
};

export const txnDataBySlug = async (contractSlug: string, page: number) => {
  try {
    const response = await fetch(
      `${config.metaServer}/indexer/transactions/fetch-by-slug/${contractSlug}?page=${page}`
    );
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.log(err)
  }
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

export const createNewPublisher = async (data: any, type: string) => {
  let url = `${config.metaServer}/indexer/publishers/create`
  if (type == "Individual") {
    url = `${config.metaServer}/indexer/publishers/create`
  }
  else if (type == "Organization") {
    url = `${config.metaServer}/indexer/publishers/create?type=org`
  }
  console.log(data)
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }
  );
  console.log("new publisher created ", response);
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

export const txnByChainId = async (chain_id: any, page: any) => {
  let url = `${config.metaServer}/indexer/transactions/fetch-by-chain-id/${chain_id}?page=${page}`
  const response = await fetch(url);
  if(response.status == 200){
    const data = await response.json();
    return data;
  }
  else{
    return {
      error: "Not found"
    }
  }
};

export const txnByUserAddress = async (from_address: any, page: any) => {
  const response = await fetch(
    `${config.metaServer}/indexer/transactions/fetch-by-user-address/${from_address}?page=${page}`
  );
  const data = await response.json();
  return data;
};

export const checkUniqueData = async (dataType: any, searchData: any) => {
  const response = await fetch(
    `${config.metaServer}/indexer/contracts/check-data?type=${dataType}&data=${searchData}`
  );
  const data = await response.json();
  return data;
};

// /indexer/transactions/fetch-by-user-address/:from_address

// /indexer/transactions/fetch-by-chain-id/:chain_id

