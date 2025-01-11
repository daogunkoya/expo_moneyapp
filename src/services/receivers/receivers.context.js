import React, { useState, useContext, createContext, useEffect, useCallback } from "react";

import { combineList, replaceItemFromList } from "../../utils/common";
import { navigate } from "../../utils/navigationRef";
import service from "../../utils/request";
import Endpoints from "../../utils/apis";
import { useNavigation } from '@react-navigation/native';
import { CommonContext } from "../utilities/common.context";
import { deepEqual } from "../../utils/common";
import { debounce } from 'lodash';
import { listHelper } from "../../utils/common";

export const ReceiversContext = createContext();

export const ReceiversContextProvider = ({ children }) => {
  const { receivers:fetchedReceivers, limit:fetchedLimit } = useContext(CommonContext);
  const navigation = useNavigation();

  const [searchWord, setSearchWord] = useState(null);
  const [fetchFilterParams, setFetchFilterParams] = useState({});
  const [receivers, setReceivers] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [identityList, setIdentityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);

  const [activeSenderId, setActiveSenderId] = useState(null);
  const [activeSender, setActiveSender] = useState(null);
  const [prevASenderId, setPrevActiveSenderId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalReceiverCount, setTotalReceiverCount] = useState(null);
  const [receiversWithKeyValue, setReceiversWithKeyValue] = useState([]);
  const [limit, setLimit] = useState(5);

  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [prevFilterParams, setPrevFilterParams] = useState({});

  const [accountDetails, setAccountDetails] = useState({});

  const showErrorBorder = (newErr, prop) => {
    //console.log(newErr)
    if (newErr) {
      if (prop && newErr[prop]) return { borderWidth: "2", borderColor: "red" };
    }
    return {};
  };

  useEffect(() => {
    if (fetchedReceivers?.meta?.total > 0) {
      setReceivers(fetchedReceivers.data || []);
      setTotalPage(fetchedReceivers?.meta?.total || null);
      setLastPage(fetchedReceivers?.meta?.lastPage || 1);
      setPage(fetchedReceivers?.meta?.currentPage || 1);
      setLimit(fetchedReceivers?.meta?.perPae);
      setActiveSenderId(fetchedReceivers?.data?.[0]?.senderId || null);
      setPrevActiveSenderId(fetchedReceivers?.data?.[0]?.senderId || null);
    }
  }, [fetchedReceivers]);

  //set active sebder here
  const setActiveSenderInUse = (sender) => {
    setActiveSender(sender);
  };

  //clear receivers into null

  const clearReceivers = () => {
    setReceiversWithKeyValue([]);
    setReceivers([]);
    return;
  };

  const keyValueExtractor = (list, key_name, value_name) => {
    // receiverFname:curItem[receiverFname],receiverFname, receiverLname, receiverPhone, transferType, accountNumber
    return list.map((curItem, index) => {
      key = curItem[key_name];
      value = curItem[value_name];

      return { key: key, value: value, ...curItem };
    });
  };

  const recKeyValue = (receivers) => {
    //console.log('receivers=', receivers)
    updatedList = keyValueExtractor(receivers, "receiverId", "receiverName");
    setReceiversWithKeyValue(updatedList);
    return;
  };

 

  const LoadMoreReceiverData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveReceivers(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing in contect", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveReceivers(true, filterParams);
  };




  //load new receievers
  const retrieveReceivers = async (isRefreshing = false, filterParams = {}, pageParam = page) => {

    console.log("filterParams & prev", filterParams, prevFilterParams);
    
    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;
    setPrevFilterParams(filterParams);

    console.log("scrolling for members and current page", nextPage, lastPage, isRefreshing);
  
   

    if(filterParams.hasOwnProperty('senderId') && filterParams.senderId !== null){
        const  activeSenderKey = filterParams.senderId;

        setFetchFilterParams(filterParams);

       
        if (!prevASenderId || prevASenderId != activeSenderKey) {
          setPrevActiveSenderId(activeSenderKey);
          setReceivers([]);
        }

        setActiveSenderId(activeSenderKey);
        setIsLoading(true);

        try {
          const results = await service.get(
            Endpoints.RECEIVER["INDEX"](activeSenderKey),
            { page: nextPage, limit: limit, ...filterParams }
          );
          const { data: recentReceiverList, meta: pagination } = results;
          setError(null);
          setIsLoading(false);
          setHasError(false);

          if (pagination.total == 0) setHasError(true);

          if (pagination.total > 0) {
            setLastPage(pagination.lastPage);
        
            //console.log(JSON.stringify(recentReceiverList, null, 2));
           
            if (isRefreshing || isFilterParamsChanged) {
              setReceivers(recentReceiverList);
              setPage(pagination.currentPage);
            } else {
              setReceivers((prevData) => [...prevData, ...recentReceiverList]);
            }
            setHasMore(pagination?.currentPage < pagination?.lastPage);
            
            recKeyValue(recentReceiverList);

            setTotalReceiverCount(pagination.total );
            setTotalPage(Math.ceil(pagination.lastPage));
            setLastPage(pagination.lastPage);
            setPage(pagination.currentPage);
            setHasMore(pagination?.currentPage < pagination?.lastPage);
          
      }
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
    finally {
      setIsLoading(false);
      if (isRefreshing) setRefreshing(false);
    }

    }
  };

  //register new receiver
const handleError = (res) => {
  if (res.errors) {
    errorMessage = [].concat.apply([], Object.values(res.errors));
    errorMessage = errorMessage.join("\n");

    updatedError = { errorMessage, ...res.errors };
    setError(updatedError);
  }
}

const prepareReceiverData = (receiverData) => {

  return  {
    receiver_fname: receiverData.fname,
    receiver_lname: receiverData.lname,
    receiver_mname: receiverData.mname,
    receiver_phone: receiverData.phone,
    receiver_address: receiverData.address,
    account_number: receiverData.accountNumber,
    bank_id: receiverData.bank["id"],
    receiver_address: receiverData.address,
    ...receiverData
  };
}




  const onReceiverRegister = async (newReceiver) => {
    //const senderId = activeSenderId;

console.log('link', Endpoints.RECEIVER["STORE"](newReceiver.senderId))
try{
      const receiverData = prepareReceiverData(newReceiver);

      // console.log(receiver_data)
      setIsLoading(true);

      apiResponse = await service.post(Endpoints.RECEIVER["STORE"](newReceiver.senderId), receiverData)
          setIsLoading(false);
          if (!apiResponse.errors) {
           // retrieveReceivers(activeSenderId); //update customers list
           console.log(JSON.stringify(apiResponse?.data, null, 2))
            setReceivers((prevData) => [ apiResponse?.data, ...prevData ]);
            console.log(JSON.stringify( [ apiResponse?.data, ...receivers ], null, 2))
              setError(null);
            // navigate("ReceiverList", { sender: activeSender });
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'Receivers', params: { screen: 'ReceiverList' } }],
            // });
          }
          if (apiResponse.errors) {
            handleError(apiResponse);
          }

      }
    
      catch(e){
        setIsLoading(false);
        setError(e.toString());
      };
   
  };

  const onReceiverUpdate = async (rData) => {
    //const senderId = activeSenderId;
    console.log('receiver update', Endpoints.RECEIVER["UPDATE"](rData.senderId, rData.receiverId))

try{
      const receiverData = prepareReceiverData(rData);
      setIsLoading(true);

      apiResponse = await service.put(Endpoints.RECEIVER["UPDATE"](receiverData.senderId, receiverData.receiverId), receiverData)
          setIsLoading(false);
          if (!apiResponse.errors) {
           // console.log(listHelper.changeItem(prevData, apiResponse?.data, 'receiverId'),null,2 )
            setReceivers((prevData) => listHelper.changeItem(prevData, apiResponse?.data, 'receiverId'));
            setError(null);
            const { data: updatedReceiver} = apiResponse;
            // console.log('MyupdatedReceiver', updatedReceiver)
            // updatedReceiverList = replaceItemFromList(receivers, updatedReceiver, 'receiverId');
            // setReceivers(updatedReceiverList);
            // retrieveReceivers(activeSenderId); //update customers list
            //navigate("ReceiverList", { sender: activeSender });
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'Receivers', params: { screen: 'ReceiverList' , sender: activeSender } }],
            // });
          }
          if (apiResponse.errors) {
            handleError(apiResponse);
          }

      }
    
      catch(e){
        setIsLoading(false);
        setError(e.toString());
      };
   
  };

  

  const retrieveBankList = async(searchWord = '') => {
    console.log('showBankList_start',)
   

      try {
        const results = await service.get(
          Endpoints.BANKIDENTITY["INDEX"],
          {  limit: 50, search:searchWord }
        );
        console.log('showBankList',results)
        const { data: bankIdentityList } = results;
        setBankList(bankIdentityList.banks);
        setIdentityList(bankIdentityList.acceptableId);
        if(bankIdentityList.banks.length == 0) setHasError(true);
        
        setError(null);
        setIsLoading(false);
        setHasError(false);
  
      } catch (err) {
        setIsLoading(false);
        setError(err);
  };

}

// const fetchAccountDetails = useCallback(
//   debounce((accountNumber, bankId) => {
//     console.log("debounce", accountNumber, bankId);
//     onFetchAcccountDetails(accountNumber, bankId);
//   }, 200),
//   []
// );

const fetchAccountDetails = async(accountNumber, bankId) => {
      console.log('showBankList_start',)
      setIsLoading(true);
    try {
      const results = await service.get(
        Endpoints.RECEIVER['FETCHACCOUNTDETAILS'],
        {  limit: 50, bank_id:bankId, account_number:accountNumber }
      );
      
      const { data } = results;
      console.log('accountDetails',data)
      
      if(data) {
        setReceiver(data);
        setIsLoading(false);
        setHasError(false);
        setAccountDetails(data);
      }    

    } catch (err) {
      setIsLoading(false);
      setError(err);
};

}
 

  return (
    <ReceiversContext.Provider
      value={{
        bankList,
        identityList,
        searchWord,
        fetchFilterParams,
        setReceivers,
        retrieveReceivers,
        receivers,
        receiver,
        onReceiverRegister,
        onReceiverUpdate,
        retrieveBankList,
        fetchAccountDetails,
        accountDetails,
        bankList,
        isLoading,
        hasError,
        error,
        showErrorBorder,
        LoadMoreReceiverData,
        totalReceiverCount,
        receiversWithKeyValue,
        setActiveSenderInUse,
        activeSender,
        clearReceivers,
        prevFilterParams,
        refreshing,
        onRefresh,
      }}
    >
      {children}
    </ReceiversContext.Provider>
  );
};
