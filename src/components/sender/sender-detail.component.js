import React from "react";

import { DetailComponent } from "../detail.component";
import { InfoCard } from "../info-card/info-card.component";

export const SenderDetailComponent = ({ navigateToUpdate, navigateToList, navigateToSend, sender,  isAdmin = false }) => {


  const profileItems = [
    { label: "Name", value: sender?.senderFname, iconName: "account" },
    { label: "Email", value: sender?.senderEmail, iconName: "email" },
    { label: "Phone", value: sender?.senderPhone, iconName: "cellphone" },
    { label: "Address", value: sender?.senderAddress, iconName: "map-marker" },
    { label: "Postcode", value: sender?.senderPostcode, iconName: "map-marker" },
  ];

  return (
    <DetailComponent
      profileItems={profileItems}
      name={sender?.senderName}
      navigateToUpdate={navigateToUpdate}
    >
      <InfoCard
        name={sender?.senderName}
        phone={sender?.senderPhone}
        count="0"
        itemCount={sender?.countSenderReceivers}
        navigateToUpdate={navigateToUpdate}
        navigateToList={navigateToList}
        navigateToSend={navigateToSend} 
        isAdmin={isAdmin}
      />
    </DetailComponent>
  );
};
