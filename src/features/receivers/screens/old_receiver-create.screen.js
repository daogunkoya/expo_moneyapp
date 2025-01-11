import React, { useState, useContext , useEffect} from "react";
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



export const ReceiverCreateScreen = ({ navigation , route}) => {


//date picker

  const [date, setDate] = useState(new Date(1598051730000));
  const [dateOfBirth, setDateOfBirth] = useState('20/05/2021');
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




   const {sender,menuValue,type} = route.params; 
  
  
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);



  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [bankId, setBankId] = useState("");
  const [title, setTitle] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [mname, setMName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [transferType, setTransferType] = useState("");
  const [transferTypeKey, setTransferTypeKey] = useState(0);
  const [identityType, setIdentityType] = useState("");
  const [identityTypeId, setIdentityTypeId] = useState("");

  const { banks, isLoading, onReceiverRegister,error, bankList, hasError,showErrorBorder } = useContext(ReceiversContext);
//console.log('active sender', activeSender)
  
  // const submitReceiver = (new_receiver) => {

  //   onReceiverRegister(new_receiver, customer.customerId)

  //   if(!error){
  //     setEmail('')
  //     setTitle('')
  //     setTitle('')
  //     setFName('')
  //     setLName('')
  //     setMName('')
  //     setMobile('')
  //     setDob('')
  //     setPostcode('')
  //     setAddress('')
  //     setTransferType('')
  //     setAccountNo('')
  //     setIdentityType('')
  //     navigation.goBack(null)
  //   }

   
  // };
  
  useEffect(() => {  
    
    const {menuValue,key, type} = route.params; 
    if(type=='receiverCreateTitle') setTitle(menuValue)
    //if(type=='receiverCreateIdentityType') setIdentityType(menuValue)
    if(type=='receiverCreateBank'){
      setBank(menuValue)
      setBankId(key)
    } 
    if(type=='receiverCreateProofId'){
      setIdentityType(menuValue)
      setIdentityTypeId(key)
      
    } 
    if(type=='receiverCreateTransferType') {
      setTransferType(menuValue)
      setTransferTypeKey(key)
    }
    
 }, [route.params]);


 

  return (
    <AccountBackground>
      <ScrollView>
        <AccountCover />
        <Title>New Receiver</Title>
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
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Title", type:'receiverCreateTitle', redirectTo:'ReceiverCreate',list:['Mr', 'Miss', 'Mr']})}
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
             // onPressIn={(p) =>  navigation.navigate("Menu",{title:"TransFer Type",type:'receiverCreateTransferType', redirectTo:'ReceiverCreate',list:['Bank', 'Pick']})}
             onPressIn={(p) =>  navigation.navigate("Menu",{title:"TransFer Type", type:'receiverCreateTransferType', redirectTo:'ReceiverCreate',list:bankList.transferTypeList})}
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
              //onPressIn={(p) =>  navigation.navigate("Menu",{title:"Type of Identity",type:'receiverCreateIdentityType',  redirectTo:'ReceiverCreate',list:['National Identity', 'International Passport', 'Driving License']})}
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Type of Identity", type:'receiverCreateProofId', redirectTo:'ReceiverCreate',list:bankList.proofId})}
            />
             </Spacer>
          <Spacer size="large">
            <ReceiverInput
              label="Bank"
              style={showErrorBorder(error,'bank')}
              value={bank}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => setBank(p)}
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Banks", type:'receiverCreateBank', redirectTo:'ReceiverCreate',list:bankList.bank})}
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
              style={showErrorBorder(error,'receiverFname')}
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
                onPress={() => onReceiverRegister({title,fname,lname,mname, dob:dateOfBirth, email, mobile, address, postcode, accountNo, transferType,transferTypeKey, identityType,bank,bankId,identityTypeId})}
              >
                Register
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
