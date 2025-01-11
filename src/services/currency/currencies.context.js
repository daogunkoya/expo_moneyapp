import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { CommonContext } from "../utilities/common.context";
import { deepEqual } from "../../utils/common";
import { debounce } from 'lodash';
import { handleError } from "../../utils/common";
import { listHelper } from "../../utils/common";

export const CurrencyContext = createContext();

export const CurrencyContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalCurrencyCount, setTotalCurrencyCount] = useState(null);
  const [prevFilterParams, setPrevFilterParams] = useState({});
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(15);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    // Initialize or fetch initial data here if needed
  }, []);

  const loadMoreCurrencyData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveCurrencies(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveCurrencies(true, filterParams);
  };

  const retrieveCurrencies = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
    console.log("scrolling for currencies and current page", pageParam, lastPage);
    setIsLoading(true);

    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;

    try {
      const results = await service.get(Endpoints.CURRENCY["INDEX"], {
        page: nextPage,
        limit: limit,
        user_id: filterParams?.userId,
        currency_id: filterParams?.currencyId,
        search: filterParams?.search
      });

      const { data: fetchCurrencies, meta: pagination = {} } = results;
      
      setError(null);
      setHasError(pagination.total === 0);

      if (isRefreshing || isFilterParamsChanged) {
        setPrevFilterParams(filterParams);
        setCurrencies(fetchCurrencies);
        setPage(pagination.currentPage);
      } else {
        setCurrencies((prevData) => [...prevData, ...fetchCurrencies]);
      }

      setHasMore(pagination?.currentPage < pagination?.lastPage);
  
      setLastPage(pagination.lastPage);
      setTotalCurrencyCount(pagination.total);
      setTotalPage(pagination.lastPage);

      
    } catch (err) {
      console.log("Loading fetchCurrencies error", err);
      setError(err);
    } finally {
      setIsLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const onCurrencyToggle = async (currencyId) => {

    setIsLoading(true);

    try {
      const res = await service.put(Endpoints.CURRENCY["TOGGLE"](currencyId));

      const { data: updatedCurrency, meta: pagination = {} } = res;
      setCurrencies((prevData) => {
        return listHelper.changeItem(prevData, updatedCurrency, 'currencyId');
      })

      if (!res.errors) {
       // retrieveCurrencies();
        //navigate("Currency");
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding Currency", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const onCurrencyDelete = async (rateId) => {
    setIsLoading(true);
console.log('deletinf',rateId)
    try {
      const res = await service.delete(Endpoints.Currency["DELETE"](rateId), { rate_id: rateId,});
      if (!res.errors) {
        retrieveCurrencies();
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding Currency", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        onCurrencyToggle,
        isLoading,
        hasError,
        error,
        retrieveCurrencies,
        loadMoreCurrencyData,
        onRefresh,
        refreshing,
        totalCurrencyCount,
        prevFilterParams,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
