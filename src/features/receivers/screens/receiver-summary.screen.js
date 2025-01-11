import React, { useContext } from "react";
import { Summary } from "../../../components/summary/summary.component";
import { CustomersContext } from "../../../services/senders/senders.context";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import { LoadingComponent } from "../../../components/loading.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const ReceiverSummaryScreen = ({ navigation, route }) => {
  const { onReceiverRegister, onReceiverUpdate, isLoading, error } =
    useContext(ReceiversContext);
  const { user } = useContext(AuthenticationContext);

  const { receiverData, actionType, receiver, sender } = route.params;
  console.log(
    "receiver data",
    JSON.stringify(receiverData, null, 2),
    receiverData
  );
  const summaryData = {
    "First Name": receiverData?.fname,
    "Last Name": receiverData?.lname,
    Account: receiverData?.accountNumber,
    Bank: receiverData?.bank?.name,
    Phone: receiverData?.phone,
    Address: receiverData?.address,
    // "Postcode":receiverData?.postcode
  };

  const submitReceiver = () => {
    const { receiverData } = route.params;

    const updatedReceiverData = {
      ...receiverData,
      receiverId: receiver?.receiverId,
      senderId:
        user?.userRoleType === "Customer" ? user?.userId : sender?.senderId,
    };

    if (actionType === "update") {
      onReceiverUpdate(updatedReceiverData, receiver.senderId);
    } else {
      onReceiverRegister(updatedReceiverData);
    }

    if(!error){
        navigation.pop(2)
       
  };
    
  };

  return (
    <>
      <Summary summaryItems={summaryData} submitAction={submitReceiver} />
      {isLoading && <LoadingComponent />}
    </>
  );
};
