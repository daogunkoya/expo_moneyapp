import react, { useContext, useState, useEffect, useCallback } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SendMoneyContext } from "../../../services/sendmoney.context";
import { debounce, set } from "lodash";
import { CommonContext } from "../../../services/utilities/common.context";
import { SendReceiveInputComponent } from "../components/send-receive-input.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { FlowIconComponent } from "../components/flow-icon.component";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ErrorText, SectionCenter, SubmitButton } from "../../../styles/common.style";
import { SendMoneyContainer, Seperator, Title } from "../components/send-money.styles";
import {LoadingComponent} from "../../../components/loading.component";
    
      import { onContinueAction, createDebouncedFetchTransferBreakdown, handleAmountChange, handleStateUpdates } from "../utility";


  const validationSchema = Yup.object().shape({
    sendAmountInput: Yup.string().required('Valid Send Amount is required'),
    receiveAmountInput: Yup.string().required('Receiver Amount is required'),
    currencyOriginSelected: Yup.object().required('Origin Currency is required'),
    currencyDestinationSelected: Yup.object().required('Destination Currency is required'),
  });




export const SendMoneyAmountCalculatorScreen= ({ route, navigation }) => {

  
  const { user: currentUser, defaultOriginCurrency, defaultDestinationCurrency,
    isLoading:fetchHomeLoadingReady, userIdentityverified,userEmailverified } = useContext(CommonContext);
  const { user } = useContext(AuthenticationContext);
  
    console.log('userEmailverified',userEmailverified,'useridentityverified',userIdentityverified)
   // console.log('user', JSON.stringify(currentUser, null, 2))
  //  console.log('default destination currency', JSON.stringify(defaultDestinationCurrency, null, 2))
  //console.log("route param", JSON.stringify(route?.params, null, 2))
  const { fetchTransferBreakdown , sendMoneyConversionType , transferBreakdown,activeSender,setActiveSender, activeReceiver, setActiveReceiver, updateSendMoneyCurrencyOrigin, updateSendMoneyCurrencyDestination} = useContext(SendMoneyContext)
  const {amountSent = "", localAmount = "", exchangeRate = 0.00, totalAmount = 0.00, totalCommission = 0.00} = transferBreakdown;
  
  // const [originCurrency, setOriginCurrency] = useState(currentUser?.userCurrency['originCurrency'] || defaultOriginCurrency);
  // const [destinationCurrency, setDestinationCurrency] = useState(currentUser?.userCurrency['destinationCurrency'] || defaultDestinationCurrency);

  const [initialValues, setInitialValues] = useState({
    sendAmountInput:amountSent,
     receiveAmountInput:localAmount,
      currencyOriginSelected:currentUser?.userCurrency?.originCurrency || defaultOriginCurrency,
       currencyDestinationSelected:currentUser?.userCurrency?.destinationCurrency || defaultDestinationCurrency,});
 
  const {  selectedOriginCurrency = null, selectedDestinationCurrency = null, sender = null, receiver = null } = route.params || {};
  const [currencyOriginSelected, setCurrencyOriginSelected] = useState(currentUser?.userCurrency?.originCurrency || defaultOriginCurrency);
  const [currencyDestinationSelected, setCurrencyDestinationSelected] = useState(currentUser?.userCurrency?.destinationCurrency || defaultDestinationCurrency);
 

   //console.log('receiver from receiverList',JSON.stringify(receiver,null,2))

  // console.log('currencyOriginSelected',currencyOriginSelected)
  // console.log('currencyDestinationSelected',currencyDestinationSelected)


 
  // State variables for the values sent to the API
  const [sendAmountApi, setSendAmountApi] = useState(amountSent);
  const [receiveAmountApi, setReceiveAmountApi] = useState(localAmount);

  const [sendAmountInput, setSendAmountInput] = useState(amountSent);
  const [receiveAmountInput, setReceiveAmountInput] = useState(localAmount);


  // Inside your component
const debouncedFetchTransferBreakdown = createDebouncedFetchTransferBreakdown(fetchTransferBreakdown);

// Usage of handleAmountChange in your component
const onAmountChange = (value, type, setFieldValue, formikValues) => {
  handleAmountChange(
    value,
    type,
    setFieldValue,
    setSendAmountInput,
    setSendAmountApi,
    setReceiveAmountInput,
    setReceiveAmountApi,
    debouncedFetchTransferBreakdown,
    formikValues
    // currencyOriginSelected,
    // currencyDestinationSelected
  );
};

  const onContinue = () => 
   onContinueAction(user, activeSender, activeReceiver, navigation, userEmailverified , userIdentityverified);
  
 
  // useEffect(() => {
  //   if(receiveAmountInput !== receiveAmountApi)
  //     {
  //        setSendAmountInput(amountSent);
        
  //     }
  //     if (amountSent !== sendAmountInput) {
  //       setReceiveAmountInput(localAmount);
  //      }

  //      setInitialValues({
  //       sendAmountInput:amountSent,
  //        receiveAmountInput:localAmount,
  //         currencyOriginSelected:currencyOriginSelected,
  //          currencyDestinationSelected:currencyDestinationSelected,
  //      })

  // }, [ localAmount, amountSent]);


  // useEffect(() => {
  //   if (selectedOriginCurrency) {
  //       setCurrencyOriginSelected(selectedOriginCurrency);
  //       setOriginCurrency(selectedOriginCurrency);
  //     }
      
  //     if(selectedDestinationCurrency){
  //       setCurrencyDestinationSelected(selectedDestinationCurrency);
  //       setDestinationCurrency(selectedDestinationCurrency);
  //     }
    
  // }, [selectedOriginCurrency, selectedDestinationCurrency]);


  // useEffect(() => {
  //   if(sender) setActiveSender(sender);
  //   if(receiver) setActiveReceiver(receiver);
  // }, [sender, receiver]);

  useEffect(() => {
    handleStateUpdates({
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
      routeParams: route.params || {},
    });
  }, [
    receiveAmountInput,
    receiveAmountApi,
    sendAmountInput,
    amountSent,
    localAmount,
    selectedOriginCurrency,
    selectedDestinationCurrency,
    sender,
    receiver,
    currentUser,
    defaultOriginCurrency,
    defaultDestinationCurrency,
    route?.params 
  ]);



  const renderComponent = () => (
    
    <SafeArea>
        <Title>Enter Amount you want to send</Title>
      <SendMoneyContainer>
     
          <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => onContinue()}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                  <>
                    <SendReceiveInputComponent
                      InputTitle="You Send"
                      inputValue={values?.sendAmountInput}
                      currencySelectInfo="Balance: 0.00"
                      handleInputChange={(u) => onAmountChange(u, 1,setFieldValue, values)}
                      currencyTransferType="Origin"
                      currencyCode={initialValues?.currencyOriginSelected?.currencySymbol}
                      currencyTitle={initialValues?.currencyOriginSelected?.currencyTitle}
                    />
                  
                    <Seperator  />
                      <FlowIconComponent totalAmount={`Fees ${totalCommission} ${initialValues?.currencyOriginSelected?.currencyTitle}`} iconName="link" />
                      
                    <Seperator  />
                    <Seperator  />
                        <FlowIconComponent totalAmount={`Total Amount ${totalAmount} ${initialValues?.currencyOriginSelected?.currencyTitle}`} iconName="bank" />
                    <Seperator  />


                    <SendReceiveInputComponent
                      InputTitle="Receiver gets"
                      inputValue={values?.receiveAmountInput}
                      currencySelectInfo=""
                      handleInputChange={(u) => onAmountChange(u, 2, setFieldValue, values)}
                      currencyTransferType="Destination"
                      currencyCode= {initialValues?.currencyDestinationSelected?.currencySymbol}
                      currencyTitle= {initialValues?.currencyDestinationSelected?.currencyTitle}
                    />
              
                <SectionCenter>
                <SubmitButton onPress={handleSubmit}>Continue</SubmitButton>
                      <ErrorText>{errors.sendAmountInput}</ErrorText>
                      <ErrorText>{errors.receiveAmountInput}</ErrorText>
                      <ErrorText>{errors.currencyOriginSelected}</ErrorText>
                      <ErrorText>{errors.currencyDestinationSelected}</ErrorText>
                </SectionCenter>
              </>
              )}  
            </Formik>
      </SendMoneyContainer>
    </SafeArea>
  );

  return !fetchHomeLoadingReady ? renderComponent() : null;
};
