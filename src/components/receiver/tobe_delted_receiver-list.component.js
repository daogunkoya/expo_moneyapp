import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


import { FadeInView } from "../animations/fade.animation";
import { SafeArea } from "../utility/safe-area.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

import { LoadingComponent } from "../loading.component";
import { InfoCard } from "../info-card/info-card.component";
import { ReceiverList } from "./receiver-list.styles";
import { Search } from "../search.component";

import { useNavigation } from "@react-navigation/native";



export const ReceiverListComponent = ({
  sender,
  isLoading,
  receivers,
  hasError,
  totalReceiverCount,
  LoadMoreReceiverData,
  retrieveReceivers,
  retrieveBankList,
  searchWord,
  setActiveSenderInUse,
  navigateToList,
  navigateToSendMoney,
  navigateToUpdate
}) => {
  const navigation = useNavigation();
  //console.log("sender as customer=", sender);



  const fetchSearchReceivers = (searchWord) => {
    retrieveReceivers(sender.senderId, searchWord);
  };

  return (
    <SafeArea>
      {/* {isLoading && <LoadingComponent/>}

      {hasError && ( 
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )} */}

      <Search
        customerId={sender.senderId}
        buttonIcon="account-multiple-plus"
        buttonTitle="New"
        onSearch={fetchSearchReceivers}
        navigateToScreen={() =>
          navigation.navigate("ReceiverCreate", { sender: sender })
        }
      />

      {!hasError && (
        // <Text>hi</Text>
        <ReceiverList
          data={receivers}
          renderItem={({ item }) => {
            // console.log(item)
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ReceiverDetail", {
                    receiver: item,
                    sender: sender,
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                  <InfoCard
                     name = {`${item?.receiverFname} ${item?.receiverLname}`}
                     phone = {item?.receiverPhone}
                      count="0"
                      itemCount = {item?.countreceiverReceivers}
                      navigateToUpdate = {() => navigateToUpdate(item)}
                      navigateToReceivers = {() => navigateToList(item) }
                      navigateToSend={() => navigateToSendMoney(item) }
                    />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.receiverId}
          onEndReached={() => LoadMoreReceiverData(searchWord)}
          onEndReachedThreshold={0}
        />
      )}
    </SafeArea>
  );
};
