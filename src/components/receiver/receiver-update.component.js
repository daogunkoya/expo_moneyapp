import React, { useState, useContext, useEffect } from "react";
import { ReceiverInputComponent } from "../receiver/receiver-input.component";
import { SafeArea } from "../../components/utility/safe-area.component";
import { ReceiversContext } from "../../services/receivers/receivers.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Summary } from "../summary/summary.component";
import { LoadingComponent } from "../loading.component";
import { useNavigation } from "@react-navigation/native";


export const ReceiverUpdateComponent = ({  receiver, senderTitle }) => {
    const { user } = useContext(AuthenticationContext);

    const navigation = useNavigation();

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [updatedReceiverData, setUpdatedReceiverData] = useState({});
  
  
  const { onReceiverUpdate, isLoading, error, showErrorBorder , bankList, retrieveBankList} =
    useContext(ReceiversContext);
    // const { sender = user, receiver} = route.params || {};

    // const senderTitle = user?.userRoleType === "Agent" ?
    // `${sender?.senderFname?.toUpperCase()} ${sender?.senderLname?.toUpperCase()}`
    // : ""


    const summaryData = {
      "First Name": updatedReceiverData?.fname,
      "Last Name": updatedReceiverData?.lname,
      Account: updatedReceiverData?.accountNumber,
      Bank: updatedReceiverData?.bank?.name,
      Phone: updatedReceiverData?.phone,
      Address: updatedReceiverData?.address,
    };

    const handleSubmitReceiverData = (data) => {
      setUpdatedReceiverData({
                ...data,
                receiverId: receiver?.receiverId,
                senderId: receiver?.senderId
              });
      setIsSummaryVisible(true);
    };
  
    const handleUpdate= () => {
      onReceiverUpdate(updatedReceiverData, receiver.senderId);
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
            submitAction={handleUpdate} 
          />
        </>
      ) : (
      <ReceiverInputComponent 
      headerTitle = {`${senderTitle} Update Receiver`}
      error = {error} 
      isLoading = {isLoading}
      showErrorBorder = {showErrorBorder} 
      bankList = {bankList}
      retrieveBankList = {retrieveBankList}
      senderId = {receiver?.senderId}
      receiver = {receiver}
      actionType={"update"}
      submitReceiverData={handleSubmitReceiverData}
      showSummaryPage={() => setIsSummaryVisible(true)}
       />
      )}
    </SafeArea>
  );
};












