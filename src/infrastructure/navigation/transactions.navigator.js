import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { TransactionsScreen } from "../../features/transactions/screens/transactions.screen";
import { TransactionDetailScreen } from "../../features/transactions/screens/transaction-detail.screen";
import { TransactionUpdateScreen } from "../../features/transactions/screens/transaction-update.screen";
import { TransactionReportScreen } from "../../features/transactions/screens/transaction-report.screen";
import {TransactionUpdateStatusScreen} from "../../features/transactions/screens/transaction-update-status.screen";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

export const TransactionsNavigator = () => (
  <Stack.Navigator>
      <Stack.Screen
      name="TransactionList"
      component={TransactionsScreen}
      options={({ navigation, route }) => ({
        title: route?.params?.member?.userName
          ? `${route.params.member.userName} Transaction History`
          : 'Transaction History',
        headerLeft: () => (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        ),
      })}
    />


    <Stack.Screen
      name="TransactionDetail"
      component={TransactionDetailScreen}
      options={({ navigation }) => ({
        title: "Transaction Details",
        headerLeft: () => (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        ),
      })}
    />

<Stack.Screen
      name="TransactionUpdateStatus"
      component={TransactionUpdateStatusScreen}
      options={({ navigation }) => ({
        title: "Transaction Update Status",
        headerLeft: () => (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        ),
      })}
    />

<Stack.Screen
      name="TransactionReport"
      component={TransactionReportScreen}
      options={({ navigation }) => ({
        title: "Transaction Report",
        headerLeft: () => (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        ),
      })}
    />

    <Stack.Screen
      name="TransactionUpdate"
      component={TransactionUpdateScreen}
    />
  </Stack.Navigator>
);
