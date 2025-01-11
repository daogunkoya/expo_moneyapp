// import React, { useState, useContext, useEffect } from "react";
// import { ReceiverInputComponent } from "../../../components/receiver/receiver-input.component";
// import { SafeArea } from "../../../components/utility/safe-area.component";
// import { ReceiversContext } from "../../../services/receivers/receivers.context";



// export const MemberSenderReceiverUpdateScreen = ({navigation, route}) => {
  

  
//   const { onReceiverUpdate, isLoading, error, showErrorBorder , bankList, retrieveBankList} =
//     useContext(ReceiversContext);
//     const { sender,  receiver} = route.params || {};

//     const senderTitle =`${sender?.senderFname?.toUpperCase()} ${sender?.senderLname?.toUpperCase()}`
    
//     console.log('sender in receiver update2', sender)

//       const submitData = (receiverData) => {
//         const revisedReceiverData = 
//         {
//           ...receiverData, 
//           receiverId:receiver.receiverId,
//           senderId:  sender?.senderId};
           
//          //  console.log('on update', revisedReceiverData)
//         onReceiverUpdate(revisedReceiverData)
//         if(!error){
//           navigation.navigate('MemberSenderReceiverList', {sender,receiver});
//         }
//       }
//   return (
//     <SafeArea>
      
//       <ReceiverInputComponent 
//       // data = {props}
//       headerTitle = {`${senderTitle} Update Receiver`}
//       route = {route}
//       navigation = {navigation}
//       submitReceiverData = {submitData} 
//       error = {error} 
//       isLoading = {isLoading}
//       showErrorBorder = {showErrorBorder} 
//       bankList = {bankList}
//       retrieveBankList = {retrieveBankList}
//       sender = {sender}
//       receiver = {receiver}
//        />
//     </SafeArea>
//   );
// };












import React, { useState, useContext, useEffect } from "react";
import { ReceiverUpdateComponent } from "../../../components/receiver/receiver-update.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";



export const MemberSenderReceiverUpdateScreen = ({navigation, route}) => {

  const { user } = useContext(AuthenticationContext);

  const { sender , receiver} = route.params || {};

  const senderTitle =`${sender?.senderFname?.toUpperCase()} ${sender?.senderLname?.toUpperCase()}`




  return (
    <SafeArea>  
      <ReceiverUpdateComponent
      receiver = {receiver}
      senderTitle = {senderTitle}
       />
    
    </SafeArea>
  );
};












