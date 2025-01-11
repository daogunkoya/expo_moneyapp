import React, { useState, useContext, useEffect } from "react";

import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { ScrollView, View, Platform } from "react-native";
import OptionsMenu from "react-native-option-menu";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { DatePickerComponent } from "../../../components/datetime/date-picker.component";
import { AddressInputComponent } from "../../../components/address/address.component";
import { SenderSummayComponent } from "./sender-summary.component";
import { BioInputComponent } from "../../../components/input/bio.input.component";

import {
  AccountBackground,
  CustomerContainer,
  CustomerButton,
  CustomerInput,
  ErrorContainer,
  Title,
  Item,
  EditButton
} from "./sender-create.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";



export const MemberInputComponent = ({route, navigation, submitSenderData, error, isLoading, showErrorBorder, sender , headerTitle}) => {

  //const { navigation, route } = data;
  const params = route.params ? route.params : {};

  console.log('sender', sender);


  const menuValue = params.menuValue ? params.menuValue : "";
  const type = params.type ? params.type : "";
  const titleValue = type == "customerCreatTitle" ? menuValue : null;


  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);

  const setBioData = (data) => {
    //setBio(data);
  };

  const  onLayout = (event,key) => {
    const layout = event.nativeEvent.layout;
    dataSourceCords[key] = layout.y;
    setDataSourceCords(dataSourceCords);
    
    console.log(dataSourceCords);
    console.log('height:', layout.height);
    console.log('width:', layout.width);
    console.log('x:', layout.x);
    console.log('y:', layout.y);
  }

  const scrollHandler = (key) => {
    console.log('in coord =',dataSourceCords);
   // if (dataSourceCords.length > scrollToIndex) {
      ref.scrollTo({
        x: 0,
       // y: 0,
        y: dataSourceCords[key],
        animated: true,
      });
   
  };

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [address, setAddress] = useState("");
  const [bioBlock, setBioBlock] = useState(true);
  const [contactBlock, setContactBlock] = useState(false);
  const [addressBlock, setAddressBlock] = useState(false);
  const [summaryBlock, setSummaryBlock] = useState(false);
  const [senderData, setSenderData] = useState({});

   //date values

   const [dateOfBirth, setDateOfBirth] = useState("20/05/2021");
   const updateDatePicker = (dateValue) => setDateOfBirth(dateValue);
   
   const errorStyle = (errorField) => showErrorBorder(error, errorField)
   const onAddressUpdate = updateAddress => setFullAddress(updateAddress)

const updateVisibility = (value) => {
    setSummaryBlock(false)
    switch(value){
      case 'bioBlock':
      setBioBlock(true);
      break;

      case 'contactBlock':
      setBioBlock(true);
      break;

      case 'addressBlock':
      setAddressBlock(true);
      break;
    }
}

const setBioDataInput = (data) => {
  
  setSenderData(prevData => ({
    ...prevData,
    ...data
  }));
};

  const submitCustomer = () => {

    const {title,lname,mname,fname} = senderData

    console.log('senderData=', senderData);

    if(addressBlock && bioBlock && contactBlock) setSummaryBlock(true)

    console.log('reference=', ref)
    if(title && fname && lname) {
      setContactBlock(true)
      setScrollToIndex(2)
      scrollHandler(2)
    }
      
    if(title && fname && lname && dateOfBirth && email && mobile ){
      setScrollToIndex(3)
      setAddressBlock(true)
      scrollHandler(3)
    } 

    const sData= {
      title,
      fname,
      lname,
      mname,
      dob: dateOfBirth,
      email,
      mobile,
     // address:`${addressNo} ${address1} ${address2} ${city}  ${country}`,
      address:fullAddress.address,
      postcode:fullAddress.postcode,
      additionalData:fullAddress
    };

    setSenderData(sData);
    //submitSenderData(sData);

    console.log("submitted");
    return;

  };

  useEffect(() => {
    
    //setTitle(titleValue);
    
  }, [titleValue,contactBlock,addressBlock]);

  useEffect(() => {
    if (sender) {
      setAddressBlock(true);
      setContactBlock(true);
      
      setEmail(sender.senderEmail || "");
      setTitle(sender.senderTitle || titleValue);
      setFName(sender.senderFname || "");
      setLName(sender.senderLname || "");
      setMName(sender.senderMname || "");
      setMobile(sender.senderMobile || "");
      setAddress(sender.senderAddress || "");
      setFullAddress(sender.metaData || "");
      
    }
 
  }, [sender, titleValue, contactBlock, addressBlock]);


  return (
    <AccountBackground>
      <ScrollView
        ref={(ref) => {
          setRef(ref);
        }}
        horizontal={false}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        {summaryBlock?
          <SenderSummayComponent updateVisibility={updateVisibility} submitAction={ submitSenderData } senderData = { senderData}/>: null}
       
        
        <View onLayout = {(event)=>onLayout(event,1)}>
        <Title>{headerTitle}</Title>
          {bioBlock?
          <BioInputComponent navigation={navigation} route={route} setBioData={setBioDataInput} sender = {sender}></BioInputComponent>
           
              :null}
            </View>

        
            <View>
              {contactBlock?<CustomerContainer onLayout = {(event)=>onLayout(event,2)}>
               
                
                <DatePickerComponent updateParentDate={updateDatePicker} errorStyle = {errorStyle}/>

                <Spacer size="large">
                  <CustomerInput
                    label="E-mail"
                    value={email}
                    style={showErrorBorder(error, "senderEmail")}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(u) => setEmail(u)}
                  />
                </Spacer>
                <Spacer size="large">
                  <CustomerInput
                    label="Mobile No"
                    style={showErrorBorder(error, "senderMobile")}
                    value={mobile}
                    textContentType="name"
                    autoCapitalize="none"
                    onChangeText={(p) => setMobile(p)}
                  />
                </Spacer>
                <Spacer size="large">
                  <CustomerInput
                    label="Phone No"
                    style={showErrorBorder(error, "senderPhone")}
                    value={mobile}
                    textContentType="name"
                    autoCapitalize="none"
                    onChangeText={(p) => setMobile(p)}
                  />
                </Spacer>
              </CustomerContainer>:null}
            </View>



          <View onLayout = {(event)=>onLayout(event,3)}>
           {addressBlock?<CustomerContainer >
            <AddressInputComponent setUserAddress={ onAddressUpdate}  errorStyle={ errorStyle} fullAddress = {fullAddress} />
                {error && (
                  <ErrorContainer size="large">
                    <Text variant="error">{error.errorMessage}</Text>
                  </ErrorContainer>
                )}
              </CustomerContainer>:null}
            </View>


        <Spacer size="large">
          {!isLoading ? (
            <CustomerButton
              icon="send"
              mode="contained"
              onPress={submitCustomer}
            >
              {sender?"Update":"Register"}
            </CustomerButton>
          ) : (
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          )}
        </Spacer>
        <Spacer size="large">
          <CustomerButton mode="contained" onPress={() => navigation.goBack()}>
            Back
          </CustomerButton>
        </Spacer>
      </ScrollView>
    </AccountBackground>
  );
};








