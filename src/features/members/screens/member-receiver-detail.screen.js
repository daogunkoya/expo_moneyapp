import React from "react";

import { DetailComponent } from "../../../components/detail.component";
import { InfoCard } from "../../../components/info-card/info-card.component";

export const MemberReceiverDetailScreen = ({ navigation, route }) => {
  const { receiver, sender } = route.params || {};



  const name = `${receiver?.receiverFname.toUpperCase()} ${receiver?.receiverLname.toUpperCase()}`;

  const profileItems = [
    {
      label: "Name",
      value: `${receiver?.receiverFname?.toUpperCase()} ${receiver?.receiverLname?.toUpperCase()}`,
      iconName: "account",
    },
    { label: "Email", value: receiver?.receiverEmail, iconName: "email" },
    { label: "Phone", value: receiver?.receiverPhone, iconName: "cellphone" },
    { label: "Address", value: receiver?.receiverAddress, iconName: "map-marker" },
    { label: "Postcode", value: receiver?.receiverPostcode, iconName: "map-marker" },
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
      navigateToSendMoney={null}
    >
      <InfoCard
        name={name}
        phone={receiver?.receiverPhone}
        listIcon={"bank-transfer"}
        count="0"
        navigateToUpdate={() => navigation.navigate("MemberReceiverUpdate", { sender: sender, receiver }) }
        navigateToList={navigateToList}
        navigateToSend={null}
        isAdmin = {true}
      />
      
    </DetailComponent>
  );
};
