import { useEffect, useState } from "react";
import { contractData, transactionData } from "@/service/ApiService";

const useTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const [contractDetails, setContractDetails] = useState<any>();

  const fetchTransactionData = async () => {
    transactionData(
      "0x988fbdbf016968ac86f18777d84b69a9de92a32d842d4ca693a36e43e38f310e"
    ).then((res: any) => {
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

  const fetchContractData = async () => {
    contractData("Opensea").then((res: any) => {
      console.log("contract fetching", res);
      setContractDetails(res.data);
    });
  };

  useEffect(() => {
    fetchTransactionData();
    fetchContractData();
  }, []);
  return {
    transactionDetails: transactionDetails,
    contractDetails: contractDetails,
  };
};

export default useTransaction;
