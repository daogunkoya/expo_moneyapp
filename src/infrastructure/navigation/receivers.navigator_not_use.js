import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ReceiversScreen } from "../../features/receivers/screens/receivers.screen";
import { ReceiverDetailScreen } from "../../features/receivers/screens/receiver-detail.screen";
import { ReceiverCreateScreen } from "../../features/receivers/screens/receiver-create.screen";

const RestaurantStack = createStackNavigator();

export const CustomersNavigator = () => {
  return (
    <RestaurantStack.Navigator
     
    >
      <RestaurantStack.Screen
        name="ReceiverLists"
        component={ReceiversScreen}
        options={{
          headerShown:false,
          headerMode:'none',
        }}
      />
      <RestaurantStack.Screen
        name="ReceiverCreate"
        component={ReceiverCreateScreen}
        options={{
          headerShown:false,
          headerMode:'none',
        }}
      />
      <RestaurantStack.Screen
        name="ReceiverDetail"
        component={ReceiverDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
