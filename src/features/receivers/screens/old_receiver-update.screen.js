import React, { useState, useContext, useEffect } from "react";
import { Menu, Divider, Button} from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  AccountBackground,
  AccountCover,
  ReceiverContainer,
  ReceiverButton,
  ReceiverInput,
  ErrorContainer,
  Title,
} from "../components/receiver-create.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ReceiversContext } from "../../../services/receivers/receivers.context";


export const ReceiverUpdateScreen = ({ navigation , route}) => {

  const {sender,receiver} = route.params; 

//date picker

const [date, setDate] = useState(new Date(1598051730000));
const [dateOfBirth, setDateOfBirth] = useState(receiver.receiverDob);
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
  const stringDateOfBirth = currentDate.toLocaleDateString('en-GB')
  setDateOfBirth(stringDateOfBirth )
  setShow(false)

};

const showMode = (currentMode ='date') => {
  setShow(true);
  setMode(currentMode);
};

//date picker ends here








  // const { bankList, hasError } = useContext(ReceiversContext);
   
//console.log(receiver)
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);



  const [email, setEmail] = useState(receiver.receiverEmail);
  const [bankId, setBankId] = useState(receiver.bankId);
  const [bank, setBank] = useState(receiver.bank);
  const [title, setTitle] = useState(receiver.receiverTitle);
  const [fname, setFName] = useState(receiver.receiverFname);
  const [lname, setLName] = useState(receiver.receiverLname);
  const [mname, setMName] = useState(receiver.receiverMname);
  const [mobile, setMobile] = useState(receiver.receiverMobile);
  const [dob, setDob] = useState(receiver.receiverDob);
  const [postcode, setPostcode] = useState(receiver.receiverPostcode);
  const [address, setAddress] = useState(receiver.receiverAddress);
  const [accountNo, setAccountNo] = useState(receiver.accountNumber);
  const [transferType, setTransferType] = useState(receiver.transferType);
  const [transferTypeKey, setTransferTypeKey] = useState(receiver.transferTypeKey);
  const [identityType, setIdentityType] = useState(receiver.identityType);
  const [identityTypeId, setIdentityTypeId] = useState(receiver.identityTypeId);

  const { onReceiverUpdate, isLoading, error , bankList, hasError,showErrorBorder} = useContext(ReceiversContext);

  const updateReceiver = (updatedReceiver) => {
//console.log(updatedReceiver)
    onReceiverUpdate(updatedReceiver, sender.senderId,receiver.receiverId)

    if(!error){
      setEmail('')
      setTitle('')
      setTitle('')
      setFName('')
      setLName('')
      setMName('')
      setMobile('')
      setDob('')
      setPostcode('')
      setAddress('')
      setTransferType('')
      setAccountNo('')
      setIdentityType('')
      navigation.goBack(null)
    }

   
  };
  
  useEffect(() => {  
    const {sender,menuValue,key,type} = route.params; 
    if(type=='receiverUpdateTitle') setTitle(menuValue)
   // if(type=='receiverUpdateIdentityType') setIdentityType(menuValue)
    //if(type=='receiverUpdateBank') setBank(menuValue)
    if(type=='receiverUpdateBank'){
      setBank(menuValue)
      setBankId(key)
    } 
    if(type=='receiverUpdateProofId'){
      setIdentityType(menuValue)
      setIdentityTypeId(key)
    } 
    if(type=='receiverUpdateTransferType'){
      setTransferType(menuValue)
      setTransferTypeKey(key)
    } 
 }, [route.params]);
  return (
    <AccountBackground>
      <ScrollView>
        <AccountCover />
        <Title>Update Receiver</Title>
        <ReceiverContainer>
          <ReceiverInput
            label="E-mail"
            style={showErrorBorder(error,'receiverEmail')}
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
        

          <Spacer size="large">
            <ReceiverInput
              label="Title"
              style={showErrorBorder(error,'receiverTitle')}
              value={title}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setTitle(p)}
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Title", type:'receiverUpdateTitle', redirectTo:'ReceiverUpdate',list:['Mr', 'Miss', 'Mr']})}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="First name"
              style={showErrorBorder(error,'receiverFname')}
              value={fname}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setFName(p)}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Middle name"
              value={mname}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setMName(p)}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Last name"
              style={showErrorBorder(error,'receiverLname')}
              value={lname}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setLName(p)}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Date of Birth"
              style={showErrorBorder(error,'receiverDob')}
              value = {dateOfBirth}
              onPressIn={ ()=>showMode('date')}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setDob(p)}
            />
          </Spacer>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
      )}
          <Spacer size="large">
            <ReceiverInput
              label="Mobile No"
              style={showErrorBorder(error,'receiverMobile')}
              value={mobile}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setMobile(p)}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Transfer Type"
              style={showErrorBorder(error,'transferType')}
              value={transferType}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setTransferType(p)}
              // onPressIn={(p) =>  navigation.navigate("Menu",{title:"TransFer Type",type:'receiverUpdateTransferType', redirectTo:'ReceiverUpdate',list:['Bank', 'Pick Up']})}
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"TransFer Type", type:'receiverUpdateTransferType', redirectTo:'ReceiverUpdate',list:bankList.transferTypeList})}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Identity Type"
              style={showErrorBorder(error,'identityType')}
              value={identityType}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setIdentityType(p)}
              // onPressIn={(p) =>  navigation.navigate("Menu",{title:"Type of Identity",type:'receiverUpdateIdentityType',  redirectTo:'ReceiverUpdate',list:['National Identity', 'International Passport', 'Driving License']})}
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Proof of ID", type:'receiverUpdateProofId', redirectTo:'ReceiverUpdate',list:bankList.proofId})}
            />
             </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Bank"
              style={showErrorBorder(error,'Bank')}
              value={bank}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setBank(p)}
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Banks", type:'receiverUpdateBank', redirectTo:'ReceiverUpdate',list:bankList.bank})}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Account Number"
              style={showErrorBorder(error,'accountNumber')}
              value={accountNo}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setAccountNo(p)}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Post Code"
              value={postcode}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setPostcode(p)}
            />
          </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Address"
              value={address}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setAddress(p)}
            />
          </Spacer>
          {error && (
            <ErrorContainer size="large">
              <Text variant="error">{error.errorMessage}</Text>
            </ErrorContainer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <ReceiverButton
                icon="email"
                mode="contained"
                onPress={() => onReceiverUpdate({title,fname,lname,mname, dob:dateOfBirth, email, mobile, address, postcode, accountNo, transferType, identityType, transferTypeKey ,identityTypeId,bank,bankId}, sender,receiver.receiverId)}
              >
                Update
              </ReceiverButton>
            ) : (
              <ActivityIndicator animating={true} color={MD2Colors.red800} />
            )}
          </Spacer>
        </ReceiverContainer>
        <Spacer size="large">
          <ReceiverButton mode="contained" onPress={() => navigation.goBack()}>
            Back
          </ReceiverButton>
        </Spacer>
        </ScrollView>
    </AccountBackground>
  );
};
