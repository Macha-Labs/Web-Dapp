import { useEffect, useState } from "react";
import { allContracts, contractData, contractDataBySlug, transactionData } from "@/service/ApiService";
import useContractStore from "@/store/useContractStore";

const useTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const [contractDetails, setContractDetails] = useState<any>();
  const $loadAllContractDetails = useContractStore((state: any) => state.loadAllContractDetails);
  const [allContractDetails,setAllContractDetails] = useState([]);

  const fetchTransactionData = async (transactionHash: any) => {
    transactionData(transactionHash).then((res: any) => {
      console.log("contract not", res);
      setTransactionDetails([
        { key: "Block Hash", value: res.data[0].transaction.block_hash },
        { key: "Block Number", value: res.data[0].transaction.block_number },
        { key: "Gas Used	", value: res.data[0].transaction.gas_used },
        { key: "Gas Price	", value: res.data[0].transaction.gas_price },
        { key: "From", value: res.data[0].transaction.from },
        { key: "To", value: res.data[0].transaction.to },
        { key: "Txn Hash	", value: res.data[0].transaction.txn_hash },
        { key: "Method Name", value: res.data[0].transaction.method_name },
        { key: "Method Id", value: res.data[0].transaction.method_id },
        { key: "Status", value: res.data[0].transaction.status },
        { key: "Time Stamp", value: res.data[0].timestamp },
      ]);
    });
  };

  const fetchContractData = async (contract_slug: any) => {
    contractDataBySlug(contract_slug).then((res: any) => {
      console.log("contract fetching", res);
      setContractDetails(res.data);
    });
  };

  const fetchAllContracts = async () => {
    allContracts().then((res: any) => {
      console.log("all contract data from use transaction", res.data);
      setAllContractDetails(res.data)
    });
  };

  return {
    transactionDetails: transactionDetails,
    contractDetails: contractDetails,
    fetchTransactionData: fetchTransactionData,
    fetchAllContracts: fetchAllContracts,
    allContractDetails: allContractDetails,
    fetchContractData: fetchContractData
  };
};

export default useTransaction;
