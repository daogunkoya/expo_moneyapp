import React from "react";

import { SenderDetailComponent } from "../../../components/sender/sender-detail.component";


export const SenderDetailScreen = ({ navigation, route }) => {
  const { sender: sender } = route.params || {};


  return (
    <SenderDetailComponent
      sender={sender}
      navigateToUpdate={() =>navigation.navigate("CustomerUpdate", { sender: sender })}
        navigateToList={() =>navigation.navigate("ReceiverList", { sender: sender, type: 1 })}
        navigateToSend={() =>
          navigation.navigate("Send", {
            screen: "SendMoneyAmountCalculator",
            params: {
              sender: sender,
              selectedOriginCurrency:
                sender?.userCurrency?.originCurrency?.originCurrency,
              selectedDestinationCurrency:
                sender?.userCurrency?.destinationCurrency
                  ?.destinationCurrency,
            },
          })
        }
    />
    
  );
};
