import React, { useState, useContext, useEffect } from "react";

import { ReceiverInputComponent } from "../../../components/receiver/receiver-input.component";
import { Button,  Text } from "react-native-paper";
import { FlatList } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Summary } from "../../../components/summary/summary.component";
import { LoadingComponent } from "../../../components/loading.component";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputComponent } from "../.././../components/input/text-input.component";
import { SearchMenuComponent } from "../../../components/search/search-menu.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {MaterialIcons as Icon} from "@expo/vector-icons";
import { SectionRow } from "../../../styles/common.style";


export const ReceiverCreateScreen = ({navigation, route}) => {
  const { onReceiverRegister, isLoading, error, activeSender, setActiveSenderInUse,  fetchAccountDetails, accountDetails,} =
  useContext(ReceiversContext);

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [newReceiverData, setNewReceiverData] = useState({});
  const { user } = useContext(AuthenticationContext);
  const [initialValues, setInitialValues] = useState({})
  const [accountNumber, setAccountNumber] = useState("")

  const {sender} = route.params || {};

  

    const senderTitle =user?.userRoleType === "Agent" ?
     `${sender?.senderFname?.toUpperCase()} ${sender?.senderLname?.toUpperCase()}`
     : ""

     const summaryData = {
      "First Name": accountDetails?.receiverFirstName,
      "Last Name": accountDetails?.receiverLastName,
      "Account Number": accountDetails?.accountNumber,
      Bank: accountDetails?.bankName,
      
    };

    const handleSubmitReceiverData = (data) => {
      setNewReceiverData(data);
      setIsSummaryVisible(true);
    };
  
    const handleRegister = () => {
      onReceiverRegister(newReceiverData);
      if(!error){
        navigation.pop(1)  
  };
    };

    const onAccountNumberChange = (accountNumber) => {
      if(accountNumber.length === 10 && route?.params?.bank?.id){
        setAccountNumber(accountNumber)
        setInitialValues({
          ...initialValues,
          accountNumber: accountNumber
        })
        fetchAccountDetails(accountNumber, route?.params?.bank?.id)
        //console.log("accountNumber", accountNumber, route?.params?.bank?.id)
      }
     
    }

    const validationSchema = Yup.object().shape({
      // accountNumber: Yup.integer(10).required('Valid Account is required'),
      // accountName: Yup.string().required('Account Name is required'),
    });

    useEffect(() => {
      if(route?.params?.sender){
        setActiveSenderInUse(route?.params?.sender)
      }
      if((route?.params?.bank)  || (accountNumber && accountDetails)){
        setInitialValues({
          ...initialValues,
          bank: route?.params?.bank,
          name: accountNumber?accountDetails?.receiverName || "" :"",
          fname: accountNumber?accountDetails?.receiverFirstName || "" :"",
          lname: accountNumber?accountDetails?.receiverLastName || "" :"",
          mname: accountNumber?accountDetails?.receiverMiddleName || "" :"",
          senderId: activeSender?.senderId,
        })
      }
    
    }, [route?.params, accountDetails])


     
  return (
    <SafeArea>
       {isSummaryVisible ? (
        <>
          {isLoading && <LoadingComponent />}
          <Summary 
          toggleVisiblity = {() =>setIsSummaryVisible(false)}
            summaryItems={summaryData} 
            submitAction={handleRegister} 
          />
        </>
      ) : (

        <FlatList
        style={{ flex: 1, width: "100%", height: "100%", }}
        ListHeaderComponent={
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitReceiverData}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
           <>

           <SearchMenuComponent
              onSearchClick={() => navigation.navigate("BankList", { navigateTo: 'ReceiverCreate' })}
              searchPlaceholder={values.bank?.name ? values.bank?.name : "Search Banks"}
            />

            <TextInputComponent
              label="Account Number"
              icon="account"
              placeholder="Enter account number"
              onChangeText={onAccountNumberChange}
              onBlur={handleBlur("fname")}
              value={values.accountNumber}
              touched={touched.fname}
              error={errors.fname}
            />
            <Spacer size="large" />
            <TextInputComponent
              label="Account Name"
              icon="account"
              disabled = {true}
              placeholder="Account Name"
              onChange={  handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              touched={touched.fname}
              error={errors.fname}
            />
            <Spacer size="large" />
            {values?.name && (
              <SectionRow>
                <Icon name="verified" size={24} color="green" />
                <Text variant="bodySmall">Verified</Text>
              </SectionRow>
            ) }
            <Button
              mode="contained"
              onPress={handleSubmit}
              // style={styles.button}
            >
              Add
            </Button>
           </>
      )}
      </Formik>
        }
        />
      )}
    </SafeArea>
  );
};












