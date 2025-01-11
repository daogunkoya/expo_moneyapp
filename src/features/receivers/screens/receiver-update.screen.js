import React, { useState, useContext, useEffect } from "react";
import { ReceiverUpdateComponent } from "../../../components/receiver/receiver-update.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";



export const ReceiverUpdateScreen = ({navigation, route}) => {

  const { user } = useContext(AuthenticationContext);

  const { sender = user, receiver} = route.params || {};

  console.log("receiver", JSON.stringify(receiver, null, 2));

  const senderTitle =user?.userRoleType === "Agent" ?
  `${sender?.senderFname?.toUpperCase()} ${sender?.senderLname?.toUpperCase()}`
  : ""




  return (
    <SafeArea>  
      <ReceiverUpdateComponent
      receiver = {receiver}
      senderTitle = {senderTitle}
       />
    
    </SafeArea>
  );
};












