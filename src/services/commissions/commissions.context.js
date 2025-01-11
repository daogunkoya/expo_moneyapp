import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
import { navigate,validator } from '../../utils/navigationRef';
import {
  CommissionFetchRequest,
  CommissionTransform,
  CommissionAddRequest,
  CommissionUpdateRequest,
  CommissionDeleteRequest
} from "./commissions.service";
import { UtilitiesContext } from "../utilities/utilities.context";
import { debounce } from "lodash";
import service from "../../utils/request";
import Endpoints from "../../utils/apis";
import { deepEqual } from "../../utils/common";
import { handleError } from "../../utils/common";



export const CommissionContext = createContext();


export const CommissionContextProvider = ({children}) => {
  
  const { selectedCurrency, selectedUser, updateMenu } = useContext(UtilitiesContext);
  
  const [commissionList, setCommissionList] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [searchCommission, setSearchCommission] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [totalCommissionCount, setTotalCommissionCount] = useState(null);
  const [lastCommissionId, setLastCommissionId] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [users, setUsers] = useState(null);
;
  const [error, setError] = useState(null);

  const [commissions, setCommissions] = useState([]);
  const [prevFilterParams, setPrevFilterParams] = useState({});
  const [limit, setLimit] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

const validation =  (currency_id, user_id, start_from, end_at, value, agent_quota)=>{
   let err = Object.assign({errorMessage:" All fields are required"},
                                currency_id === null ?  {"currencyId": "The Currency Id is Required"}: null,
                                user_id === null ? {"userId": "The User Id is Required"}:null,
                                start_from === null ?  {"startFrom": "The start from  is Required"}: null,
                                end_at === null ?  {"endAt": "The end at  is Required"}: null,
                                value === null ?  {"value": "The value  is Required"}: null,
                                agent_quota === null ?  {"agentQuota": "The agent quota  is Required"}: null,
                    );
                    return err;
}


//for displaying error border on screen  for validation
const showErrorBorder = (errorArray, errorProperty)=>{
  //console.log(errorArray)
  if(errorArray){
    if(errorProperty && errorArray[errorProperty]) return  {borderWidth:'2', borderColor:'red'};
  }
        return {};    
    } 



//what should happen when load or add parameter to reload with it
    useEffect(() => {  
      //retrieveCommission();
  }, []);



  const loadMoreCommissionData = useCallback(
    debounce(filterParams => {
      if (hasMore && !isLoading) {
        setPage((prevPage) => {
          console.log("loading fiterparams", filterParams);
          const nextPage = prevPage + 1;
          retrieveCommissions(false, filterParams, nextPage);
          return nextPage;
        });
      }
    }, 200), [hasMore, isLoading]
  );


  const onRefresh = (filterParams) => {
    console.log("refreshing", filterParams);
    setRefreshing(true);
    setPage(1);
    retrieveCommissions(true, filterParams);
  };

  const retrieveCommissions = async (isRefreshing = false, filterParams = {}, pageParam = page) => {
    console.log("scrolling for commissions and current page", pageParam, lastPage);
    setIsLoading(true);

    const isFilterParamsChanged = !deepEqual(prevFilterParams, filterParams);
    const nextPage = isRefreshing || isFilterParamsChanged ? 1 : pageParam;

    try {
      const results = await service.get(Endpoints.COMMISSION["INDEX"], {
        page: nextPage,
        limit: limit,
        user_id: filterParams?.userId,
        currency_id: filterParams?.currencyId,
        search: filterParams?.search
      });

      const { data: fetchedCommissions, meta: pagination = {} } = results;
      
      setError(null);
      setHasError(pagination.total === 0);
      //  console.log("fetchedCommissions", JSON.stringify(fetchedCommissions, null, 2));
      if (isRefreshing || isFilterParamsChanged) {
        setPrevFilterParams(filterParams);
        setCommissions(fetchedCommissions);
        setPage(pagination.currentPage);
      } else {
        setCommissions((prevData) => [...prevData, ...fetchedCommissions]);
      }

      setHasMore(pagination?.currentPage < pagination?.lastPage);
  
      setLastPage(pagination.lastPage);
      setTotalCommissionCount(pagination.total);
      setTotalPage(pagination.lastPage);

      
    } catch (err) {
      console.log("Loading fetchedCommissions error", err);
      handleError(err);
      setError(err);
    } finally {
      setIsLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const onCommissionAdd = async (commissionData) => {
    const newCommissionData = {
       currency_id: commissionData.currencyId,
       // user_id: commissionData.userId,
      start_from: commissionData.startFrom,
      end_at: commissionData?.endAt,
      value: commissionData?.value,
      agent_quota: commissionData?.agentQuota
    };

    setIsLoading(true);

    try {
      const res = await service.post(Endpoints.COMMISSION["STORE"], newCommissionData);
      if (!res.errors) {
        retrieveCommissions();
        //navigate("Rate");
      } else {
        setError({ errorMessage: res.errors.join("\n"), ...res.errors });
      }
    }catch (error) {
     const errorMessage = handleError(error);
      console.log("Error adding commission", errorMessage);
      setError({ errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const onCommissionDelete = async (commissionId) => {
    setIsLoading(true);
console.log('deletinf',commissionId)
    try {
      const res = await service.delete(Endpoints.COMMISSION["DELETE"](commissionId), { commission_id: commissionId,});
      if (!res.errors) {
        retrieveCommissions();
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


//Add Commissione
  // const CommissionAdd = (data)=>{
//       const {currency_id, user_id, start_from, end_at, value, agent_quota } = data
      
//       //validation all required input are present
//       if(!currency_id || !user_id || !start_from || !end_at || !value || !agent_quota){ 
//         const err =  validation(currency_id, user_id, start_from, end_at, value, agent_quota)
       
//           setError(err);
//         return;
//       }


// //make a api request
//     return CommissionAddRequest(data).then(CommissionTransform)
//     .then((res) => {
//             setIsLoading(false);
//             if(!res.errors){ 
//               //selected menu on menu contect should be set to null  
//               updateMenu("CommissionSelectCurrency",{key:null, value:null})
//               updateMenu("CommissionSelectUser",{key:null, value:null})
              
//               setError(null);
//               navigate("Commission")
//             }
//         if(res.errors){  
//           errorMessage =  [].concat.apply([], Object.values(res.errors));
//           errorMessage = errorMessage.join('\n')
//           //console.log('error from content=', res.errors)
//           updatedError = {errorMessage,...res.errors};
//           setError(updatedError);
//         }
//     })
//     .catch((err) => {
        
//       setIsLoading(false); 
//       setError(err);
//     });

  // }



  //Update Commissione
  // const CommissionUpdate = (data, commissionId)=>{
//     console.log('input = ',data, commissionId)
//     const {currency_id, user_id, start_from, end_at, value, agent_quota } = data
    
//     //validation all required input are present
//     if(!currency_id ||  !start_from || !end_at || !value || !agent_quota){ 
//       const err =  validation(currency_id, user_id, start_from, end_at, value, agent_quota)
     
//         setError(err);
//       return;
//     }


// //make a api request
//   return CommissionUpdateRequest(data, commissionId).then(CommissionTransform)
//   .then((res) => {
//           setIsLoading(false);
//           if(!res.errors){ 
//             //selected menu on menu contect should be set to null  
//             updateMenu("CommissionSelectCurrency",{key:null, value:null})
//             updateMenu("CommissionSelectUser",{key:null, value:""})
            
//             setError(null);
//             navigate("Commission")
//           }
//       if(res.errors){  
//         errorMessage =  [].concat.apply([], Object.values(res.errors));
//         errorMessage = errorMessage.join('\n')
//         //console.log('error from content=', res.errors)
//         updatedError = {errorMessage,...res.errors};
//         setError(updatedError);
//       }
//   })
//   .catch((err) => {
      
//     setIsLoading(false); 
//     setError(err);
//   });

// }

 

  //Update Commissione
  
//   const CommissionDelete = (commissionId)=>{
//      //make a api request
//       return CommissionDeleteRequest(commissionId)
//                         .then(CommissionTransform)
//                         .then((res) => {console.log('commision now deleted')})
//                         }




// //load additional more customer
//         const LoadMoreCommissionrData = (sWord) =>{    
//          // console.log('scrolling')
//           setPage(page + 1)
//          retrieveCommission( sWord)
//           }




//   const retrieveCommission = ( search = null) => {
//     setSearchWord(search)
//     lastId = lastCommissionId
//     if(search){
//       setCommissionId(null)
//       lastId = null;
//     } 
   
    
//     console.log(search, lastId)
//     setIsLoading(true);
//     CommissionFetchRequest(lastId,limit, search)
//       .then(CommissionTransform)
//       .then((results) => {
//         setError(null);
//         setIsLoading(false);
//         setHasError(false);
        
//        // console.log('search=',search)
//       // console.log("today_list=",results)
       
//         if( results.commissionCount == 0 )  setHasError(true);
//         setUsers(results.users)
//         setCurrencies(results.currencies)

//        //set default currency and user 
//         if(results.currencies){
//           const listCurrencies = results.currencies
//           defaultCurrency = listCurrencies[0]
//         }
//         updateMenu("CommissionSelectCurrency",{key:defaultCurrency.key, value:defaultCurrency.value})
//         updateMenu("CommissionSelectUser",{key:null, value:'Select user'})


//         //console.log('currencies=', results.currencies)
        
//         if( results.commissionCount > 0 ) {
//            const currentCount = results.commission.length
//             //console.log('here')
//             const  lastCommission = results.commission[currentCount-1]
//             setLastCommissionId(lastCommission.commissionId)              //for scrolling limit
           
//             list = commissionList.concat(results.commission)
           
//           // console.log("today_list=",results.commission)
//            if(search){
           
//             list = results.commission
//                 setSearchCommission(list)
//             } 
//            // console.log('commissions=',list)
//             setCommissionList(list);
           
        
         
           
//            // setLastCustomerId(lastCustomerId)
//            setTotalCommissionCount(results.commissionCount)
//             setTotalPage(Math.ceil(results.commissionCount/limit))
           
//         }
       
//       })
//       .catch((err) => {
        
//         setIsLoading(false); 
//         setError(err);
//       });
//   };













//console.log('sending',page,'-',commission);
  return (
    <CommissionContext.Provider
      value={{
        CommissionUpdate:()=>{},
        CommissionAdd: ()=>{},
        CommissionDelete :()=>{},
        onCommissionUpdate:()=>{},
        retrieveCommission:()=>{},
        LoadMoreCommissionrData:()=>{},
        isLoading,
        totalCommissionCount,
        lastCommissionId,
        commissionList,
        commissions,
        CommissionTransform,
        hasError,
        error,
        showErrorBorder,
        searchWord,
        users,
        currencies,
        retrieveCommissions,
        onCommissionAdd,
        onCommissionDelete,
        onRefresh,
        refreshing,
        loadMoreCommissionData,
        prevFilterParams,
  
      }}
    >
      {children}
    </CommissionContext.Provider>
  );
};
