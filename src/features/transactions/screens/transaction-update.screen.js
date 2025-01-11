import React, { useState, useContext, useEffect } from "react";
import { Menu, Divider, Button} from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
import { ScrollView } from "react-native";
import { TransactionInfoCard } from "../components/transaction-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ErrorMessageComponent } from "../../../components/utility/error.component";


import {
  AccountBackground,
  AccountCover,
  TransactionContainer,
  TransactionButton,
  TransactionInput,
  ErrorContainer,
  Title,
  Section
} from "../components/transaction-create.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import { TransactionsContext } from "../../../services/transactions/transactions.context";


export const TransactionUpdateScreen = ({ navigation , route}) => {

  const { transaction } = route.params;
  
//console.log(transaction)

const {
  receiverBank = '',
  receiverBankId = '',
  receiverIdentity = '',
  receiverIdentityId = '',
  receiverAccountNo = '',
  receiverTransferType = '',
  receiverTransferTypeKey = '',
  receiverName = '',
  receiverPhone = '',
  createdAt = '',
  transactionId = "",
} = transaction;



  const [rBank, setRBank] = useState(receiverBank);
  const [rBankId, setRBankId] = useState(receiverBankId);
  const [rIdentity, setRIdentity] = useState(receiverIdentity);
  const [rIdentityId, setRIdentityId] = useState(receiverIdentityId);
  const [rAccountNo, setRAccountNo] = useState(receiverAccountNo);
  const [rTransferType, setRTransferType] = useState(receiverTransferType);
  const [rTransferTypeKey, setRTransferTypeKey] = useState(receiverTransferTypeKey);
  const [rName, setRName] = useState(receiverName);
  const [rPhone, setRPhone] = useState(receiverPhone);
  

  //context models
  const { retrieveBanks ,isLoading , bankList, hasError} = useContext(ReceiversContext);
  const { onTransactionUpdate,  retrieveTransactions, error, showErrorBorder} = useContext(TransactionsContext);
  
  //update transaction function
  const submitTransactionUpdate = () => {
   
    onTransactionUpdate(transactionId, { rBank,rBankId, rIdentity, rIdentityId, rAccountNo,rTransferType ,rTransferTypeKey, rName, rPhone } )
   // retrieveTransactions();   //update senders list
    
   //if(!error) navigation.navigate("TransactionList")
  };
  



  useEffect(() => {  
    retrieveBanks();
    const {sender,menuValue,key,type} = route.params; 
   
   
    if(type=='transactionUpdateBank'){
      setRBank(menuValue)
      setRBankId(key)
    } 
    if(type=='transactionUpdateProofId'){
      setRIdentity(menuValue)
      setRIdentityId(key)
    } 
    if(type=='transactionUpdateTransferType'){
      setRTransferType(menuValue)
      setRTransferTypeKey(key)
    } 
 }, [route.params]);




  return (
    <SafeArea>
        <AccountBackground>
          <ScrollView>
            <AccountCover />
            <TransactionContainer>
            <Title>Update Transaction</Title>

                <ErrorMessageComponent error={error}/>
              
              <TransactionInput
                label="Receiver Name"
                style={showErrorBorder(error,'receiverName')}
                value={rName}
                textContentType="name"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(u) => setRName(u)}
              />
            

              <Spacer size="large">
                <TransactionInput
                  label="Receiver Phone"
                 style={showErrorBorder(error,'receiverPhone')}
                  value={rPhone}
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={(p) => setRPhone(p)}
                  
                />
              </Spacer>

              <Spacer size="large">
                <TransactionInput
                  label="Transfer Type"
                  style={showErrorBorder(error,'receiverTransferType')}
                  value={rTransferType}
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={(p) => setRTransferType(p)}
                  onPressIn={(p) =>  navigation.navigate("Menu",{title:"TransFer Type", type:'transactionUpdateTransferType', redirectTo:'TransactionUpdate',list:bankList.transferTypeList})}
                />
                 </Spacer>

              <Spacer size="large">
                <TransactionInput
                  label="Receiver Bank"
                  style={showErrorBorder(error,'receiverBank')}
                  value={rBank}
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={(p) => setRBank(p)}
                  onPressIn={(p) =>  navigation.navigate("Menu",{title:"Banks", type:'transactionUpdateBank', redirectTo:'TransactionUpdate',list:bankList.bank})}
                />
              </Spacer>

              
              {rTransferTypeKey==1? <Spacer size="large">
                <TransactionInput
                  label="Receiver Account Number"
                  value={rAccountNo}
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={(p) => setRAccountNo(p)}
                />
              </Spacer>:null}
            

              {rTransferTypeKey==2? <Spacer size="large">
                <TransactionInput
                  label="Receiver Identity"
                  style={showErrorBorder(error,'receiverIdentity')}
                  value={rIdentity}
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={(p) => setRIdentity(p)}
                  onPressIn={(p) =>  navigation.navigate("Menu",{title:"Proof of ID", type:'transactionUpdateProofId', redirectTo:'TransactionUpdate',list:bankList.proofId})}
                />
              </Spacer>:null}
              
             
              <Spacer size="large">
                          <Section>
                  
                    
              <TransactionButton
              icon="arrow-left"
              mode="contained"
              onPress={() => {
              
                navigation.goBack('TransactionUpdate',{});
              }}>
              back  </TransactionButton>

              <TransactionButton
              icon="pen"
              mode="contained"
              onPress={submitTransactionUpdate }>
              Update  </TransactionButton>
              
              </Section>
              </Spacer>
            </TransactionContainer>
            </ScrollView>
            </AccountBackground>
        </SafeArea>
  );
};
