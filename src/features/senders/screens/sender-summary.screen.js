import React, { useContext } from "react";
import { Summary } from "../../../components/summary/summary.component";
import { CustomersContext } from "../../../services/senders/senders.context";
import { LoadingComponent } from "../../../components/loading.component";

export const SenderSummaryScreen = ({navigation, route}) => {

    const { onCustomerRegister, onCustomerUpdate, isLoading, error } = useContext(CustomersContext);

    const { senderData, actionType, sender } = route.params;
    console.log('sender data', JSON.stringify(senderData, null, 2), senderData)

    const summaryData = {
        "First Name":senderData?.fname,
        "Last Name":senderData?.lname,
        "Email":senderData?.email,
        "Date Of Birth":senderData?.dateOfBirth,
        "Phone":senderData?.phone,
        "Address":senderData?.address,
        "Postcode":senderData?.postcode
    }

    const updateSenderData =() => {
        return {
            title: senderData.title || sender.senderTitle,
            fname: senderData.fname || sender.senderFname,
            lname: senderData.lname || sender.senderLname,
            mname: senderData.mname || sender.senderMname,
            dateOfBirth: senderData.dateOfBirth || sender.senderDob,
            email: senderData.email || sender.senderEmail,
            phone: senderData.phone || sender.senderPhone,
            address: senderData.address || sender.senderAddress,
            postcode: senderData.postcode || sender.senderPostcode,
            metaData:  senderData.metaData,
          };
    };

    const submitSender = () => {
    const { senderData } = route.params;
    if(actionType === "update"){
          onCustomerUpdate(updateSenderData(), sender.senderId);
    }else{
      onCustomerRegister(senderData);
    }
        
    }
   
    return (
        <>
             <Summary summaryItems={summaryData} submitAction={submitSender} />
            {isLoading && <LoadingComponent />}
        </>
);
}