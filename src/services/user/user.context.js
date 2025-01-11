import React, { useState, useContext, createContext, useEffect } from "react";
import Endpoints from "../../utils/apis";
import service from "../../utils/request";
import { Alert } from 'react-native';

import { navigate } from "../../utils/navigationRef";
import endpoints from "../../utils/apis";

export const UserContext = createContext();

const showAlert = (title,message) =>
  Alert.alert(
    title,
   message,
    // [
    //   {
    //     text: 'Cancel',
    //     onPress: () => Alert.alert('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    // ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

export const UsersContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const onGenerateTransactionReport = async (data) => {
    const { startDate, endDate, selectCurrency, format } = data;

    //console.log(customer_data)
    setIsLoading(true);

    try {
      const res = await service.post(
        endpoints.USER["GENERATETRANSACTIONREPORT"],
        {
          start_date: startDate,
          end_date: endDate,
          currency_id: selectCurrency,
          format: format,
        }
      );

      const { data } = res;

      console.log(res);
      setIsLoading(false);
      if (!data.errors) {
        navigate("Dashboard");
      }
      if (data.errors) {
        errorMessage = [].concat.apply([], Object.values(res.errors));
        errorMessage = errorMessage.join("\n");

        updatedError = { errorMessage, ...res.errors };
        setError(updatedError);
      }
    } catch (error) {
      console.log(error); // This will log the error message
      // setError(errorObject);
      setIsLoading(false);
    }
  };

  const onVerifyEmail = async () => {
    //const senderId = activeSenderId;
    console.log("on verify email")

    console.log("link", Endpoints.USER["VERIFYEMAIL"]);
    try {
     
      setIsLoading(true);

      apiResponse = await service.post(Endpoints.USER["VERIFYEMAIL"]);
      setIsLoading(false);
      if (!apiResponse.errors) {
        console.log(JSON.stringify(apiResponse?.data, null, 2));
        showAlert('Success', "verification link sent to your email");
        
        setError(null);
      } else {
        console.log(JSON.stringify(apiResponse?.errors, null, 2));
        setError('Verification failed');
      }

    } catch (e) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  const onVerifyIdentity = async () => {
    //const senderId = activeSenderId;

    console.log("onverifyidentity");
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        hasError,
        error,
        onGenerateTransactionReport,
        onVerifyEmail,
        onVerifyIdentity
      }}
    >
      {children}  
    </UserContext.Provider>
  );
};
