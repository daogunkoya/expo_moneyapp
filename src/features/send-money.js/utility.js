import { debounce, set } from "lodash";
import { useCallback } from "react";

export const onContinueAction = (user, activeSender, activeReceiver, navigation, userEmailverified , userIdentityverified) => {
  console.log('active sender', activeSender);
 // console.log('userVerified', userVerified);

  const isCustomer = user?.userRoleType === "Customer";
  const hasSender = activeSender !== null;
  const receiverIsSet = activeReceiver !== null;

  if (!userEmailverified || !userIdentityverified) {
      navigation.navigate("CompleteSetup", 
      { user: user,
        sender: activeSender, 
        receiver: activeReceiver,  
        isCustomer: isCustomer,
         userIdentityverified: userIdentityverified,
          userEmailverified: userEmailverified });
      return;
  }

  if (receiverIsSet) {
      navigation.navigate("SendMoneyReview", { sender: activeSender, receiver: activeReceiver });
  } else if (isCustomer || hasSender) {
      navigation.navigate("SendMoneyReceivers", { sender: activeSender, receiver: activeReceiver });
  } else {
      navigation.navigate("SendMoneySenders");
  }
};



 // Utility function for the debounced fetch transfer breakdown
export const createDebouncedFetchTransferBreakdown = (fetchTransferBreakdown) =>
    useCallback(
      debounce((amount, type, currencyOriginSelected, currencyDestinationSelected) => {
        fetchTransferBreakdown(amount, type, currencyOriginSelected, currencyDestinationSelected);
      }, 500), // Adjust the debounce delay as needed
      [fetchTransferBreakdown]
    );
  
  // Utility function to handle amount change
  export const handleAmountChange = (
    value,
    type,
    setFieldValue,
    setSendAmountInput,
    setSendAmountApi,
    setReceiveAmountInput,
    setReceiveAmountApi,
    debouncedFetchTransferBreakdown,
    initialValues
    // currencyOriginSelected,
    // currencyDestinationSelected
  ) => {
    const cleanedValue = parseFloat(value.toString().replace(/,/g, ''));

    if (type === 1) {
      setSendAmountInput(cleanedValue);
      setSendAmountApi(cleanedValue);
      setFieldValue('sendAmountInput', cleanedValue);
      //setFieldValue('receiveAmountInput', '');
    } else if (type === 2) {
      setReceiveAmountInput(cleanedValue);
      setReceiveAmountApi(cleanedValue);
      setFieldValue('receiveAmountInput', cleanedValue);
      //setFieldValue('sendAmountInput', '');
    }

    if(!cleanedValue || cleanedValue <= 0 ) {
      setFieldValue('sendAmountInput', '');
      setFieldValue('receiveAmountInput', '');
    }
  
    if(cleanedValue > 0 )debouncedFetchTransferBreakdown(cleanedValue, type, initialValues?.currencyOriginSelected, initialValues?.currencyDestinationSelected);
  };

  export const handleStateUpdates = ({
    sendMoneyConversionType,
    receiveAmountInput,
    receiveAmountApi,
    sendAmountInput,
    amountSent,
    localAmount,
    setSendAmountInput,
    setReceiveAmountInput,
    setInitialValues,
    // currencyOriginSelected,
    // currencyDestinationSelected,
    setCurrencyOriginSelected,
    setCurrencyDestinationSelected,
    // setOriginCurrency,
    // setDestinationCurrency,
    setActiveSender,
    setActiveReceiver,
    currentUser,
    defaultOriginCurrency,
    defaultDestinationCurrency,
    updateSendMoneyCurrencyDestination,
    routeParams = {},
    // sender,
    // receiver,
  }) => {
    const { sender = null,
       receiver = null,
       selectedOriginCurrency = null, 
       selectedDestinationCurrency = null, } = routeParams || {};

    // Handle amount inputs and values
    if (sendMoneyConversionType == 2) {
      setSendAmountInput(amountSent);
    }
    if (sendMoneyConversionType == 1) {
      setReceiveAmountInput(localAmount);
    }
  
    setInitialValues({
      sendAmountInput: amountSent,
      receiveAmountInput:localAmount,
      currencyOriginSelected:   selectedOriginCurrency || currentUser?.userCurrency?.originCurrency || defaultOriginCurrency ,
      currencyDestinationSelected: selectedDestinationCurrency || currentUser?.userCurrency?.destinationCurrency || defaultDestinationCurrency  ,
      
      // sendAmountInput: sendMoneyConversionType == 2? localAmount:"",
      // receiveAmountInput:sendMoneyConversionType == 1?localAmount:"",
      // currencyOriginSelected: currencyOriginSelected,
      // currencyDestinationSelected: currencyDestinationSelected,

    });
  
    // Handle currency updates
    // if (selectedOriginCurrency) {
    //   setCurrencyOriginSelected(selectedOriginCurrency);
    //   setInitialValues(prevInitialValues => ({
    //     ...prevInitialValues,
    //     currencyOriginSelected: selectedOriginCurrency,
    //   }));
    // }
  
    if (selectedDestinationCurrency) {
      updateSendMoneyCurrencyDestination(selectedDestinationCurrency);
      //setCurrencyDestinationSelected(selectedDestinationCurrency); 
    //   setInitialValues(prevInitialValues => ({
    //   ...prevInitialValues,
    //   currencyDestinationSelected: selectedDestinationCurrency,
    // }));
    // setDestinationCurrency(selectedDestinationCurrency);
    }
  
    // Handle sender and receiver updates
    if (sender) {
      setActiveSender(sender);
    }
    if (receiver) {
      setActiveReceiver(receiver);
      updateSendMoneyCurrencyDestination(receiver?.receiverCurrency);
    }
  };