import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import { CommonContext } from "../utilities/common.context";
import { debounce } from 'lodash';
import { deepEqual } from "../../utils/common";
import { listHelper } from "../../utils/common";

import {
  transactionsTransform,
  transactionsUpdateRequest,
} from "./transactions.service";

import { navigate } from '../../utils/navigationRef';

export const TransactionsContext = createContext();

export const TransactionsContextProvider = ({ children }) => {

  const {transactions:fetchedTransactions} = useContext(CommonContext);
  const [searchWord, setSearchWord] = useState(null);
  const [transactions, setTransactions] = useState(fetchedTransactions.data || []);
  const [transaction, setTransaction] = useState();
  const [totalPage, setTotalPage] = useState(fetchedTransactions.total || null);
  const [lastPage, setLastPage] = useState(fetchedTransactions.lastPage || 1);
  const [totalTransactionCount, setTotalTransactionCount] = useState(null);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  // const [activeSenderId, setActiveSenderId] = useState(null);
  // const [prevASenderId, setPrevActiveSenderId] = useState(null);
  // const [currentQuery, setCurrentQuery] = useState(null)
  const [lastTransactionId, setLastTransactionId] = useState(null);
  const [pdfUri, setPdfUri] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [transactionsWithKeyValue, setTransactionsWithKeyValue] = useState([]);
  const [limit, setLimit] = useState(6);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [prevFilterParams, setPrevFilterParams] = useState({});
  


  useEffect(() => {
    if (fetchedTransactions) {
      setTransactions(fetchedTransactions.data || []);
      setTotalTransactionCount(fetchedTransactions?.meta?.total || null);
      setTotalPage(fetchedTransactions?.meta?.total || null);
      setLastPage(fetchedTransactions?.meta?.lastPage || 1);
      setPage(fetchedTransactions?.meta?.currentPage  || 1)
      setHasMore(fetchedTransactions?.meta?.currentPage < fetchedTransactions?.meta?.lastPage);
    }
  }, [fetchedTransactions]);



const clearError = ()=>{

  return setError(null)
}

  const showErrorBorder = (newErr, prop)=>{
    //console.log(newErr)
    if(newErr){
      if(prop && newErr[prop]) return  {borderWidth:'2', borderColor:'red'};
    }
          return {};
          
      } 

     



  const LoadMoreTransactionData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveTransactions(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing in contect", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveTransactions(true, filterParams);
  };

const retrieveTransactions = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
  //setSearchWord(filterSearch);
  setIsLoading(true);

    console.log("filterParams & prev", filterParams, prevFilterParams);
    
    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;
    setPrevFilterParams(filterParams);

    console.log("scrolling for membebrs and current page", nextPage, lastPage, isRefreshing);

  try {
    const results = await service.get(Endpoints.TRANSACTION["INDEX"], {
      page: nextPage,
      limit: limit,
      ...filterParams,
    });
    const { data: apiTransactionList, meta: pagination } = results;
    
    setError(null);
    setIsLoading(false);
    setHasError(pagination.total === 0);

    if (pagination.total > 0) {
      setLastPage(pagination.lastPage);

    //  console.log(JSON.stringify(apiTransactionList, null, 2))

    if (isRefreshing || isFilterParamsChanged) {
      setTransactions(apiTransactionList);
      setPage(pagination.currentPage);
    } else {
      setTransactions((prevData) => [...prevData, ...apiTransactionList]);
    }
    setHasMore(pagination?.currentPage < pagination?.lastPage);

      // if (filterSearch) {
      //   transactionList = apiTransactionList;
      // }
     // setTransactions(transactionList);

      setTotalTransactionCount(pagination.total);
      setTotalPage(pagination.lastPage);
    }
  } catch (err) {
    console.log("Loading fetchSenders error", err);
    setError(err);
  }
  finally {
    setIsLoading(false);
    if (isRefreshing) setRefreshing(false);
  }
};




//update transaction

  const onTransactionUpdate = ( transactionId, transactionUpdateData) => {
    setError(null);
   

    const { rBank,rBankId, rIdentity, rIdentityId, rAccountNo, rTransferType,rTransferTypeKey, rName, rPhone } = transactionUpdateData

 

const updateData = {
                  "receiver_name":rName,
                  "receiver_phone":rPhone,
                  "receiver_bank":rBank,
                  "receiver_bank_id":rBankId,
                  "receiver_account_no":rAccountNo,
                  "receiver_identity":rIdentity,
                  "receiver_identity_id":rIdentityId,
                  "receiver_transfer_type_key":rTransferTypeKey,
                  "receiver_transfer_type":rTransferType
           }
          
    setIsLoading(true);
    
    transactionsUpdateRequest(transactionId, updateData)
    .then(transactionsTransform)
    .then((res) => {  
        setIsLoading(false);
        
        if(!res.errors){
             //return;
             setError(null);
            navigate("TransactionList")
         }
       
         if(res.errors){  
          errorMessage =  [].concat.apply([], Object.values(res.errors));
          errorMessage = errorMessage.join('\n')
          
          updatedError = {errorMessage,...res.errors};
          setError(updatedError);
        
          return;
        }
  })
      .catch((e) => {
        console.log(e)
  setIsLoading(false);
  setError(e.toString());
});
     
  };



  const handleDownloadAndShare = async (transactionId) => {
    try {
     

      await Sharing.shareAsync(Endpoints.TRANSACTION.RECEIPTDOWNLOAD(transactionId));
    } catch (error) {
      console.error('Error downloading PDF:', error);
     // Alert.alert('Error', 'Failed to download PDF');
    }
  };

  const submitTransactionReport = async (transaction, description) => {
    if (!description || !setSelectedImageUri) {
      Alert.alert("Error", "Please provide a description and attach an image.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("transactionId", transaction.id);
    formData.append("image", {
      uri: selectedImageUri,
      type: "image/jpeg", // you can dynamically get the type from the response if needed
      name: "report.jpg",
    });

    try {
        console.log(Endpoints.TRANSACTION["REPORTTRANSACTION"](transaction.transactionId), formData)
      const response = await service.post(Endpoints.TRANSACTION["REPORTTRANSACTION"](transaction.transactionId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Report submitted successfully!");
      } 
      navigate("TransactionList");
    } catch (error) {
      console.error("Error submitting report:", error);
      Alert.alert("Error", "Failed to submit the report.");
    }
  };

  const transactionStatusUpdate = async (status, transactionId) => {
    if (!status) {
      Alert.alert("Error", "Please provide a status");
      return;
    }

    try {
      const response = await service.put(Endpoints.TRANSACTION["STATUSUPDATE"](transactionId), {status}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTransactions((prevData) => listHelper.changeItem(prevData, response?.data, 'transactionId'));

      if (response.status === 200) {
        Alert.alert("Success", "Report submitted successfully!");
      } 
     // navigate("TransactionList");
    } catch (error) {
      console.error("Error submitting report:", error);
      Alert.alert("Error", "Failed to submit the report.");
    }
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImageUri(result.assets[0].uri);
      } else {
        Alert('You did not select any image.');
      }
  };



  return (
    <TransactionsContext.Provider
      value={{
        searchWord,
        setTransactions,
        retrieveTransactions,
        transactions,
        transaction,
        onTransactionUpdate,
        transactionStatusUpdate,
        // onTransactionRegister,
        isLoading,
        hasError,
        error,
        clearError,
        showErrorBorder,
        LoadMoreTransactionData,
        totalTransactionCount,
        totalAmount,
        transactionsWithKeyValue,
        handleDownloadAndShare,
        submitTransactionReport,
        handleImagePicker,
        prevFilterParams,
        refreshing,
        onRefresh,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
