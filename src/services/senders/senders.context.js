import React, { useState, useContext, createContext, useEffect , useCallback} from "react";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { CommonContext } from "../utilities/common.context";
import { deepEqual } from "../../utils/common";
import { debounce } from 'lodash';
import { listHelper } from "../../utils/common";

import {
  sendersTransform,
  sendersFetchRequest,
  sendersRegisterRequest,
  sendersUpdateRequest,
} from "./senders.service";

import { navigate } from "../../utils/navigationRef";
import endpoints from "../../utils/apis";

export const CustomersContext = createContext();

export const CustomersContextProvider = ({ children }) => {

  const {senders:fetchedSenders} = useContext(CommonContext);

  const [senders, setSenders] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalSenderCount, setTotalSenderCount] = useState(null);
  const [senderKeyValue, setSenderKeyValue] = useState([]);
  const [prevActiveFilterParams, setPrevActiveFilterParams] = useState({});
  const [limit, setLimit] = useState(6);

  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [prevFilterParams, setPrevFilterParams] = useState({});

  const [error, setError] = useState(null);

  const allMessage = {
    customerTitle: "",
    customerFname: "",
    customerLname: "",
    customerMname: "",
    customerDob: "",
    customerEmail: "",
    customerMobile: "",
    customerAddress: "",
    customerPostcode: "",
  };

  //what should happen when load or add parameter to reload with it
  useEffect(() => {
    if (fetchedSenders) {
     
      setSenders(fetchedSenders.data || []);
      setTotalSenderCount(fetchedSenders?.meta?.total || null);
      setTotalPage(fetchedSenders?.meta?.total || null);
      setLastPage(fetchedSenders?.meta?.lastPage || 1);
      setPage(fetchedSenders?.meta?.currentPage  || 1)
      setHasMore(fetchedSenders?.meta?.currentPage < fetchedSenders?.meta?.lastPage);
    }
  }, [fetchedSenders]);

  //for displaying error border on screen  for validation
  const showErrorBorder = (newErr, prop) => {
    //console.log(newErr)
    if (newErr) {
      if (prop && newErr[prop]) return { borderWidth: "2", borderColor: "red" };
    }
    return {};
  };

  const keyValueExtractor = (list, key_name, value_name) => {
    return list.map((curItem, index) => {
      key = curItem[key_name];
      value = curItem[value_name];
      return { key: key, value: value };
    });
  };

  const senKeyValue = (senders) => {
    updatedList = keyValueExtractor(senders, "senderId", "senderName");
    setSenderKeyValue(updatedList);
  };

  //load additional more customer
  // const LoadMoreCustomerData = (filterpara) => {
  //   console.log("scrolling for senders and current page", page, lastPage);
  //   if (page < lastPage) {
  //     const pageIncrement = page + 1;
  //     setPage(pageIncrement);
  //     retrieveCustomers(filterpara, pageIncrement);
  //   }
  // };

  const LoadMoreCustomerData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveCustomers(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing in contect", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveCustomers(true, filterParams);
  };

  const retrieveCustomers = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
    // let prevSenders = senders;
    //setFetchFilterParams(filterParams);   //will be replaced with prevActiveFilterParams
    
    // if(filterParams.hasOwnProperty('userId') && filterParams?.userId !== prevActiveFilterParams?.userId){
    //   prevSenders = [];
    // }

    console.log("filterParams & prev", filterParams, prevFilterParams);

    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;
    setPrevFilterParams(filterParams);

    console.log("scrolling for membebrs and current page", nextPage, lastPage, isRefreshing);

    console.log(filterParams)
      setIsLoading(true);

    try {
      const results = await service.get(Endpoints.SENDER["INDEX"], {
        page: nextPage,
        limit: limit,
        user_id: filterParams?.userId,
        search:filterParams?.search
        //...filterParams,
      });
      const { data: fetchSenders, meta: pagination = {} } = results;

      setError(null);
      setIsLoading(false);
      setHasError(pagination.total === 0);

      if (pagination.total > 0) {
        setLastPage(pagination.lastPage);
        setPage(pagination.currentPage);

        if (isRefreshing || isFilterParamsChanged) {
          setSenders(fetchSenders);
          setPage(pagination.currentPage);
        } else {
          setSenders((prevData) => [...prevData, ...fetchSenders]);
        }
        setHasMore(pagination?.currentPage < pagination?.lastPage);

        setPrevActiveFilterParams(filterParams);
        //senKeyValue(senderList);
        // setSenders(senderList);

        setTotalSenderCount(pagination?.total);
        setTotalPage(pagination?.lastPage);
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

  //search

  //register new customer
  const transformSenderDataForApi = (sender) =>{

    const {
      title,
      fname,
      lname,
      mname,
      dateOfBirth,
      email,
      phone,
      address,
      postcode,
      metaData
    } = sender;

    return {
      sender_name: `${fname} ${lname}`,
      sender_fname: fname,
      sender_lname: lname,
      sender_dob: dateOfBirth,
      sender_email: email,
      sender_phone: phone,
      sender_address: address,
      sender_postcode: postcode,
      metadata:metaData
      // sender_title: title,
      // sender_mname: mname,
      // sender_mobile: mobile,
    };
  }

  const onCustomerRegister = async (newSender) => {
   
    const newSenderData = transformSenderDataForApi(newSender);

    //console.log(customer_data)
    setIsLoading(true);

    try {
      const res = await service
        .post(endpoints.SENDER["STORE"], newSenderData)
        //.then(sendersTransform);

      // setCustomer(res);
      console.log(res)
      setIsLoading(false);
      if (!res.errors) {
        setSenders((prevData) => [ res?.data, ...prevData ]);
        navigate("CustomerList");
      }
      if (res.errors) {
        setIsLoading(false);
        errorMessage = [].concat.apply([], Object.values(res.errors));
        errorMessage = errorMessage.join("\n");

        updatedError = { errorMessage, ...res.errors };
        setError(updatedError);
      }
    } catch (error) {
          const errorMessage = error.toString();
          const errorObject = JSON.parse(errorMessage);
          console.log(errorObject.errorMessage); // This will log the error message
          setError(errorObject);
          setIsLoading(false);
    }
  };

  //update customer resource record

  const onCustomerUpdate =  async(updatedSender, senderId) => {
   
    const senderData = transformSenderDataForApi(updatedSender);
    
console.log('cupdate url', endpoints.SENDER["UPDATE"](senderId))
    setIsLoading(true);

    try {
      const res = await service
        .put(endpoints.SENDER["UPDATE"](senderId), senderData,)
        //.then(sendersTransform);

      // setCustomer(res);
      console.log(res)
      setIsLoading(false);
      if (!res.errors) {
        //retrieveCustomers(); //update senders list
        setSenders((prevData) => listHelper.changeItem(prevData, res?.data, 'senderId'));
        setError(null);
        //navigate.pop(2)
      }
      if (res.errors) {
        errorMessage = [].concat.apply([], Object.values(res.errors));
        errorMessage = errorMessage.join("\n");

        updatedError = { errorMessage, ...res.errors };
        setError(updatedError);
        setIsLoading(false);
      }
    } catch (error) {
          const errorMessage = error.toString();
          const errorObject = JSON.parse(errorMessage);
          console.log(errorObject.errorMessage); // This will log the error message
          setError(errorObject);
          setIsLoading(false);
    }
  };

  //console.log('sending',page,'-',senders);
  return (
    <CustomersContext.Provider
      value={{
        totalSenderCount,
        lastSenderId: null,
        customers: senders,
        onCustomerRegister,
        onCustomerUpdate,
        isLoading,
        sendersTransform,
        hasError,
        error,
        retrieveCustomers,
        showErrorBorder,
        LoadMoreCustomerData,
        searchWord,
        fetchFilterParams:prevActiveFilterParams,
        senderKeyValue,
        prevFilterParams,
        refreshing,
        onRefresh,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
