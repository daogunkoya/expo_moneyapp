import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { CommonContext } from "../utilities/common.context";
import { debounce } from 'lodash';
import { deepEqual } from "../../utils/common";
import { listHelper } from "../../utils/common";

export const MembersContext = createContext();

export const MembersContextProvider = ({ children }) => {

  const {memberList} = useContext(CommonContext);

  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [searchWord, setSearchWord] = useState(null);
  const [totalMemberCount, setTotalMemberCount] = useState(null);
  const [limit, setLimit] = useState(6);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [prevFilterParams, setPrevFilterParams] = useState({});




  //load additional more customer


  const LoadMoreData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveMembers(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing in contect", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveMembers(true, filterParams);
  };

  const retrieveMembers = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
    setIsLoading(true);
    
    console.log("filterParams & prev", filterParams, prevFilterParams);
    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;
    setPrevFilterParams(filterParams);
    
    console.log("scrolling for membebrs and current page", nextPage, lastPage, isRefreshing);

    try {
      const results = await service.get(Endpoints.MEMBER["INDEX"], {
        page: nextPage,
        limit: limit,
        ...filterParams,
      });
      const { data: fetchMembers, meta: pagination = {} } = results;

      setError(null);
      setIsLoading(false);
      setHasError(pagination.total === 0);


      if (pagination.total > 0) {
        setLastPage(pagination.lastPage);
        //console.log(JSON.stringify(fetchMembers, null, 2))

        if (isRefreshing || isFilterParamsChanged) {
          setMembers(fetchMembers);
          setPage(pagination.currentPage);
        } else {
          setMembers((prevData) => [...prevData, ...fetchMembers]);
        }
        setHasMore(pagination?.currentPage < pagination?.lastPage);
       
        setTotalMemberCount(pagination.total);
        setTotalPage(pagination.lastPage);
      }
    } catch (err) {
      console.log("Loading fetchMembers error", err);
      setError(err);
    }
    finally {
      setIsLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const findType = (type) => {
    switch(type){
      case "member":
        return "UPDATE";
      case "role":
        return "ROLEUPDATE";
      case "status":
        return "STATUSUPDATE";
      default:
        break;
    }
  }
  const transformMemberDataForEndpoint = (member) => {
    return {
      "first_name":member?.fname,
      "last_name":member?.lname,
      "middle_name":member?.mname,
      "dob":member?.dateOfBirth,
      "title":member?.title,
      "email":member?.email,
      "phone":member?.phone,
      "address": member?.metaData?.addressNo + " " + member?.metaData?.address1 + " " + member?.metaData?.address2 + " " + member?.metaData?.city + " " + member?.metaData?.country,
      "postcode": member?.postcode,
      "metadata": member?.metaData
      // "status": member?.status,
      //  "user_role_type":member?.userRoleType,
       }
      }
  const onMemberUpdate = async (type, value, memberId) => {
    if (!value && !type && !memberId) {
      Alert.alert("Error", "Please provide enter all fields");
      return;
    }

    let updateEndpoint = findType(type);

    try {
     // updateEndpoint = type === "status" ? Endpoints.MEMBER["STATUSUPDATE"] : Endpoints.MEMBER["ROLEUPDATE"];
      const response = await service.put(Endpoints.MEMBER[updateEndpoint](memberId), {...value}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMembers((prevData) => listHelper.changeItem(prevData, response?.data, 'userId'));

      if (response.status === 200) {
        Alert.alert("Success", "Report submitted successfully!");
      } 
     // navigate("TransactionList");
    } catch (error) {
      console.error("Error submitting update:", error);
      Alert.alert("Error", "Failed to submit member Update.");
    }
  };

  useEffect(() => {
    if (memberList) {
      setMembers(memberList.data || []);
      setTotalMemberCount(memberList?.meta?.total || null);
      setTotalPage(memberList?.meta?.total || null);
      setLastPage(memberList?.meta?.lastPage || 1);
      setPage(memberList?.meta?.currentPage  || 1)
      setHasMore(memberList?.meta?.currentPage < memberList?.meta?.lastPage);
      // setTotalPage(memberList?meta?.total || null);
      // setLastPage(fetchedSenders.lastPage || 1);
    }
  }, [memberList]);

  return (
    <MembersContext.Provider
      value={{
        members,
        totalPage,
        totalMemberCount,
        isLoading,
        hasError,
        error,
        retrieveMembers,
        onMemberUpdate,
        transformMemberDataForEndpoint,
        LoadMoreData,
        searchWord,
        prevFilterParams,
        refreshing,
        onRefresh,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};
