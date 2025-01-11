import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { CommonContext } from "../utilities/common.context";
import { deepEqual } from "../../utils/common";
import { debounce } from 'lodash';
import { handleError } from "../../utils/common";
import { listHelper } from "../../utils/common";

export const BankContext = createContext();

export const BankContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [banks, setBanks] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalRateCount, setTotalRateCount] = useState(null);
  const [prevFilterParams, setPrevFilterParams] = useState({});
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(40);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    // Initialize or fetch initial data here if needed
  }, []);

  const loadMoreBankData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveBanks(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveBanks(true, filterParams);
  };

  const retrieveBanks = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
    console.log("scrolling for banks and current page", pageParam, lastPage);
    setIsLoading(true);

    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;

    try {
      const results = await service.get(Endpoints.BANK["INDEX"], {
        page: nextPage,
        limit: limit,
        user_id: filterParams?.userId,
        currency_id: filterParams?.currencyId,
        search: filterParams?.search
      });

      const { data: fetchBanks, meta: pagination = {} } = results;
      
      setError(null);
      setHasError(pagination.total === 0);

      if (isRefreshing || isFilterParamsChanged) {
        setPrevFilterParams(filterParams);
        setBanks(fetchBanks);
        setPage(pagination.currentPage);
      } else {
        setBanks((prevData) => [...prevData, ...fetchBanks]);
      }

      setHasMore(pagination?.currentPage < pagination?.lastPage);
  
      setLastPage(pagination.lastPage);
      setTotalRateCount(pagination.total);
      setTotalPage(pagination.lastPage);

      
    } catch (err) {
      console.log("Loading fetchBanks error", err);
      setError(err);
    } finally {
      setIsLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const onBankAdd = async (bank) => {
    const newBank = {
      name: bank.name,
      currency_id: bank.currencyId,
      bank_category: bank.bankCategory,
    };

    setIsLoading(true);

    try {
      const res = await service.post(Endpoints.BANK["STORE"], newBank);
      const { data: createdBank } = res;
      setBanks((prevData) => [ createdBank, ...prevData ]);

      if (!res.errors) {
        //retrieveBanks();
        //navigate("bank");
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding bank", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };


  const onBankUpdate = async (bank, bankId) => {
    const bankData = {
      name: bank.name,
      currency_id: bank.currencyId,
      bank_category: bank.bankCategory,
    };

    setIsLoading(true);

    try {
      const res = await service.put(Endpoints.BANK["UPDATE"](bankId), bankData);
      const { data: updatedBank } = res;
      setBanks((prevData) => listHelper.changeItem(prevData, updatedBank, 'bankId'));

      if (!res.errors) {
        retrieveBanks();
        //navigate("bank");
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding bank", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const onBankDelete = async (bankId) => {
    setIsLoading(true);
console.log('deletinf',bankId)
    try {
      const res = await service.delete(Endpoints.BANK["DELETE"](bankId), { rate_id: bankId,});
      if (!res.errors) {
        retrieveBanks();
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding bank", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BankContext.Provider
      value={{
        banks,
        onBankAdd,
        onBankUpdate,
        onBankDelete,
        isLoading,
        hasError,
        error,
        retrieveBanks,
        loadMoreBankData,
        onRefresh,
        refreshing,
        totalRateCount,
        prevFilterParams,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
