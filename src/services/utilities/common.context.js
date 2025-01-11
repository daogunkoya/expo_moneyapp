import React, { useState, useContext, createContext, useEffect } from "react";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { store_id } from "../../utils/env";
export const CommonContext = createContext();
import * as SecureStore from 'expo-secure-store';

export const CommonContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [userEmailverified, setUserEmailverified] = useState(false);
  const [userIdentityverified, setUserIdentityverified] = useState(false);
  const [user, setUser] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [userCurrencies, setUserCurrencies] = useState([]);
  const [rate, setRate] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [senders, setSenders] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [store, setStore] = useState([]);
  const [defaultOriginCurrency, setDefaultOriginCurrency] = useState(null);
  const [defaultDestinationCurrency, setDefaultDestinationCurrency] = useState(null);
  const [limit, setLimit] = useState(6);
  const [myStore, setMyStore] = useState([]);

  const [error, setError] = useState(null);

  const tokenExists = async () => {
    const token = await SecureStore.getItemAsync('ACCESSTOKEN');
    return token;
  }

  useEffect(() => {
    const checkTokenAndFetch = async () => {
      const token = await SecureStore.getItemAsync('ACCESSTOKEN');
      if (token) {
        // config.headers.Authorization = 'Bearer ' + token;
        fetchHome();
      }
    };
  
    // Call the async function
    checkTokenAndFetch();
  }, []); // Empty dependency array to run once

 

  const fetchHome = async () => { 
    setIsLoading(true);

    try {
      const results = await service.get(Endpoints.HOME, {limit:limit, store_id: store_id});
      const { data: fetchHome } = results;
      const {transactions, senders, rates, currencies, user} = fetchHome
      // setTransactions(transactions)
      // setSenders(senders)
      // setRate(rates)
      // setCurrencies(currencies)
      // setUserCurrencies(user)
      setDefaultCurrency(currencies)

    console.log("fetchHome", JSON.stringify(fetchHome.currencies.data, null , 2));

      setError(null);
      setIsLoading(false);
      if (fetchHome) {
        const userCurrencies =  fetchHome?.user?.userCurrency?.destinationCurrency || fetchHome.currencies?.data 
        //console.log("receiv home", JSON.stringify(fetchHome?.senders, null , 2));
        setTransactions(fetchHome.transactions);
        setSenders(fetchHome.senders);
        setReceivers(fetchHome?.receivers);
        setCurrencies(fetchHome.currencies);
        setMemberList(fetchHome.users);
        setRate(fetchHome.rate);
        setUser(fetchHome.user);
        setStore(fetchHome.store);
        setUserCurrencies(Array.isArray(userCurrencies) ? userCurrencies : [userCurrencies]);

        const userEmailVerifiedAtTruthy = !!fetchHome.user.userEmailVerifiedAt;
        const userIdentityTruthy = !!fetchHome.user.userIdentity;

        setUserEmailverified(userEmailVerifiedAtTruthy);
        setUserIdentityverified(userIdentityTruthy);

      }
    } catch (err) {
      console.log("Loading Home error", err);
      setIsLoading(false);
      setError(err);
    }
  };
  

  const setDefaultCurrency = (currencyList) => {
   
    console.log("currencyListHere", currencyList);
    currencyList.data?.find((item) => {
      if (item.currencyType === 'Destination' && item.currencyDefault == 1) {
        setDefaultDestinationCurrency(item);
      }

      if (item.currencyType === 'Origin' && item.currencyDefault == 1) {
        setDefaultOriginCurrency(item);
      }
    });
  };

  const fetchAddress = async (searchAddress) => {
    setIsLoading(true);

    try {
      const results = await service.get(Endpoints.ADDRESSFINDER(searchAddress), {
        limit: 4,
      });
      const { data: fetchAddress } = results;

      // console.log("fetchAddress", fetchAddress);

      setError(null);
      setIsLoading(false);

      if (fetchAddress.length > 0) {
        setAddressList(fetchAddress);
      }
    } catch (err) {
      console.log("Loading AddressList error", err);
      setIsLoading(false);
      setError(err);
    }
  };

  const onUpdateMyStore = async (storeUpdateData) => {

    setIsLoading(true);
  
  const storeId = store_id
  const storeData = {
    "store_name": storeUpdateData?.storeName,
    "store_slogan": storeUpdateData?.storeSlogan,
    "store_phone": storeUpdateData?.storePhone,
    "store_mobile": storeUpdateData?.storeMobile,
    "store_email": storeUpdateData?.storeEmail,
    "store_address": storeUpdateData?.storeAddress,
    "store_city": storeUpdateData?.storeCity,
    "store_country": storeUpdateData?.storeCountry,
    "store_postcode": storeUpdateData?.storePostcode,
    "store_url": storeUpdateData?.storeUrl,
    "enable_sms": storeUpdateData?.enableSms?1:0,
    "enable_credit": storeUpdateData?.enableCredit?1:0,
    "enable_multiple_receipt": storeUpdateData?.enableMultipleReceipt?1:0,
  
  }
    try {
      const results = await service.put(Endpoints.MYSTORE["UPDATE"](storeId),storeData);
  
      const { data: fetchData, meta: pagination = {} } = results;
      
      setError(null);
      setHasError(pagination.total === 0);
  
      if(fetchData){
        setStore(fetchData);
      }
      if (results.errors) {
        setIsLoading(false);
        errorMessage = [].concat.apply([], Object.values(results.errors));
        errorMessage = errorMessage.join("\n");

        updatedError = { errorMessage, ...results.errors };
        setError(updatedError);
      }
  
      
    } catch (err) {
      const errorMessage = err.toString();
         console.log("Loading fetchCurrencies error", err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <CommonContext.Provider
      value={{
        fetchAddress,
        addressList,
        isLoading,
        hasError,
        error,
        fetchHome,
        transactions,
        senders,
        receivers,
        currencies,
        rate,
        user,
        memberList,
        userCurrencies,
        defaultOriginCurrency,
        defaultDestinationCurrency,
        limit,
        store,
        onUpdateMyStore,
        userEmailverified,
        userIdentityverified
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
