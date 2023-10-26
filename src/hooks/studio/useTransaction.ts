import { timeStampConversion, truncateAddress } from "@/helpers";
import { contractDataBySlug, getAllTransactions, transactionData } from "@/service/ApiService";
import { useState } from "react";

const useTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const [latestTransactions, setLatestTransactions] = useState<any>();

  const [methodParams, setMethodParams] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async (transactionHash: any) => {
    transactionData(transactionHash).then((res: any) => {
      //console.log("contract not", res);
      const dateObj = timeStampConversion(res.data?.timestamp);
      const timestamp = `${dateObj.date} ${dateObj.time}`;
      contractDataBySlug(res?.data?.transaction?.contract_slug).then(
        (result) => {
          setIsLoading(false);
          setTransactionDetails([
            {
              key: "Block Hash",
              value: res.data?.transaction.block_hash,
              truncatedValue: truncateAddress(res.data?.transaction.block_hash),
              src: "/assets/icons/coloured-square-Block%20hash.svg",
              srcLight: "/assets/icons/square-Block-hash-light.svg",
            },
            {
              key: "Block Number",
              value: res.data?.transaction.block_number,
              src: "/assets/icons/coloured-square-Block%20number.svg",
              srcLight: "/assets/icons/square-Block%20number-light.svg",
            },
            {
              key: "Gas Used	",
              value: `${parseInt(res.data?.transaction.gas_used, 16)} `,
              src: "/assets/icons/coloured-square-gas-used.svg",
              srcLight: "/assets/icons/square-gas-used-light.svg",
            },
            {
              key: "Gas Price	",
              value: `${parseInt(res.data?.transaction.gas_price, 16) / 1000000000
                } gwei`,
              src: "/assets/icons/coloured-square-gas-price.svg",
              srcLight: "/assets/icons/square-gas-price-light.svg",
            },
            {
              key: "From",
              value: res.data?.transaction.from,
              truncatedValue: truncateAddress(res.data?.transaction.from),
              src: "/assets/icons/coloured-square-from.svg",
              srcLight: "/assets/icons/square-from-light.svg",
            },
            {
              key: "To",
              value: res.data?.transaction.to,
              truncatedValue: truncateAddress(res.data?.transaction.to),
              src: "/assets/icons/coloured-square-to.svg",
              srcLight: "/assets/icons/square-to-light.svg",
            },
            {
              key: "Txn Hash	",
              value: res.data?.transaction.txn_hash,
              truncatedValue: truncateAddress(res.data?.transaction.txn_hash),
              src: "/assets/icons/coloured-square-Txn%20Hash.svg",
              srcLight: "/assets/icons/square-Txn%20Hash-light.svg",
            },
            {
              key: "Method Name",
              value: res.data?.transaction.method_name,
              src: "/assets/icons/coloured-square-method%20name.svg",
              srcLight: "/assets/icons/square-method%20name-light.svg",
            },
            {
              key: "Method Id",
              value: res.data?.transaction.method_id,
              src: "/assets/icons/coloured-square-method-id.svg",
              srcLight: "/assets/icons/square-method-id-light.svg",
            },
            // {
            //   key: "Status",
            //   value: res.data?.transaction.status,
            //   src: "icons/svg/miscelleneous/coloured-square-status.svg?updatedAt=1690531992277",
            // },
            {
              key: "Time Stamp",
              value: timestamp,
              src: "/assets/icons/coloured-square-timestamp.svg",
              srcLight: "/assets/icons/square-timestamp-light.svg",
            },
            {
              name: result.data.contract.name,
              image: result.data.contract.image,
            },
          ]);
          setMethodParams(res.data?.transaction.method_params);
        }
      );
    });
  };

  const _fetchLatestTransactions = async () => {
    getAllTransactions().then((res: any) => {
      if (res.data) {
        //console.log(res.data, "latest txn");
        setLatestTransactions(res.data);
      } else {
        //console.log("Couldnt fetch");
      }
    });
  }

  return {
    transactionDetails: transactionDetails,
    methodParams: methodParams,
    isLoading: isLoading,
    _fetch: _fetch,
    _fetchLatestTransactions: _fetchLatestTransactions,
    latestTransactions: latestTransactions,
    setTransactionDetails: setTransactionDetails,
    setLatestTransactions: setLatestTransactions
  };
};

export default useTransaction;
