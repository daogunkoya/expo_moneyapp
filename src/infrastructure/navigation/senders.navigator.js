import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { SendersScreen } from "../../features/senders/screens/senders.screen";
import { SenderDetailScreen } from "../../features/senders/screens/sender-detail.screen";
import { SenderCreateScreen } from "../../features/senders/screens/sender-create.screen";
import { SenderUpdateScreen } from "../../features/senders/screens/sender-update.screen";

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
import { IconButton } from "react-native-paper";
import { SenderSummaryScreen } from "../../features/senders/screens/sender-summary.screen";
import { ReceiverSummaryScreen } from "../../features/receivers/screens/receiver-summary.screen";
import { BankScreen } from "../../features/bank/bank.screen";

const SenderStack = createStackNavigator();

export const SendersNavigator = () => {
  const headerLeft = () => (
    <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
  );

  return (
    <SenderStack.Navigator>
      <SenderStack.Screen
        name="CustomerList"
        component={SendersScreen}
        options={({ navigation }) => ({
          title: "Senders",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <SenderStack.Screen
        name="CustomerCreate"
        component={SenderCreateScreen}
        options={({ navigation }) => ({
          title: "Create Sender",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <SenderStack.Screen
        name="CustomerUpdate"
        component={SenderUpdateScreen}
        options={({ navigation }) => ({
          title: "Update Sender",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <SenderStack.Screen
        name="CustomerDetail"
        component={SenderDetailScreen}
        options={({ navigation }) => ({
          title: "Sender Details",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <SenderStack.Screen
        name="SenderSummary"
        component={SenderSummaryScreen}
        options={({ navigation }) => ({
          title: "Sender Summary",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <SenderStack.Screen
        name="ReceiverList"
        component={ReceiversScreen}
        options={({ navigation, route }) => {
          const { sender } = route.params;
          return {
            title: ` ${sender.senderFname.toUpperCase()} ${sender.senderLname.toUpperCase()} Receiver List`,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <SenderStack.Screen
        name="ReceiverDetail"
        component={ReceiverDetailScreen}
        options={{
          headerShown: false,
          headerMode: "none",
        }}
      />

      <SenderStack.Screen
        name="ReceiverCreate"
        component={ReceiverCreateScreen}
        options={({ navigation, route }) => {
          const { sender } = route.params;
          return {
           // title: ` ${sender.senderFname.toUpperCase()} ${sender.senderLname.toUpperCase()} New Receiver`,
            title: `  New Receiver`,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <SenderStack.Screen
        name="ReceiverUpdate"
        component={ReceiverUpdateScreen}
        options={({ navigation, route }) => {
          const { sender } = route.params;
          return {
            title: ` ${sender?.senderFname?.toUpperCase()} ${sender?.senderLname?.toUpperCase()} Receiver Update`,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      <SenderStack.Screen
        name="ReceiverSummary"
        component={ReceiverSummaryScreen}
        options={({ navigation }) => ({
          title: "Receiver Summary",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <SenderStack.Screen
        name="PaymentReceiver"
        component={PaymentReceiverScreen}
      />

      <SenderStack.Screen name="Menu" component={MenuScreen} />

      <SenderStack.Screen name="DateTimePicker" component={DateTime} />
      <SenderStack.Screen
        name="PaymentAmount"
        component={PaymentAmountScreen}
      />
      <SenderStack.Screen
        name="PaymentSubmit"
        component={PaymentSubmitScreen}
      />
      <SenderStack.Screen
        name="TransactionList"
        component={TransactionsScreen}
      />

    <SenderStack.Screen
        name="BankList"
        component={BankScreen}
        options={({ navigation }) => ({
          title: "Bank List",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </SenderStack.Navigator>
  );
};
