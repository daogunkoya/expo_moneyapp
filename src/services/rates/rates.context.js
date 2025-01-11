import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { CommonContext } from "../utilities/common.context";
import { deepEqual } from "../../utils/common";
import { debounce } from 'lodash';
import { handleError } from "../../utils/common";

export const RateContext = createContext();

export const RateContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rates, setRates] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalRateCount, setTotalRateCount] = useState(null);
  const [prevFilterParams, setPrevFilterParams] = useState({});
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    // Initialize or fetch initial data here if needed
  }, []);

  const loadMoreRateData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveRates(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveRates(true, filterParams);
  };

  const retrieveRates = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
    console.log("scrolling for rates and current page", pageParam, lastPage);
    setIsLoading(true);

    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;

    try {
      const results = await service.get(Endpoints.RATE["INDEX"], {
        page: nextPage,
        limit: limit,
        user_id: filterParams?.userId,
        currency_id: filterParams?.currencyId,
        search: filterParams?.search
      });

      const { data: fetchRates, meta: pagination = {} } = results;
      
      setError(null);
      setHasError(pagination.total === 0);

      if (isRefreshing || isFilterParamsChanged) {
        setPrevFilterParams(filterParams);
        setRates(fetchRates);
        setPage(pagination.currentPage);
      } else {
        setRates((prevData) => [...prevData, ...fetchRates]);
      }

      setHasMore(pagination?.currentPage < pagination?.lastPage);
  
      setLastPage(pagination.lastPage);
      setTotalRateCount(pagination.total);
      setTotalPage(pagination.lastPage);

      
    } catch (err) {
      console.log("Loading fetchRates error", err);
      setError(err);
    } finally {
      setIsLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const onRateAdd = async (newRate) => {
    const newRateData = {
      // user_id: newRate.userId,
      main_rate: newRate.mainRate,
      currency_id: newRate?.currencyId,
      bou_rate: newRate?.bouRate,
      sold_rate: newRate?.soldRate
    };

    setIsLoading(true);

    try {
      const res = await service.post(Endpoints.RATE["STORE"], newRateData);
      if (!res.errors) {
        retrieveRates();
        //navigate("Rate");
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding rate", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const onRateDelete = async (rateId) => {
    setIsLoading(true);
console.log('deletinf',rateId)
    try {
      const res = await service.delete(Endpoints.RATE["DELETE"](rateId), { rate_id: rateId,});
      if (!res.errors) {
        retrieveRates();
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding rate", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RateContext.Provider
      value={{
        rates,
        onRateAdd,
        onRateDelete,
        isLoading,
        hasError,
        error,
        retrieveRates,
        loadMoreRateData,
        onRefresh,
        refreshing,
        totalRateCount,
        prevFilterParams,
      }}
    >
      {children}
    </RateContext.Provider>
  );
};
