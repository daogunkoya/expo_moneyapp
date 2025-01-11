import React, { useState, useContext , useEffect} from "react";
import { Menu, Divider, Button} from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
import { ScrollView } from "react-native";
import { UtilitiesContext } from "../../../services/utilities/utilities.context";
import { PaymentsContext } from "../../../services/payments/payments.context";
import { TransactionsContext } from "../../../services/transactions/transactions.context";


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



export const PaymentSubmitScreen = ({ navigation , route}) => {

  const {onTransactionRegister} = useContext(TransactionsContext);
  
  const {   receiverKeyValue, selectedPaymentReceiver, selectedPaymentSender } = useContext(UtilitiesContext);
  const {key:selectedReceiverKey, value:selectedReceiverValue, accountNumber:accountNumber, bank:bank} = selectedPaymentReceiver
  const {key:selectedSenderKey, value:selectedSenderValue} = selectedPaymentSender

  const {   calculateTransaction, transactionCalulateResult, convertType } = useContext(PaymentsContext);
  const {commission:resCommission, rate:resExchangeRate, local:resLocal, total:resTotal, sendAmount:resAmount} = transactionCalulateResult
  //console.log("submiting ---", selectedReceiverKey,convertType, resAmount)



  const submit = ()=>{
    //console.log("submiting ---", selectedReceiverKey,convertType, resAmount)

    onTransactionRegister(selectedReceiverKey, convertType,  resAmount)
    navigation.navigate("TransactionList");
    return;
  }


const [commission,setCommission] = useState(resCommission)
const [total,setTotal] = useState(resTotal)
const [amountToSend,setAmountToSend] = useState(resAmount)
const [amountToCollect,setAmountToCollect] = useState(resLocal)
const [exchangeRate,setExchangeRate] = useState(resExchangeRate)



 



  return (
    <PaymentBackground>
      <ScrollView>
        <AccountCover />
      
        <PaymentContainer>
        <Title>Transfer Confirmation </Title>
         

        {selectedSenderValue?
          <Spacer size="large">
              <Text>Sender </Text>
              <Text variant="label"> {selectedSenderValue}</Text>
            </Spacer>: null}
        {selectedReceiverValue?
          <Spacer size="large">
              <Text>Beneficiary </Text>
              <Text variant="label"> {selectedReceiverValue}</Text>
            </Spacer>: null}
        {amountToSend?
          <Spacer size="large">
              <Text>Amount You Sending </Text>
              <Text variant="label"> {amountToSend}</Text>
            </Spacer>: null}
        {amountToCollect?
          <Spacer size="large">
              <Text>Amount To Collect </Text>
              <Text variant="label"> {amountToCollect}</Text>
            </Spacer>: null}
       
        {total?
          <Spacer size="large">
              <Text>Total Amount</Text>
              <Text variant="label">{total}</Text>
            </Spacer>:null}
        
        {exchangeRate?
          <Spacer size="large">
              <Text>Exchange Rate</Text>
              <Text variant="label">{exchangeRate}</Text>
            </Spacer>:null}
         
          <Spacer size="large">
              <PaymentButton
                icon="arrow-right"
                mode="contained"
                onPress={submit}
              > Confirm Transfer
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
