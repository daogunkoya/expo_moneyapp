import React, { useState, useContext, useEffect } from "react";

import { ReceiverInputComponent } from "../../../components/receiver/receiver-input.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Summary } from "../../../components/summary/summary.component";
import { LoadingComponent } from "../../../components/loading.component";

export const ReceiverCreateScreen = ({navigation, route}) => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [newReceiverData, setNewReceiverData] = useState({});

  const { user } = useContext(AuthenticationContext);

  const {sender} = route.params || {};
  
  const { onReceiverRegister, isLoading, error, showErrorBorder , bankList, retrieveBankList} =
    useContext(ReceiversContext);

    const senderTitle =user?.userRoleType === "Agent" ?
     `${sender?.senderFname?.toUpperCase()} ${sender?.senderLname?.toUpperCase()}`
     : ""

     const summaryData = {
      "First Name": newReceiverData?.fname,
      "Last Name": newReceiverData?.lname,
      Account: newReceiverData?.accountNumber,
      Bank: newReceiverData?.bank?.name,
      Phone: newReceiverData?.phone,
      Address: newReceiverData?.address,
      // "Postcode":newReceiverData?.postcode
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

     
  return (
    <SafeArea>
       {isSummaryVisible ? (
        <>
          {isLoading && <LoadingComponent />}
          <Summary 
            summaryItems={summaryData} 
            submitAction={handleRegister} 
          />
        </>
      ) : (
      <ReceiverInputComponent 
      // data = {props}
      headerTitle = {`${senderTitle} New Receiver`}
      route = {route}
      navigation = {navigation}
      error = {error} 
      isLoading = {isLoading}
      showErrorBorder = {showErrorBorder} 
      receiver = { null }
      bankList = {bankList}
      retrieveBankList = {retrieveBankList}
      senderId = {route.params?.sender?.senderId}
      actionType={"create"}
      submitReceiverData={handleSubmitReceiverData}
      showSummaryPage={() => setIsSummaryVisible(true)}
       />
      )}
    </SafeArea>
  );
};












