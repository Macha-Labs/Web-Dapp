import { timeStampConversion, truncateAddress } from "@/helpers";
import { contractDataBySlug, transactionData } from "@/service/ApiService";
import { useState } from "react";

const useTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const [methodParams, setMethodParams] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async (transactionHash: any) => {
    transactionData(transactionHash).then((res: any) => {
      console.log("contract not", res);
      const dateObj = timeStampConversion(res.data?.timestamp);
      const timestamp = `${dateObj.date} ${dateObj.time}`;
      contractDataBySlug(res?.data?.transaction?.contract_slug).then(
        (result) => {
          setIsLoading(false);
          setTransactionDetails([
            {
              key: "Block Hash",
              value: truncateAddress(res.data?.transaction.block_hash),
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-Block%20hash.svg?updatedAt=1690531997153",
            },
            {
              key: "Block Number",
              value: res.data?.transaction.block_number,
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-Block%20number.svg?updatedAt=1690531994002",
            },
            {
              key: "Gas Used	",
              value: `${
                parseInt(res.data?.transaction.gas_used, 16) / 1000000000
              } gwei`,
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-gas-used.svg?updatedAt=1690531997273",
            },
            {
              key: "Gas Price	",
              value: `${
                parseInt(res.data?.transaction.gas_price, 16) / 1000000000
              } gwei`,
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-gas-price.svg?updatedAt=1690531997359",
            },
            {
              key: "From",
              value: truncateAddress(res.data?.transaction.from),
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-from.svg?updatedAt=1690531994355",
            },
            {
              key: "To",
              value: truncateAddress(res.data?.transaction.to),
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-to.svg?updatedAt=1690531993977",
            },
            {
              key: "Txn Hash	",
              value: truncateAddress(res.data?.transaction.txn_hash),
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-Txn%20Hash.svg?updatedAt=1690531994352",
            },
            {
              key: "Method Name",
              value: res.data?.transaction.method_name,
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-method%20name.svg?updatedAt=1690531992082",
            },
            {
              key: "Method Id",
              value: res.data?.transaction.method_id,
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-method-id.svg?updatedAt=1690531995476",
            },
            // {
            //   key: "Status",
            //   value: res.data?.transaction.status,
            //   src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-status.svg?updatedAt=1690531992277",
            // },
            {
              key: "Time Stamp",
              value: timestamp,
              src: "https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-square-timestamp.svg?updatedAt=1690531993904",
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

  return {
    transactionDetails: transactionDetails,
    methodParams: methodParams,
    isLoading: isLoading,
    _fetch: _fetch,
  };
};

export default useTransaction;
