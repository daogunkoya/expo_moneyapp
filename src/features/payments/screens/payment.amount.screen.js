import React, { useState, useContext , useEffect} from "react";
import { Menu, Divider, Button} from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
import { ScrollView } from "react-native";
import { UtilitiesContext } from "../../../services/utilities/utilities.context";
import { PaymentsContext } from "../../../services/payments/payments.context";


import {
  PaymentBackground,
  AccountCover,
  PaymentContainer,
  PaymentButton,
  PaymentInput,
  ErrorContainer,
  Title,
  
} from "../components/payment-create.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
//import { PaymentsContext } from "../../../services/Payments/Payments.context";



export const PaymentAmountScreen = ({ navigation , route}) => {


   //const {customer,menuValue,type} = route.params; 

   
  
  
  const {   receiverKeyValue, selectedPaymentReceiver } = useContext(UtilitiesContext);
  const {   calculateTransaction, transactionCalulateResult } = useContext(PaymentsContext);
 const {commission:resCommission, rate:resExchangeRate, local:resLocal, total:resTotal} = transactionCalulateResult
//console.log(resCommission,resExchangeRate, resLocal, resTotal )



const [commission,setCommission] = useState(resCommission)
const [total,setTotal] = useState(resTotal)
const [amountToSend,setAmountToSend] = useState(null)
const [amountToCollect,setAmountToCollect] = useState(null)
const [exchangeRate,setExchangeRate] = useState(resExchangeRate)
const [convertType,setConvertType] = useState(1)

useEffect(() => { 
  const {commission:resCommission, rate:resExchangeRate, local:resLocal, total:resTotal, sendAmount:resAmount} = transactionCalulateResult 
  setCommission(resCommission)
  setTotal(resTotal)
  setExchangeRate(resExchangeRate)
  
  if(convertType == 1){
    setAmountToCollect(resLocal)
  }
  if(convertType == 2){
    
    setAmountToSend(resAmount)
  }
  //setAmountToSend(resAmount)

}, [resCommission,resLocal, resTotal]);
//console.log('transactionCalulateResult=',transactionCalulateResult)
 
const sendToCalculate = ( value, type )=>{
  setConvertType(type)
  setAmountToSend(null)
  setAmountToCollect(null)

  console.log('type=',type)  
  //const value = conversionType == 1?amountToSend:amountToCollect
  
  
    
  if(type == 1){
    setAmountToSend(value)
  }
  if(type == 2){
      setAmountToCollect(value)
  }
  calculateTransaction(value, type)

}

//console.log('calculate=',transactionCalulateResult)
//console.log('semders=', receivers)
  return (
    <PaymentBackground>
      <ScrollView>
        <AccountCover />
      
        <PaymentContainer>
        <Title>Amount You Sending </Title>
          <Spacer size="large">
            <PaymentInput
              label="Amount To Send GBP(&#163;)"
              //style={showErrorBorder(error,'PaymentTitle')}
              value={amountToSend}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => {sendToCalculate(p,1); } }
              //onKeyPress={(p) => sendToCalculate(1)}
              //onPressIn={(p) =>  navigation.navigate("Menu",{title:"Title", type:'PaymentCreateTitle', redirectTo:'PaymentCreate',list:['Mr', 'Miss', 'Mr']})}
              //onPressIn={(p) =>  navigation.navigate("Menu",{title:"Payment Receiver", redirectTo:'PaymentReceiver', type:'PaymentReceiverSelect',list:receiverKeyValue})}
           />
          </Spacer>
          <Spacer size="large">
            <PaymentInput
              label="Amount To Collect (&#8358;) "
              //style={showErrorBorder(error,'PaymentTitle')}
              value={amountToCollect}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => {sendToCalculate(p, 2); } }
              //onKeyPress={(p) => sendToCalculate(2)}
             // onChangeText={(p) => setTitle(p)}
              //onPressIn={(p) =>  navigation.navigate("Menu",{title:"Title", type:'PaymentCreateTitle', redirectTo:'PaymentCreate',list:['Mr', 'Miss', 'Mr']})}
              //onPressIn={(p) =>  navigation.navigate("Menu",{title:"Payment Receiver", redirectTo:'PaymentReceiver', type:'PaymentReceiverSelect',list:receiverKeyValue})}
           />
          </Spacer>

        {commission && commission !== '0'?
          <Spacer size="large">
              <Text>Commission </Text>
              <Text variant="label"> {commission}</Text>
            </Spacer>: null}
        {total && total !== '0'?
          <Spacer size="large">
              <Text>Total Amount</Text>
              <Text variant="label">{total}</Text>
            </Spacer>:null}
        
        {exchangeRate && exchangeRate !== '0'?
          <Spacer size="large">
              <Text>Exchange Rate</Text>
              <Text variant="label">{exchangeRate}</Text>
            </Spacer>:null}
         
          <Spacer size="large">
              <PaymentButton
                icon="arrow-right"
                mode="contained"
                onPress={(p) =>  navigation.navigate("PaymentSubmit",{title:"Payment Receiver", redirectTo:'PaymentReceiver', type:'PaymentReceiverSelect',list:receiverKeyValue})}
              > Next
              </PaymentButton>
          </Spacer>
          <Spacer size="large">
                 <PaymentButton mode="contained" icon="arrow-left"  onPress={() => navigation.goBack()}>
                     Back
                </PaymentButton>
          </Spacer>
        </PaymentContainer>
        
          
     
        </ScrollView>
    </PaymentBackground>
  );
};
