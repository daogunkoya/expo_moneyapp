import React, { useState, useContext, useMemo } from "react";
import { MemberInputComponent } from "../members/member-input.component";
import { SafeArea } from "..//utility/safe-area.component";
import { Summary } from "../summary/summary.component";
import { LoadingComponent } from "../loading.component";
import { useNavigation } from "@react-navigation/native";

export const SenderUpdateComponent = ({ sender, onCustomerUpdate, isLoading, error, showErrorBorder , memberValue}) => {
  
const navigation = useNavigation();

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [updatedSenderData, setUpdatedSenderData] = useState({});


  const summaryData = useMemo(() => ({
    "First Name": updatedSenderData?.fname,
    "Last Name": updatedSenderData?.lname,
    "Email": updatedSenderData?.email,
    "Date Of Birth": updatedSenderData?.dateOfBirth,
    "Phone": updatedSenderData?.phone,
    "Address": updatedSenderData?.address,
    "Postcode": updatedSenderData?.postcode,
  }), [updatedSenderData]);

  // Memoize the updated sender data to avoid unnecessary recalculations
  const updatedSender = useMemo(() => ({
    title: updatedSenderData.title || sender.senderTitle,
    fname: updatedSenderData.fname || sender.senderFname,
    lname: updatedSenderData.lname || sender.senderLname,
    mname: updatedSenderData.mname || sender.senderMname,
    dateOfBirth: updatedSenderData.dateOfBirth || sender.senderDob,
    email: updatedSenderData.email || sender.senderEmail,
    phone: updatedSenderData.phone || sender.senderPhone,
    address: updatedSenderData.address || sender.senderAddress,
    postcode: updatedSenderData.postcode || sender.senderPostcode,
    metaData: updatedSenderData.metaData,
  }), [updatedSenderData, sender]);

  const handleSubmitSenderData = (data) => {
    setUpdatedSenderData(data);
    setIsSummaryVisible(true);
  };

  const handleUpdate = () => {
    onCustomerUpdate(updatedSender, sender.senderId);
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
        <MemberInputComponent 
          headerTitle="Update Customer"
          error={error}
          isLoading={isLoading}
          showErrorBorder={showErrorBorder}
          sender={sender}
          actionType="update"
          submitSenderData={handleSubmitSenderData}
          showSummaryPage={() => setIsSummaryVisible(true)}
        />
      )}
    </SafeArea>
  );
};
