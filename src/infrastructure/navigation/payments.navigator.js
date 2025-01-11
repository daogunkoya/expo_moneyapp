import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator, CardStyleInterpolators, } from "@react-navigation/stack";
import { MenuScreen } from "../../components/menu/menu.screen";

import { PaymentSenderScreen } from "../../features/payments/screens/payment.sender.screen";
import { PaymentReceiverScreen } from "../../features/payments/screens/payment.receiver.screen";
import { PaymentAmountScreen } from "../../features/payments/screens/payment.amount.screen";
import { PaymentSubmitScreen } from "../../features/payments/screens/payment.submit.screen";
import { TransactionsScreen } from "../../features/transactions/screens/transactions.screen";





const PaymentStack = createStackNavigator();

export const PaymentsNavigator = ({ route, navigation }) => {
  return (
    <PaymentStack.Navigator
      
      screenOptions={{
        headerMode:'screen',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <PaymentStack.Screen
        options={{
          header: () => null,
        }}
        name="PaymentSender"
        component={PaymentSenderScreen}
      />
       <PaymentStack.Screen name="Menu" component={MenuScreen} />
      <PaymentStack.Screen name="PaymentReceiver" component={PaymentReceiverScreen} />
      <PaymentStack.Screen name="PaymentAmount" component={PaymentAmountScreen} />
      <PaymentStack.Screen name="PaymentSubmit" component={PaymentSubmitScreen} />
      <PaymentStack.Screen name="TransactionList" component={TransactionsScreen} />
      
    </PaymentStack.Navigator>
  );
};
