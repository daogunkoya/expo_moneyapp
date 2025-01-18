import React, { useState, useContext, createContext, useEffect } from "react";
import Endpoints from "../utils/apis";
import service from "../utils/request";
import { useNavigation } from '@react-navigation/native';
import { CommonContext } from "./utilities/common.context";
import { TransactionsContext } from "./transactions/transactions.context";



import { navigate } from "../utils/navigationRef";
import endpoints from "../utils/apis";
import { constant } from "lodash";

export const SendMoneyContext = createContext();

export const SendMoneyContextProvider = ({ children }) => {

  const { currencies:fetchedCurrencies } = useContext(CommonContext);
  const {setTransactions} = useContext(TransactionsContext)
  const navigation = useNavigation();

  //console.log('fetchedCurrencies',fetchedCurrencies)

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [transferBreakdown, setTransferBreakdown] = useState({});
  const [ newTransaction, setNewTransaction] = useState({});
  const [conversionType, setConversionType] = useState(1);
  const [currecies, setCurrecies] = useState([]);
  const [currencyOrigin, setCurrencyOrigin] = useState(null);
  const [currencyDestination, setCurrencyDestination] = useState(null);
  const [activeSender, setActiveSender] = useState(null);
  const [activeReceiver, setActiveReceiver] = useState(null);

  const limit = 5;

  const [error, setError] = useState(null);



  const fetchTransferBreakdown = async (sendAmount, conversionType, originCurrency, destinationCurrency) => {
    setIsLoading(true);

    
    console.log('Sending',sendAmount, conversionType, originCurrency, destinationCurrency)
    try {
     
      setCurrencyOrigin(originCurrency)
      setCurrencyDestination(destinationCurrency)

      const results = await service.post(Endpoints.TRANSFERBREAKDOWN, {
        send_amount: sendAmount,
         conversion_type:conversionType,
         origin_currency_id:originCurrency?.['currencyId'],
         destination_currency_id:destinationCurrency?.['currencyId'],
      });
      const { data:breakDown} = results;

     // console.log("fetchAddress", fetchAddress);

      setError(null);
      setIsLoading(false);

      if (breakDown) {
            setTransferBreakdown(breakDown)
            setConversionType(conversionType)
      }
    } catch (err) {
      console.log("Fetching TransferBreakdown error", err);
      setIsLoading(false);
      setError(err);
    }
  };



  const resetTransferBreakdown = () => {
    setTransferBreakdown({})
  }



  const sendMoney = async (receiverId) => {
    setIsLoading(true);

    const {amountSent} = transferBreakdown

    console.log('receiverId',receiverId, conversionType)
    try {
      const results = await service.post(Endpoints.SENDMONEY, {
          receiver_id: receiverId,
          conversion_type:conversionType,
          amount_sent:amountSent,
           payment_token:"tobeadded",
           origin_currency_id: currencyOrigin?.currencyId,
          destination_currency_id : currencyDestination?.currencyId,
      });
      const { data:transaction} = results;

     // console.log("fetchAddress", fetchAddress);

      setError(null);
      setIsLoading(false);

      if (transaction) {
          //add new transaction to transaction list
          setTransactions((prevData) => [ transaction, ...prevData ]);

          resetTransaction(transaction)
            // navigate('Transaction',{screen:"TransactionList"});
            navigation.reset({
              index: 0,
              routes: [{ name: 'Transaction', params: { screen: 'TransactionList' } }],
            });
      }
    } catch (err) {
      console.log("Fetching TransferBreakdown error", err);
      setIsLoading(false);
      setError(err);
    }
  };



  const uploadIdentification = async (formData) => {
    setIsLoading(true);

    console.log('formData sent')

    try {
      const results = await service.post(Endpoints.UPLOADIDENTIFICATION, formData);
      const { data} = results;
      console.log("results", data);

      setError(null);
      setIsLoading(false);

    } catch (err) {
      console.log("Fetching TransferBreakdown error", err);
      setIsLoading(false);
      setError(err);
    }
  };



  const resetTransaction  = (transaction) => {
    setNewTransaction(transaction)
    setTransferBreakdown({})
    setActiveSender(null)
    setActiveReceiver(null)
  }





  useEffect(() => {
    if(fetchedCurrencies){
      setCurrecies(fetchedCurrencies)
    }
  }, [fetchedCurrencies]);

  return (
    <SendMoneyContext.Provider
      value={{
        resetTransferBreakdown,
        fetchTransferBreakdown,
        transferBreakdown,
        sendMoney,
        currencyDestination,
        currencyOrigin,
        sendMoneyConversionType:conversionType,
        isLoading,
        hasError,
        error,
        activeSender,
        activeReceiver,
        setActiveSender,
        setActiveReceiver,
        updateSendMoneyCurrencyOrigin:setCurrencyOrigin,
        updateSendMoneyCurrencyDestination:setCurrencyDestination,
        uploadIdentification
        
      }}
    >
      {children}
    </SendMoneyContext.Provider>
  );
};
