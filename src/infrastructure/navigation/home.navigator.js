import React from "react";

import { HomeScreen } from "../../features/home/screens/home.screen";

import { TodaysRateScreen } from "../../features/todays-rate/screens/todays-rate.screen";
import { TodaysRateCreateScreen } from "../../features/todays-rate/screens/todays-rate-create.screen";
import { IconButton } from "react-native-paper";
import { UserProfileScreen } from "../../features/home/screens/home-menu.screen";
import { ProfileDetailsScreen } from "../../features/home/screens/profile-details.screen";
import { ResetPasswordScreen } from "../../features/home/screens/reset-password.screen";
import { AccountStatementScreen } from "../../features/home/screens/account-statement.screen";
import {AccountStatementCurrencyListScreen} from "../../features/home/screens/account-statement-currency-list.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ route, navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerMode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HomeStack.Screen
        options={{
          header: () => null,
        }}
        name="Dashboard"
        component={HomeScreen}
      />
      <HomeStack.Screen name="TodaysRate" component={TodaysRateScreen} />

      <HomeStack.Screen
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
        name="HomeMenu"
        component={UserProfileScreen}
      />

      <HomeStack.Screen
        options={({ navigation }) => ({
          title: "Profile",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
        name="UserProfile"
        component={ProfileDetailsScreen}
      />

      <HomeStack.Screen
        options={({ navigation }) => ({
          title: "Reset Password",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />

      <HomeStack.Screen
        options={({ navigation }) => ({
          title: "Account Statement",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
        name="AccountStatement"
        component={AccountStatementScreen}
      />
      <HomeStack.Screen
        options={({ navigation }) => ({
          title: "Choose  Currency",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
        name="AccountStatementCurrencySearch"
        component={AccountStatementCurrencyListScreen}
      />
    </HomeStack.Navigator>
  );
};
