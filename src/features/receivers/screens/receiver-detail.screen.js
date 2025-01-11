import React from "react";

import { DetailComponent } from "../../../components/detail.component";
import { InfoCard } from "../../../components/info-card/info-card.component";

export const ReceiverDetailScreen = ({ navigation, route }) => {
  const { receiver, sender } = route.params || {};

  const {
    receiverName = "",
    receiverFname = "",
    receiverLname = "",
    receiverId = "",
    receiverAddress = "",
    receiverPostcode = "",
    receiverMobile = "",
    receiverPhone = "",
    receiverEmail = "",
  } = receiver || {};

  const name = `${receiverFname.toUpperCase()} ${receiverLname.toUpperCase()}`;

  const profileItems = [
    {
      label: "Name",
      value: `${receiverFname?.toUpperCase()} ${receiverLname?.toUpperCase()}`,
      iconName: "account",
    },
    { label: "Email", value: receiverEmail, iconName: "email" },
    { label: "Phone", value: receiverPhone, iconName: "cellphone" },
    { label: "Address", value: receiverAddress, iconName: "map-marker" },
    { label: "Postcode", value: receiverPostcode, iconName: "map-marker" },
  ];

  const navigateToList = () =>
    navigation.navigate("Transaction", {
      screen: "TransactionList",
      params: {
        sender: sender,
        selectedOriginCurrency:
          sender?.userCurrency?.originCurrency?.originCurrency,
        selectedDestinationCurrency:
          sender?.userCurrency?.destinationCurrency?.destinationCurrency,
      },
    });

  const navigateToSendMoney = () =>
    navigation.navigate("Send", {
      screen: "SendMoneyAmountCalculator",
      params: {
        sender: sender,
        selectedOriginCurrency:
          sender?.userCurrency?.originCurrency?.originCurrency,
        selectedDestinationCurrency:
          sender?.userCurrency?.destinationCurrency?.destinationCurrency,
      },
    });

  return (
    <DetailComponent
      receiver={receiver}
      sender={sender}
      profileItems={profileItems}
      name={name}
      phone={receiver?.receiverPhone}
      listIcon={"bank-transfer"}
      navigateToUpdate={() =>
        navigation.navigate("ReceiverUpdate", { sender: sender, receiver })
      }
      navigateToList={navigateToList}
      navigateToSendMoney={navigateToSendMoney}
    >
      <InfoCard
        name={name}
        phone={receiver?.receiverPhone}
        listIcon={"bank-transfer"}
        count="0"
        navigateToUpdate={() => navigation.navigate("ReceiverUpdate", { sender: sender, receiver }) }
        navigateToList={navigateToList}
        navigateToSend={navigateToSendMoney}
      />
      
    </DetailComponent>
  );
};
