import React, { useState, useContext , useEffect} from "react";
import { Menu, Divider, Button} from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
import { ScrollView } from "react-native";
import { UtilitiesContext } from "../../../services/utilities/utilities.context";
import { CustomersContext } from "../../../services/senders/senders.context";
// import { ReceiversContext } from "../../../services/receivers/receivers.context";


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



export const PaymentSenderScreen = ({ navigation , route}) => {

  const {    selectedPaymentSender, updateMenu } = useContext(UtilitiesContext);
  const {     senderKeyValue } = useContext(CustomersContext);
  const {key:selectedSenderKey, value:selectedSenderValue} = selectedPaymentSender
 
  //const {  retrieveReceivers, receiversWithKeyValue } = useContext(ReceiversContext);
  // if(selectedSenderKey){
  //      console.log('senderKey = ', selectedSenderKey) 
         

  // useEffect(() => { 
  //   console.log('senderKey = ', selectedSenderKey) 
  //         if(selectedSenderKey){
  //           retrieveReceivers(selectedSenderKey, null);
  //          updateMenu('PaymentReceiverSelect', {key:null, value:null}); 
  //         }
  // }, [selectedSenderKey]);



   //const {customer,menuValue,type} = route.params; 
  
  

  
//console.log('senders=',senderKeyValue)
//console.log('customers=', senderKeyValue)
  return (
    <PaymentBackground>
      <ScrollView>
        <AccountCover />
      
        <PaymentContainer>
        <Title>Send Money</Title>
          <Spacer size="large">
            <PaymentInput
              label="Select a Sender"
              //style={showErrorBorder(error,'PaymentTitle')}
              value={selectedSenderValue}
              textContentType="name"
              autoCapitalize="none"
             // onChangeText={(p) => setTitle(p)}
              //onPressIn={(p) =>  navigation.navigate("Menu",{title:"Title", type:'PaymentCreateTitle', redirectTo:'PaymentCreate',list:['Mr', 'Miss', 'Mr']})}
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Payment Sender", redirectTo:'PaymentSender', type:'PaymentSenderSelect',list:senderKeyValue})}
           />
          </Spacer>
         
          <Spacer size="large">
              <PaymentButton
                icon="arrow-right"
                disabled={!selectedSenderValue?true:false}
                mode="contained"
                onPress= {(p) => navigation.navigate("PaymentReceiver",{title:"Payment Sender", redirectTo:'PaymentSender', type:'PaymentSenderSelect',list:senderKeyValue})}
              > Next Receivers
              </PaymentButton>
          </Spacer>
          <Spacer size="large">
                 <PaymentButton mode="contained"  icon="arrow-left"  onPress={() => navigation.goBack()}>
                     Back
                </PaymentButton>
          </Spacer>
        </PaymentContainer>
        
          
     
        </ScrollView>
    </PaymentBackground>
  );
};
