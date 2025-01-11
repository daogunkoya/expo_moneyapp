import React, { useContext } from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ReceiversScreen } from "../../features/receivers/screens/receivers.screen";
import { ReceiverDetailScreen } from "../../features/receivers/screens/receiver-detail.screen";
import { ReceiverCreateScreen } from "../../features/receivers/screens/receiver-create.screen";
import { ReceiverUpdateScreen } from "../../features/receivers/screens/receiver-update.screen";

import { MenuScreen } from "../../components/menu/menu.screen";
import { DateTime } from "../../components/datetime/datetime";

import { PaymentReceiverScreen } from "../../features/payments/screens/payment.receiver.screen";
import { PaymentAmountScreen } from "../../features/payments/screens/payment.amount.screen";
import { PaymentSubmitScreen } from "../../features/payments/screens/payment.submit.screen";
import { TransactionsScreen } from "../../features/transactions/screens/transactions.screen";
import { SendSendersScreen } from "../../features/send-money.js/screens/sendmoney-senders.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { ReceiverSummaryScreen } from "../../features/receivers/screens/receiver-summary.screen";
import { IconButton } from "react-native-paper";
import { BankScreen } from "../../features/bank/bank.screen";

const ReceiverStack = createStackNavigator();

export const ReceiversNavigator = () => {
  const { user } = useContext(AuthenticationContext);

  const headerLeft = () => (
    <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
  );

  const fetchTitle = (route) => {
    const { sender = {} } = route.params || {};
    return sender
      ? `${sender?.senderFname?.toUpperCase() ?? ""} ${
          sender?.senderLname?.toUpperCase() ?? ""
        }`
      : "";
  };

  return (
    <ReceiverStack.Navigator>
      <ReceiverStack.Screen
        name="ReceiverList"
        component={ReceiversScreen}
        options={({ navigation, route }) => {
          const title = fetchTitle(route);
          return {
            title: `${title} Receiver List` || title,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <ReceiverStack.Screen
        name="ReceiverDetail"
        component={ReceiverDetailScreen}
        options={({ navigation, route }) => {
          const title = fetchTitle(route);
          return {
            title: `${title} Receiver Details` || title,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <ReceiverStack.Screen
        name="ReceiverCreate"
        component={ReceiverCreateScreen}
        options={({ navigation, route }) => {
          const title = fetchTitle(route);
          return {
            title: `${title} Receiver Create` || title,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <ReceiverStack.Screen
        name="ReceiverUpdate"
        component={ReceiverUpdateScreen}
        options={({ navigation, route }) => {
          const title = fetchTitle(route);
          return {
            title: `${title} Receiver Update` || title,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <ReceiverStack.Screen
        name="ReceiverSummary"
        component={ReceiverSummaryScreen}
        options={({ navigation }) => ({
          title: "Receiver Summary",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <ReceiverStack.Screen
        name="PaymentReceiver"
        component={PaymentReceiverScreen}
      />

      <ReceiverStack.Screen name="Menu" component={MenuScreen} />

      <ReceiverStack.Screen name="DateTimePicker" component={DateTime} />
      <ReceiverStack.Screen
        name="PaymentAmount"
        component={PaymentAmountScreen}
      />
      <ReceiverStack.Screen
        name="PaymentSubmit"
        component={PaymentSubmitScreen}
      />
      <ReceiverStack.Screen
        name="TransactionList"
        component={TransactionsScreen}
      />
      <ReceiverStack.Screen
        name="BankList"
        component={BankScreen}
      />
    </ReceiverStack.Navigator>
  );
};
