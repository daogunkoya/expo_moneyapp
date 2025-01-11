import react, { useContext, useState, useEffect } from "react";
import { View, Text , FlatList, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { Divider } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../../../components/search.component";
import { CustomersContext } from "../../../services/senders/senders.context";
import { ReceiversContext } from "../../../services/receivers/receivers.context";
import { OptionListComponent } from "../../../components/option-list.component";



export const SendMoneySendersScreen= ({ navigation }) => {

  const {customers, retrieveCustomers} = useContext(CustomersContext);
  const {retrieveReceivers} = useContext(ReceiversContext);
  // const [senderList, setSenderList] = useState(customers);

  const onSenderSelect = (sender) => {
    //retrieveReceivers(sender.senderId)
    console.log('sender sent2', sender)
    navigation.navigate('SendMoneyReceivers', {sender: sender})
  }

  const searchSender = (search) => {
    retrieveCustomers(false, {search: search})
  }

  
  return (
    <>
         
            <Search
              onSearch={searchSender}
              placeholder="Search senders" />
      

            <OptionListComponent 
            dataList={customers}
            itemDisplayProps={"senderName"}
            onPressAction={onSenderSelect}
            itemKey={"senderId"}
            />
    </>
  );
};
