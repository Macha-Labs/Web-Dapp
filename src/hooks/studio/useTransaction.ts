import { useEffect, useState } from "react";
import { transactionData } from "@/service/ApiService";

const useTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const [methodParams, setMethodParams] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async (transactionHash: any) => {
    transactionData(transactionHash).then((res: any) => {
      console.log("contract not", res);
      setIsLoading(false);
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
      setMethodParams(res.data[0].transaction.method_params);
    });
  };

  return {
    transactionDetails: transactionDetails,
    methodParams: methodParams,
    isLoading: isLoading,
    _fetch: _fetch,
  };
};

export default useTransaction;
