import React from "react";
import { Button } from "react-native-paper";

import { MemberInfoCard } from "../../../components/info-card/member-info-card.component";
import { userAsSender } from "../../../utils/common";
import { ProfileDetailsComponent } from "../../../components/profile/detail.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

export const MemberDetailScreen = ({ navigation, route }) => {
  const { member } = route.params || {};

  const name = `${member?.userFname.toUpperCase()} ${member?.userLname.toUpperCase()}`;

  const profileItems = [
    { label: "Name", value: name, iconName: "account" },
    { label: "Email", value: member?.userEmail, iconName: "email" },
    { label: "Role", value: member?.userRole, iconName: "human-male-height" },
    {
      label: "Status",
      value: member?.userStatus,
      iconName: "toggle-switch-outline",
    },
    { label: "Phone", value: member?.userPhone, iconName: "cellphone" },
    { label: "Address", value: member?.userAddress, iconName: "map-marker" },
    { label: "Postcode", value: member?.userPostcode, iconName: "map-marker" },
  ];

  const navigateToTransactionList = (member) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Transaction",
          params: {
            screen: "TransactionList",
            sender: userAsSender(member),
            member,
            type: 1,
          },
        },
      ],
    });
  };
  return (
    <SafeArea>
      <MemberInfoCard
        name={name}
        phone={member?.userPhone}
        role={member?.userRole}
        navigateToUpdate={() =>
          navigation.navigate("MemberUpdate", { member: member })
        }
        itemCount={member?.countSenderReceivers}
        navigateToMemberList={() =>
          navigation.navigate(
            `${
              member?.userRole === "Agent"
                ? "MemberSenderList"
                : "MemberSenderReceiverList"
            }`,
            { sender: userAsSender(member), member, type: 1 }
          )
        }
        navigateToTransactionList={() => navigateToTransactionList(member)}
        transactionCount={member?.transactionCount}
        senderCount={member?.senderCount}
        receiverCount={member?.receiverCount}
      />

      <ProfileDetailsComponent profileItems={profileItems} />

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("MemberUpdate", { member: member })}
        buttonLabel={`Edit ${name}`}
      >{`Edit ${name}`}</Button>
      <Spacer position="bottom" size="large">
        <Button
          mode="outlined"
          onPress={() =>
            navigation.navigate("MemberUpdateStatus", { member: member })
          }
          buttonLabel={`Edit ${name}`}
        >{`Change Status`}</Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.navigate("MemberUpdateRole", { member: member })
          }
          buttonLabel={`Edit ${name}`}
        >{`Change Role`}</Button>
      </Spacer>
    </SafeArea>
  );
};
