import React, { useState,
                  createContext,
                   useEffect,useMemo , useContext,
                   useReducer } from "react";

// import {todaysRateFetchRequest} from "./utilities.service";

import { navigate } from '../../utils/navigationRef';
import {
  sendersFetchRequest,
  sendersTransform,
} from "../senders/senders.service";

import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { store_id } from "../../utils/env";



export const UtilitiesContext = createContext();

export const UtilitiesContextProvider = ({children}) => {
  

  const SELECTEDUSER = 'SELECTEDUSER';
  const SELECTEDPAYMENTSENDER = 'SELECTEDPAYMENTSENDER';
  const SELECTEDPAYMENTRECEIVER = 'SELECTEDPAYMENTRECEIVER';
  const SELECTEDCURRENCY= 'SELECTEDCURRENCY';
  const SELECTEDCOMMISSION= 'SELECTEDCOMMISSION';
  const SELECTEDTODAYSRATE = 'SELECTEDTODAYSRATE';

  
  const [senderKeyValue, setSenderKeyValue] = useState([]);
  const [myStore, setMyStore] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setRefreshing] = useState(false);


  const limit  = 200;

 
  

  const [utilitiesState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        // Handle the AUTHENTICATED action and set the state to be authenticated
        case SELECTEDTODAYSRATE:
          
          return {
            ...state,
            selectedTodaysRate: action.payload,
            
          };
        case SELECTEDCURRENCY:
          return {
            ...state,
            selectedCurrency: action.payload,
          };
          case SELECTEDUSER:
            return {
              ...state,
              selectedUser: action.payload,
            };
          case SELECTEDPAYMENTSENDER:
            return {
              ...state,
              selectedPaymentSender: action.payload,
            };
          case SELECTEDPAYMENTRECEIVER:
            return {
              ...state,
              selectedPaymentReceiver: action.payload,
            };
          case SELECTEDCOMMISSION:
            return {
              ...state,
              selectedCurrency: action.payload,
            };
        default:
          throw new Error(`${action.type} is not a valid action type`);
      }
    },
    {
      selectedPaymentSender:{key:null, value:null},
      selectedPaymentReceiver:{key:null, value:null},
      selectedTodaysRate:null,
      selectedUser: {key:null, value:null},
      selectedCurrency: {key:null, value:null},
      selectedCommission:null,
      users:[],
      currencies:[],
      commissions:[],
    },
  );



//what should happen when load or add parameter to reload with it
useEffect(() => {  
 // retrieveSenders();
}, []);

const updateMenu = (type, item)=>{
//console.log('item = ', item)
  switch(type){
    case "TodaysRateSelectCurrency":
    return updateSelectedCurrency(item);

    case "TodaysRateSelectUser":
    return updateSelectedUser(item);

    case "CommissionSelectCurrency":
      return updateSelectedCurrency(item);
  
      case "CommissionSelectUser":
      return updateSelectedUser(item);

      case "PaymentSenderSelect":
       return  dispatch({ type: SELECTEDPAYMENTSENDER, payload: item });

      case "PaymentReceiverSelect":
        return dispatch({ type: SELECTEDPAYMENTRECEIVER, payload: item });

    default:
      return;

  }


}


//below functions will be moved back to updateMenu
  // update new selected todays rate
    const updateSelectedTodaysRate = (item)=>{
      dispatch({ type: SELECTEDTODAYSRATE, payload: item });
      return;     
    } 

    
    // update new selected todays rate
    const updateSelectedUser = (item)=>{
      dispatch({ type: SELECTEDUSER, payload: item });
      return;     
    } 

    // update new selected todays rate
    const updateSelectedCurrency = (item)=>{
      dispatch({ type: SELECTEDCURRENCY, payload: item });
      return;     
    } 


    // update new selected todays rate
    const updateSelectedCommission = (item) =>{
      dispatch({ type: SELECTEDCOMMISSION, payload: item });
      return;     
    } 




//for displaying error border on screen  for validation
const showErrorBorder = (errorArray, errorProperty)=>{
  //console.log(errorArray)
  if(errorArray){
    if(errorProperty && errorArray[errorProperty]) return  {borderWidth:'2', borderColor:'red'};
  }
        return {};
        
    } 



const keyValueExtractor = (list,key_name,value_name)=>{


 return   list.map((curItem, index)=>{
                            key = curItem[key_name]
                            value = curItem[value_name]
                            return {key:key,value:value }
                          })

}

const retrieveMyStore = async () => {

  setIsLoading(true);


const storeId = store_id
  try {
    const results = await service.get(Endpoints.MYSTORE["SHOW"](storeId));

    const { data: fetchData, meta: pagination = {} } = results;
    
    setError(null);
    setHasError(pagination.total === 0);

    if(fetchData){
      setMyStore(fetchData);
    }

    
  } catch (err) {
    console.log("Loading fetchCurrencies error", err);
    setError(err);
  } finally {
    setIsLoading(false);
  }
};


// const onUpdateMyStore = async (storeUpdateData) => {


//   setIsLoading(true);


// const storeId = store_id
// const storeData = {
//   "store_name": storeUpdateData?.storeName,
//   "store_slogan": storeUpdateData?.storeSlogan,
//   "store_phone": storeUpdateData?.storePhone,
//   "store_mobile": storeUpdateData?.storeMobile,
//   "store_email": storeUpdateData?.storeEmail,
//   "store_address": storeUpdateData?.storeAddress,
//   "store_city": storeUpdateData?.storeCity,
//   "store_country": storeUpdateData?.storeCountry,
//   "store_postcode": storeUpdateData?.storePostcode,
//   "store_url": storeUpdateData?.storeUrl,
//   "enable_sms": storeUpdateData?.enableSms?1:0,
//   "enable_credit": storeUpdateData?.enableCredit?1:0,
//   "enable_multiple_receipt": storeUpdateData?.enableMultipleReceipt?1:0,

// }
//   try {
//     const results = await service.put(Endpoints.MYSTORE["UPDATE"](storeId),storeData);

//     const { data: fetchData, meta: pagination = {} } = results;
    
//     setError(null);
//     setHasError(pagination.total === 0);

//     if(fetchData){
//       setMyStore(fetchData);
//     }

    
//   } catch (err) {
//     console.log("Loading fetchCurrencies error", err);
//     setError(err);
//   } finally {
//     setIsLoading(false);
//   }
// };







//console.log('sending',page,'-',todaysRate);
  return (
    <UtilitiesContext.Provider
      value={{ 
        selectedPaymentSender:utilitiesState.selectedPaymentSender,
        selectedPaymentReceiver:utilitiesState.selectedPaymentReceiver,
        selectedTodaysRate:utilitiesState.selectedTodaysRate,
        selectedUser:utilitiesState.selectedUser,
        selectedCurrency:utilitiesState.selectedCurrency,
        selectedCommission:utilitiesState.selectedCommission,
        users:utilitiesState.users,
        currencies:utilitiesState.currencies,
        updateMenu,
        updateSelectedTodaysRate,
        updateSelectedUser,
        updateSelectedCurrency,
        updateSelectedCommission,
       // senders,
        keyValueExtractor,
        senderKeyValue,
        isLoading,
        hasError,
        error,
        myStore,
        retrieveMyStore,
       // onUpdateMyStore
       // LoadMoreData
        

      }}
    >
      {children}
    </UtilitiesContext.Provider>
  );
};
