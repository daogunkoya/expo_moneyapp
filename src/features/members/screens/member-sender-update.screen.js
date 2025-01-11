import React, { useState, useContext, useMemo } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CustomersContext } from "../../../services/senders/senders.context";
import { Summary } from "../../../components/summary/summary.component";
import { LoadingComponent } from "../../../components/loading.component";
import { MemberInputComponent } from "../../../components/members/member-input.component";


export const MemberSenderUpdateScreen = ({ route, navigation }) => {

  const { onCustomerUpdate, isLoading, error, showErrorBorder } = useContext(CustomersContext);

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [updatedSenderData, setUpdatedSenderData] = useState({});

  const { sender } = route.params;



  const memberValue = {
    title: sender?.senderTitle || "",
    fname: sender?.senderFname || "",
    lname: sender?.senderLname || "",
    email: sender?.senderEmail || "",
    phone: sender?.senderPhone || "",
    dateOfBirth: sender?.senderDob || "",

    addressNo: sender?.metaData?.addressNo || "",
    address1: sender?.metaData?.address1 || "",
    address2: sender?.metaData?.address2 || "",
    city: sender?.metaData?.city || "",
    country: sender?.metaData?.country || "",
    postcode:sender?.senderPostcode || "",
    metaData: {
      addressNo: sender?.metaData?.addressNo || "",
      address1: sender?.metaData?.address1 || "",
      address2: sender?.metaData?.address2 || "",
      city: sender?.metaData?.city || "",
      postcode: sender?.metaData?.postcode || "",
      country: sender?.metaData?.country || "",
    }
  };

  const summaryData = useMemo(() => ({
    "First Name": updatedSenderData?.fname,
    "Last Name": updatedSenderData?.lname,
    "Email": updatedSenderData?.email,
    "Date Of Birth": updatedSenderData?.dateOfBirth,
    "Phone": updatedSenderData?.phone,
    "Address": updatedSenderData?.address,
    "Postcode": updatedSenderData?.postcode,
  }), [updatedSenderData]);


  

const handleSubmitSenderData = (data) => {
  setUpdatedSenderData(data);
  setIsSummaryVisible(true);
};

const handleUpdate = () => {
  onCustomerUpdate(updatedSenderData, sender.senderId);
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
        member={sender}
        memberValue={memberValue}
        actionType="update"
        onSubmitData={handleSubmitSenderData}
        showSummaryPage={() => setIsSummaryVisible(true)}
      />
    )}
  </SafeArea>
);
};
