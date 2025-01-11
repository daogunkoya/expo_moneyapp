import React, { useState,useEffect,  useContext} from "react";
import { Menu, Divider, Button} from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { ScrollView } from "react-native";
import { UtilitiesContext } from "../../../services/utilities/utilities.context";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";


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
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;


const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const PaymentReceiverScreen = ({ navigation , route}) => {
  const { isLoading, retrieveReceivers, receiversWithKeyValue, clearReceivers } = useContext(ReceiversContext);

  const {    selectedPaymentReceiver, updateMenu } = useContext(UtilitiesContext);
  
  const { params = ""}  = route
  console.log('senderId=', params.senderId)

useEffect(()=>{
    // clearReceivers();
    // updateMenu('PaymentReceiverSelect', {key:null, value:null});
  if(params.senderId){
    retrieveReceivers(params.senderId, null);
  }

},[]);

   //const {customer,menuValue,type} = route.params; 

   
  
  
  
const {key:selectedReceiverKey, value:selectedReceiverValue, accountNumber:accountNumber, bank:bank} = selectedPaymentReceiver

const [rBank,setRbank] = useState(bank)
   const [rAcctNo,setAcctNo] = useState(accountNumber)
 // console.log('actno=', rAcctNo,rBank)
//console.log('selected receivers=',selectedPaymentReceiver)
//console.log('semders=', receivers)
  return (
    <SafeArea>
        <PaymentBackground>
          {isLoading && (
            <LoadingContainer>
              <Loading size={50} animating={true} color={MD2Colors.red800} />
            </LoadingContainer>
          )}
          <ScrollView>
            <AccountCover />
          
            <PaymentContainer>
            <Title>Select Receiver </Title>
              <Spacer size="large">
                <PaymentInput
                  label="Select a Receiver"
                  //style={showErrorBorder(error,'PaymentTitle')}
                  value={selectedReceiverValue}
                  textContentType="name"
                  autoCapitalize="none"
                // onChangeText={(p) => setTitle(p)}
                  //onPressIn={(p) =>  navigation.navigate("Menu",{title:"Title", type:'PaymentCreateTitle', redirectTo:'PaymentCreate',list:['Mr', 'Miss', 'Mr']})}
                  onPressIn={(p) =>  navigation.navigate("Menu",{title:"Payment Receiver", redirectTo:'PaymentReceiver', type:'PaymentReceiverSelect',list:""})}
              />
              </Spacer>

            {bank?
              <Spacer size="large">
                  <Text>Bank</Text>
                  <Text variant="label">{bank}</Text>
                </Spacer>: null}
            {accountNumber?
              <Spacer size="large">
                  <Text>Account Number</Text>
                  <Text variant="label">{accountNumber}</Text>
                </Spacer>:null}
            
              <Spacer size="large">
                  <PaymentButton
                    icon="arrow-right"
                    disabled={!selectedReceiverValue?true:false}
                    mode="contained"
                    onPress={(p) =>  navigation.navigate("PaymentAmount",{title:"Payment Receiver", redirectTo:'PaymentReceiver', type:'PaymentReceiverSelect',list:""})}
                  > Next Amount To Send
                  </PaymentButton>
              </Spacer>
              <Spacer size="large">
                    <PaymentButton mode="contained" icon="arrow-right"  onPress={() => navigation.goBack()}>
                        Back
                    </PaymentButton>
              </Spacer>
            </PaymentContainer>
            
              
        
            </ScrollView>
        </PaymentBackground>
       </SafeArea>
  );
};
