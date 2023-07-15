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
