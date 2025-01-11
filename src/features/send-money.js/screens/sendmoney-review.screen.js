import react, { useContext, useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Button, Alert } from "react-native";
import styled from "styled-components/native";
import { Card, Text } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CountryIcon } from "../components/send-money.styles";
import { AntDesign } from '@expo/vector-icons';
import { ContinueButton } from "../components/send-money.styles";
import { SendMoneyContext } from "../../../services/sendmoney.context";
import { LoadingComponent } from "../../../components/loading.component";
import {Section, SectionBegin, SectionEnd, SectionCenter, HorizontallMaginSection,CardWrapper, SubmitButton} from '../../../styles/common.style';
import { PaymentTypeComponent } from "../components/payment-type.component";
import {CardPaymentComponent} from '../../../components/payment/CardPaymentComponent'
import { PaymentsContext } from "../../../services/payments/payments.context";




 const ReviewCard = styled(Card)`
margin-top: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;

 const ItemText = styled.Text`
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;




export const SendMoneyReviewScreen = ({ navigation, route }) => {

  const { transferBreakdown, sendMoney, isLoading, currencyOrigin, currencyDestination } = useContext(SendMoneyContext);
  const {   createPaymentIntent, handlePayment, clientSecret, paymentSuccessful } = useContext(PaymentsContext);
  const { amount, receiver, sender } = route.params;

  const processUserOption = (value)=>{
    console.log('option clicked', value)
    console.log('client--secret', clientSecret)
        if(value === 'Card'){
          createPaymentIntent(transferBreakdown.amountSent)
         
        }
  }
  console.log('receiver=', receiver)


  return (
    <SafeArea>
      <ReviewCard elevation={2}>
      <HorizontallMaginSection style={{justifyContent:'center',alignItems:'center',margin:10}}>
            <CountryIcon isoCode={currencyOrigin?.currencySymbol} size={80} />
            <AntDesign name="arrowright" size={24} color="black" style={{margin:10}} />
            <CountryIcon isoCode={currencyDestination?.currencySymbol} size={80} />
     
        </HorizontallMaginSection>
        <HorizontallMaginSection>
          <SectionBegin>
            <ItemText>You are sending</ItemText>
          </SectionBegin>
          <SectionEnd>
            <ItemText>{transferBreakdown.amountSent} {currencyOrigin?.currencyTitle}</ItemText>
          </SectionEnd>
        </HorizontallMaginSection>
        <HorizontallMaginSection>
          <SectionBegin>
            <ItemText>They will receive</ItemText>
          </SectionBegin>
          <SectionEnd>
            <ItemText>{transferBreakdown.localAmount} {currencyDestination?.currencyTitle}</ItemText>
          </SectionEnd>
        </HorizontallMaginSection>
      </ReviewCard>

      <ReviewCard elevation={2}>
      <Section> 
        </Section>
        <HorizontallMaginSection>
          <SectionBegin>
            <ItemText>To</ItemText>
          </SectionBegin>
          <SectionEnd>
            <ItemText>{receiver.receiverName}</ItemText>
          </SectionEnd>
        </HorizontallMaginSection>
        <HorizontallMaginSection>
          <SectionBegin>
            <ItemText>Account Number</ItemText>
          </SectionBegin>
          <SectionEnd>
            <ItemText>{receiver.accountNumber}</ItemText>
          </SectionEnd>
        </HorizontallMaginSection>
      </ReviewCard>


      <ReviewCard elevation={2}>
        <HorizontallMaginSection>
          <SectionBegin>
            <ItemText>Exchange Rate</ItemText>
          </SectionBegin>
          <SectionEnd>
            <ItemText>1.00 = {transferBreakdown.exchangeRate} NGN</ItemText>
          </SectionEnd>
        </HorizontallMaginSection>
      </ReviewCard>

      <ReviewCard elevation={2}>
       
       

        <PaymentTypeComponent
         handleOption = {processUserOption }
         createPaymentIntent = {createPaymentIntent}
          />
           <CardPaymentComponent   clientSecret = {clientSecret}  handlePayment = {handlePayment}  />
        </ReviewCard>
     
    {
      isLoading ? <LoadingComponent /> : 
    <SectionCenter>
      <SubmitButton mode="contained"
       onPress={() => {
        handlePayment()
        if(paymentSuccessful) Alert.alert('Success', "Payment Successful")
        sendMoney(receiver.receiverId)
       }}>
        Continue</SubmitButton>
       </SectionCenter> 
        }

    </SafeArea>
  );
};
