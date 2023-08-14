import { contractDataBySlug, contractsByUserAddress, deleteContract } from "@/service/ApiService";
import useContractFormStore from "@/store/useContractFormStore";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const useContract = () => {

  const [contractDetails, setContractDetails] = useState<any>();
  const [userContracts, setUserContracts] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUserContractsLoading, setIsUserContractsLoading] = useState<boolean>(true);
  const toast = useToast();
  const router = useRouter()
  const $loadContractFormData = useContractFormStore((state: any) => state.loadContractFormData);

  const _fetch = async (contract_slug: any) => {
    setIsLoading(true)
    if (window.sessionStorage !== undefined) {
      const data = window.sessionStorage.getItem(contract_slug);
      if (data !== null) {
        setContractDetails(JSON.parse(data))
        setIsLoading(false)
      }
      else {
        contractDataBySlug(contract_slug).then((res: any) => {
          window.sessionStorage.setItem(contract_slug, JSON.stringify(res.data))
          setContractDetails(res.data);
          setIsLoading(false)
        });
      }
    }
    else {
      contractDataBySlug(contract_slug).then((res: any) => {
        window.sessionStorage.setItem(contract_slug, res.data)
        setContractDetails(res.data);
        setIsLoading(false)
      });
    }
  };

  const _fetchEdit = async (contract_slug: any) => {
    setIsLoading(true)
    contractDataBySlug(contract_slug).then((res: any) => {
      window.sessionStorage.setItem(contract_slug, JSON.stringify(res.data))
      setContractDetails(res.data);
      $loadContractFormData(res.data.contract)
      $loadContractFormData({
        interested_events: res.data.contract.interested_events.join(),
      })
      $loadContractFormData({
        interested_methods: res.data.contract.interested_methods.join(),
      })
      setIsLoading(false)
    });
  };

  const contractDelete = async (contract_id: any) => {
    setIsLoading(true)
    deleteContract(contract_id).then((res: any) => {
      toast({
        title: "Contract Deleted!!",
        status: "success",
        duration: 3000,
        position: "top-right"
      });
      setIsLoading(false)
      setClear()
    });
  };

  const _fetchUserContracts = async (userAddress: any) => {
    setIsUserContractsLoading(true)
    contractsByUserAddress(userAddress).then((res: any) => {
      if(res && res.data){
        setUserContracts(res.data)
      }
      else{
        setUserContracts(undefined)
      }
      setIsUserContractsLoading(false)
    })
    setIsUserContractsLoading(false)
  }

  const setClear = () => {
    setContractDetails(undefined)
    setIsLoading(true)
  }

  return {
    contractDetails: contractDetails,
    isLoading: isLoading,
    _fetch: _fetch,
    contractDelete: contractDelete,
    _fetchEdit: _fetchEdit,
    _fetchUserContracts: _fetchUserContracts,
    userContracts: userContracts,
    setClear: setClear,
    isUserContractsLoading: isUserContractsLoading
  }

}
export default useContract