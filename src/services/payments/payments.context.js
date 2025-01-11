import React, {
  useState,
  createContext,
  useReducer,
} from "react";

import {
  calculateTransactionRequest,
  transactionTransform,
} from "./payments.service";

import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { useConfirmPayment} from "@stripe/stripe-react-native";

export const PaymentsContext = createContext();

export const PaymentsContextProvider = ({ children }) => {
  const { confirmPayment } = useConfirmPayment(); 
  const defaultCal = { commission: "0", local: "", total: "0", rate: "0" };
  const [transactionCalulateResult, setTransactionCalculateResult] =
    useState(defaultCal);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [convertType, setConvertType] = useState(1);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const SELECTEDUSER = "SELECTEDUSER";
  const SELECTEDCURRENCY = "SELECTEDCURRENCY";
  const SELECTEDCOMMISSION = "SELECTEDCOMMISSION";
  const SELECTEDTODAYSRATE = "SELECTEDTODAYSRATE";

  const [PaymentsState, dispatch] = useReducer(
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
      selectedTodaysRate: null,
      selectedUser: { key: null, value: null },
      selectedCurrency: { key: null, value: null },
      selectedCommission: null,
      users: [],
      currencies: [],
      commissions: [],
    }
  );

  const calculateTransaction = (amountToSend, conversion_type) => {
    console.log("sending=", amountToSend, conversion_type);
    setConvertType(conversion_type);
    const dataAmount = {
      send_amount: amountToSend,
      conversion_type: conversion_type,
    };

    setIsLoading(true);

    calculateTransactionRequest(dataAmount)
      .then(transactionTransform)
      .then((results) => {
        setError(null);
        setIsLoading(false);
        setHasError(false);
        //console.log(results)
        setTransactionCalculateResult(results);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  };

  const createPaymentIntent = async (amount) => {
    const response = await service.post(Endpoints.PAYMENT["PAYMENTINTENT"], {
      amount: amount * 100,
    });
    const { clientSecret } = response;
    setClientSecret(clientSecret);
  };

  const handlePayment = async () => {

   

    try {
      if (!clientSecret) return;
      console.log("clentSecret", clientSecret);

      // Confirm the payment with card details
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            email: "email@example.com",
          },
        },
      });

      if (error) {
        console.log("Payment confirmation error", error);
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent) {
        console.log("Payment successful", paymentIntent);
        setPaymentSuccessful(false);
      }
      setClientSecret(null)
      setPaymentSuccessful(false);
    } catch (e) {
      console.log("Payment failed", e);
      setPaymentSuccessful(false);
    }
  };

  

  //console.log('sending',page,'-',todaysRate);
  return (
    <PaymentsContext.Provider
      value={{
        selectedTodaysRate: PaymentsState.selectedTodaysRate,
        selectedUser: PaymentsState.selectedUser,
        selectedCurrency: PaymentsState.selectedCurrency,
        selectedCommission: PaymentsState.selectedCommission,
        users: PaymentsState.users,
        currencies: PaymentsState.currencies,
        calculateTransaction,
        transactionCalulateResult,
        convertType,
        clientSecret,
        paymentSuccessful,
        createPaymentIntent,
        handlePayment
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};
