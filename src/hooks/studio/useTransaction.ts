import { useEffect, useState } from "react";
import {
  transactionData,
} from "@/service/ApiService";

const useTransaction = (transactionHash: any) => {
  const [transactionDetails, setTransactionDetails] = useState<any>();

  useEffect(() => {
    _fetch(transactionHash)
  },[])

  const _fetch = async (transactionHash: any) => {
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

  return {
    transactionDetails: transactionDetails,
  };
};

export default useTransaction;
