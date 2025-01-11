import React, { useState, useContext, createContext, useEffect } from "react";
import { navigate,validator } from '../../utils/navigationRef';
import {
  todaysRateFetchRequest,
  todaysRateTransform,
  todaysRateAddRequest,
  todaysRateUpdateRequest,
  todaysRateDeleteRequest
} from "./todays-rate.service";
import { UtilitiesContext } from "../../services/utilities/utilities.context";



export const TodaysRateContext = createContext();


export const TodaysRateContextProvider = ({children}) => {
  
  const { selectedCurrency, selectedUser, updateMenu } = useContext(UtilitiesContext);
  
  const [todaysRateList, setTodaysRateList] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [searchTodaysRate, setSearchTodaysRate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const [totalTodaysRateCount, setTotalTodaysRateCount] = useState(null);
  const [lastTodaysRateId, setLastTodaysRateId] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [users, setUsers] = useState(null);
  
  const limit  = 5;
  const [error, setError] = useState(null);

const validation =  (currency_id,main_rate, user_id)=>{
   let err = Object.assign({errorMessage:" All fields are required"},
                                currency_id === null ?  {"currencyId": "The Currency Id is Required"}: null,
                                main_rate === null ?  {"mainRate": "The main Rate is Required"}: null,
                                user_id === null ? {"userId": "The User Id is Required"}:null,
                    );
                    return err;

                    // const err = {
        //                 errorMessage:" All fields are required",
        //                ...!main_rate && {"mainRate": "The main Rate is Required"},
        //                 ...!currency_id && { "currencyId": "The Currency id is Required"},
        //                ...!user_id && { "userId": "The user id  is Required"}
        //              } 
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
     // retrieveTodaysRate();
  }, []);





//Add todays Rate
  const todaysRateAdd = (data)=>{
      const {currency_id, user_id, main_rate } = data
      
      //validation all required input are present
      if(!currency_id || !user_id || !main_rate){ 
        const err =  validation(currency_id,main_rate, user_id)
          setError(err);
        return;
      }


//make a api request
    return todaysRateAddRequest(data).then(todaysRateTransform)
    .then((res) => {
            setIsLoading(false);
            if(!res.errors){ 
              //selected menu on menu contect should be set to null  
              updateMenu("TodaysRateSelectCurrency",{key:null, value:null})
             updateMenu("TodaysRateSelectUser",{key:null, value:null})
              
             setError(null);
            
              navigate("TodaysRate")
            }
        if(res.errors){  
          errorMessage =  [].concat.apply([], Object.values(res.errors));
          errorMessage = errorMessage.join('\n')
          console.log('error from content=', res.errors)
          updatedError = {errorMessage,...res.errors};
          setError(updatedError);
        }
    })
    .catch((err) => {
        
      setIsLoading(false); 
      setError(err);
    });

  }





  //Update todays Rate
  const todaysRateUpdate = (data, rateId)=>{
    const {currency_id, user_id, main_rate } = data
    
    //validation all required input are present
    if(!currency_id || !user_id || !main_rate){ 
      const err =  validation(currency_id,main_rate, user_id)
        setError(err);
      return;
    }


//make a api request
  return todaysRateUpdateRequest(data,rateId).then(todaysRateTransform)
  .then((res) => {
          setIsLoading(false);
          if(!res.errors){ 
            //selected menu on menu contect should be set to null  
          //   updateMenu("TodaysRateSelectCurrency",{key:null, value:null})
          //  updateMenu("TodaysRateSelectUser",{key:null, value:null})
            
           setError(null);
           navigate("TodaysRate")
           retrieveTodaysRate();
          }
      if(res.errors){  
        errorMessage =  [].concat.apply([], Object.values(res.errors));
        errorMessage = errorMessage.join('\n')
        console.log('error from content=', res.errors)
        updatedError = {errorMessage,...res.errors};
        setError(updatedError);
      }
  })
  .catch((err) => {
      
    setIsLoading(false); 
    setError(err);
  });

}

 

  //Update todays Rate
  
  const todaysRateDelete = (rateId)=>{
     //make a api request
      return todaysRateDeleteRequest(rateId)
                        .then(todaysRateTransform)
                        .then((res) => {console.log('rate now deleted')})
                        }




//load additional more customer
        const LoadMoreTodaysRaterData = (sWord) =>{    
          console.log('scrolling')
          setPage(page + 1)
         retrieveTodaysRate( sWord)
          }


  const retrieveTodaysRate = ( search = null) => {
    setSearchWord(search)
    lastId = lastTodaysRateId
    if(search){
      setTodaysRateId(null)
      lastId = null;
    } 
   
    
    console.log(search, lastId)
    setIsLoading(true);
    todaysRateFetchRequest(lastId,limit, search)
      .then(todaysRateTransform)
      .then((results) => {
        setError(null);
        setIsLoading(false);
        setHasError(false);
       // console.log("hereeeee2")
       // console.log('search=',search)
      // console.log("today_list=",results)
       
        if( results.rateCount == 0 )  setHasError(true);
        setUsers(results.users)
        setCurrencies(results.currencies)

        //set default currency and user 
        if(results.currencies){
          const listCurrencies = results.currencies
          defaultCurrency = listCurrencies[0]
        }
        updateMenu("CommissionSelectCurrency",{key:defaultCurrency.key, value:defaultCurrency.value})
        updateMenu("CommissionSelectUser",{key:null, value:'Select user'})
        
        if( results.rateCount > 0 ) {
           const currentCount = results.rate.length
            //console.log('here')
            const  lastTodaysRate = results.rate[currentCount-1]
            setLastTodaysRateId(lastTodaysRate.rateId)
           
            list = todaysRateList.concat(results.rate)
           
          // console.log("today_list=",results.rate)
           if(search){
           
            list = results.rate
                setSearchTodaysRate(list)
            } 
          //  console.log('todayslist=',list)
            setTodaysRateList(list);
           
        
         
           
           // setLastCustomerId(lastCustomerId)
           setTotalTodaysRateCount(results.rateCount)
            setTotalPage(Math.ceil(results.rateCount/limit))
           
        }
       
      })
      .catch((err) => {
        
        setIsLoading(false); 
        setError(err);
      });
  };













//console.log('sending',page,'-',todaysRate);
  return (
    <TodaysRateContext.Provider
      value={{
        isLoading,
        totalTodaysRateCount,
        lastTodaysRateId,
        todaysRateList,
        todaysRateTransform,
        hasError,
        error,
        todaysRateUpdate,
        todaysRateAdd,
        todaysRateDelete,
        retrieveTodaysRate,
        showErrorBorder,
        LoadMoreTodaysRaterData,
        searchWord,
        users,
        currencies
      }}
    >
      {children}
    </TodaysRateContext.Provider>
  );
};
