import React, { useState, useContext } from "react";
import {Button} from 'react-native-paper';
import { Spacer } from "./spacer/spacer.component";
import { SafeArea } from "./utility/safe-area.component";

import { useNavigation } from "@react-navigation/native";
import { ProfileDetailsComponent } from "./profile/detail.component";

export const DetailComponent = ({
  children,
  navigateToUpdate,
  navigateToList,
  navigateToSendMoney,
  profileItems,
  name,
  phone,
  listIcon,
  itemCount,
}) => {
  const navigation = useNavigation();
  const route = navigation?.state?.route;

  return (
    <SafeArea>
      {children}
      {/* <InfoCard
        name={name}
        phone={phone}
        listIcon={listIcon}
        count="0"
        itemCount={itemCount}
        navigateToUpdate={() => navigateToUpdate()}
        navigateToList={navigateToList}
        navigateToSend={() => navigateToSendMoney()}
      /> */}
      <ProfileDetailsComponent profileItems={profileItems} />

      <Spacer position="bottom" size="large">
        <Button
          mode="outlined"
          onPress={navigateToUpdate}
          navigateOnPress={navigateToUpdate}
          buttonLabel={`Edit ${name}`}
        >{`Edit ${name}`}</Button>
      </Spacer>
    </SafeArea>
  );
};
