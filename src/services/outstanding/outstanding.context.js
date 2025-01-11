import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { CommonContext } from "../utilities/common.context";
import { deepEqual } from "../../utils/common";
import { debounce } from 'lodash';
import { handleError } from "../../utils/common";
import { listHelper } from "../../utils/common";

export const OutstandingContext = createContext();

export const OutstandingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [outstandings, setOutstandings] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalOutstandingCount, setTotalOutstandingCount] = useState(null);
  const [prevFilterParams, setPrevFilterParams] = useState({});
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    // Initialize or fetch initial data here if needed
  }, []);

  const loadMoreOutstandingData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveOutstandings(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveOutstandings(true, filterParams);
  };

  const retrieveOutstandings = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
    console.log("scrolling for outstandings and current page", pageParam, lastPage);
    setIsLoading(true);

    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;

    try {
      const results = await service.get(Endpoints.OUTSTANDING["INDEX"], {
        page: nextPage,
        limit: limit,
        user_id: filterParams?.userId,
        currency_id: filterParams?.currencyId,
        search: filterParams?.search
      });

      const { data: fetchOutstandings, meta: pagination = {} } = results;
      console.log("fetchOutstandings", JSON.stringify(fetchOutstandings, null, 2));
      setError(null);
      setHasError(pagination.total === 0);

      if (isRefreshing || isFilterParamsChanged) {
        setPrevFilterParams(filterParams);
        setOutstandings(fetchOutstandings);
        setPage(pagination.currentPage);
      } else {
        setOutstandings((prevData) => [...prevData, ...fetchOutstandings]);
      }

      setHasMore(pagination?.currentPage < pagination?.lastPage);
  
      setLastPage(pagination.lastPage);
      setTotalOutstandingCount(pagination.total);
      setTotalPage(pagination.lastPage);

      
    } catch (err) {
      console.log("Loading fetchOutstandings error", err);
      setError(err);
    } finally {
      setIsLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const makeOutstandingPayment = async (payment) => {
    const newPayment = {
      "user_id":payment?.userId,
       "outstanding_id":payment?.outstandingId,
      "outstanding_amount":payment?.amount,
      "payment_type":payment?.paymentType
    };

    setIsLoading(true);

    try {
      const res = await service.patch(Endpoints.OUTSTANDING["PAYMENT"], newPayment);
      if (!res.errors) {
        retrieveOutstanding
        setOutstandings((prevData) => listHelper.changeItem(prevData, res?.data, 'outstandingPaymentId'));
        //navigate("Outstanding");
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding outstanding", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

 

  return (
    <OutstandingContext.Provider
      value={{
        outstandings,
        makeOutstandingPayment,
        isLoading,
        hasError,
        error,
        retrieveOutstandings,
        loadMoreOutstandingData,
        onRefresh,
        refreshing,
        totalOutstandingCount,
        prevFilterParams,
      }}
    >
      {children}
    </OutstandingContext.Provider>
  );
};
