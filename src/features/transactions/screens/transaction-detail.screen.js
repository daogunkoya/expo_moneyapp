import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { List, Divider, Button } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { TransactionInfoCard } from "../components/transaction-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import {Section, SectionColumn, TransactionButton, TransactionItemWrapper, TransactionItemLabel, TransactionItemValue,TouchableReceipt } from "../components/transaction-list.styles";
import { TransactionsContext } from "../../../services/transactions/transactions.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {AntDesign} from "@expo/vector-icons";
import { SendMoneyContext } from "../../../services/sendmoney.context";






export const TransactionDetailScreen = ({ navigation, route }) => {
  
  const { isAdmin, isCustomer } = useContext(AuthenticationContext);
  const { clearError, handleDownloadAndShare} = useContext(TransactionsContext);
  const { fetchTransferBreakdown , resetTransferBreakdown, transferBreakdown} = useContext(SendMoneyContext)

  const { transaction } = route.params;
  
//console.log(customer)

const {
  createdAt = '',
  transactionId = "",
  transactionCode = "",
  agentCommission = "Some Restaurant",
  receiverBank = "",
  amountSent = "Some Restaurant",
  bouRate = "22 nw road",
  currencyId = "0876567878",
  currencyIncome= "0876567878",
  exchangeRate= "noemail@er.com",
  "receiverAccountNo": receiverAccountNo = "",
  localAmount = "",
  totalCommission = "",
  totalAmount = "",
  note = "",
  receiverName = "",
  receiverLname = "",
  receiverFname = "",
  senderName = "",
  soldRate = 0,
  userId = "",
  senderId = "",
  transactionStatus = 1,
} = transaction;


  return (
    <SafeArea>
      <TransactionInfoCard transaction={transaction} />
      <TouchableReceipt onPress={() => handleDownloadAndShare(transactionId)}>
      <TransactionItemLabel>
              Receipt
            </TransactionItemLabel>
            <AntDesign name="download" size={24} color="black" />
      </TouchableReceipt>
      <ScrollView>
        <Section>
          <TransactionItemWrapper>
            <TransactionItemLabel>
              Receiver Name 
            </TransactionItemLabel>
            <TransactionItemValue>
              {receiverFname} {receiverLname}
            </TransactionItemValue>
          </TransactionItemWrapper>
     </Section>
     <Divider />  
     <Section>
          <TransactionItemWrapper>
            <TransactionItemLabel>
             Account number
            </TransactionItemLabel>
            <TransactionItemValue>
              {receiverAccountNo} 
            </TransactionItemValue>
          </TransactionItemWrapper>
     </Section>
     <Divider />   
     <Section>
          <TransactionItemWrapper>
            <TransactionItemLabel>
             Receiver Bank
            </TransactionItemLabel>
            <TransactionItemValue>
              {receiverBank?.name.toUpperCase()} 
            </TransactionItemValue>
          </TransactionItemWrapper>
     </Section>
     <Divider />
     <Section>
          <TransactionItemWrapper>
            <TransactionItemLabel>
              Exchange Rate
            </TransactionItemLabel>
            <TransactionItemValue>
              {exchangeRate} 
            </TransactionItemValue>
          </TransactionItemWrapper>
     </Section>
     <Divider />
     <Section>
          <TransactionItemWrapper>
            <TransactionItemLabel>
            Reference
            </TransactionItemLabel>
            <TransactionItemValue>
              {transactionCode}
            </TransactionItemValue>
          </TransactionItemWrapper>
     </Section>
     <Divider />
       
      </ScrollView>

      <SectionColumn>
      
        
          <TransactionButton
          icon="bank"
          mode="contained"
          onPress={() => {
            resetTransferBreakdown()
            fetchTransferBreakdown(parseFloat(localAmount.replace(/,/g, '')), 2)
            navigation.reset({
              index: 0,
              routes: [{ name: 'Send', params: { screen: 'SendMoneyAmountCalculator' } }],
            });
          }}>
          Send Again  </TransactionButton>

         {isAdmin && 
            <Button
              icon="tools"
              muted = {true}
              colorInUse = {"secondary"}
              mode="outlined"
              onPress={() => {
                clearError()
                navigation.navigate("TransactionUpdateStatus",{ transaction});
              }}>
                Update Status  </Button>}


          <TransactionButton
          icon="email"
          muted = {true}
          colorInUse = {"muted"}
          mode="contained"
          onPress={() => {
            clearError()
            navigation.navigate("TransactionReport",{ transaction});
          }}>
          Report Transaction  </TransactionButton>
      
      </SectionColumn>
    </SafeArea>
  );
};
