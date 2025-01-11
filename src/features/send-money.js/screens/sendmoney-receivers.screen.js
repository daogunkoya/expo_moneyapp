import react, { useContext, useState, useEffect } from "react";
import { View, Text , FlatList, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { Divider, ActivityIndicator,MD2Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../../../components/search.component";
import { CustomersContext } from "../../../services/senders/senders.context";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import { OptionListComponent } from "../../../components/option-list.component";
import { LoadingComponent } from "../../../components/loading.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";




export const SendMoneyReceiversScreen= ({ navigation, route }) => {

  const { user } = useContext(AuthenticationContext);
  
  const { sender = user, otherParam } = route.params || {}
  



  const {retrieveReceivers, receivers, isLoading } = useContext(ReceiversContext);
  // const [senderList, setSenderList] = useState(customers);

  const onReceiverSelect = (receiver) => {
   navigation.navigate('SendMoneyReview', {sender: sender, receiver: receiver})
  }

  const fetchSearchReceivers = (search) => {
    retrieveReceivers(sender.senderId, search)
  }


 

  useEffect(() => {
    const { sender = "", otherParam } = route.params || {}
    console.log('is there sender', sender)
    const  defaultSenderId = user?.userRoleType === "Customer" ? user?.userId : sender?.senderId
    retrieveReceivers(true, {senderId:defaultSenderId}, 1);
  }, [])



  
  return (
    <>
        {isLoading && (
           <LoadingComponent />
          )}
                <Search
                    onSearch={fetchSearchReceivers}
                    placeholder="Search senders" />
        {!isLoading &&
                  <OptionListComponent 
                  dataList={receivers}
                  itemDisplayProps={"receiverName"}
                  onPressAction={onReceiverSelect}
                  itemKey={"receiverId"}
                  />
        }
    </>
  );
};
