import React, { useContext } from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { SettingMenuScreen } from "../../features/admin/setting-menu.screen";
import { SettingCurrencySelectScreen } from "../../features/admin/screens/setting-currency-select.screen";
import { SettingUserSelectScreen } from "../../features/admin/screens/setting-user-select.screen";


import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { IconButton } from "react-native-paper";
import { RateScreen } from "../../features/admin/screens/rate.screen";
import { BankScreen } from "../../features/bank/bank.screen";
import { RateCreateScreen } from "../../features/admin/screens/rate-create.screen";

import { CommissionScreen } from "../../features/admin/screens/commission.screen";
import { CommissionCreateScreen } from "../../features/admin/screens/commission-create.screen";

import { BankCreateScreen } from "../../features/admin/screens/bank-create.screen";
import { BankUpdateScreen } from "../../features/admin/screens/bank-update.screen";

import { CurrencyScreen } from "../../features/admin/screens/currency.screen";
import { MyStoreScreen } from "../../features/admin/screens/my-store.screen";
import { StoreUpdateScreen } from "../../features/admin/screens/store-update.screen";
import { OutstandingOverviewScreen } from "../../features/admin/screens/outstanding-overview.screen";
import { OutstandingUserPaymentScreen } from "../../features/admin/screens/outstanding-user-payment.screen";
import { OutstandingAddPaymentScreen } from "../../features/admin/screens/outstanding-add-payment.screen";

const AdminStack = createStackNavigator();

export const AdminNavigator = () => {
  const { user } = useContext(AuthenticationContext);

  const headerLeft = () => (
    <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
  );

 
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="SettingMenu"
        component={SettingMenuScreen}
        options={({ navigation, route }) => {
         
          return {
            title: "Settings Menu",
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

<AdminStack.Screen
        name="Rate"
        component={RateScreen}
        options={({ navigation, route }) => {
         
          return {
            title: "Rate",
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

<AdminStack.Screen
        name="RateCreate"
        component={RateCreateScreen}
        options={({ navigation }) => ({
          title: "Set New Rate",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="Commission"
        component={CommissionScreen}
        options={({ navigation, route }) => {
         
          return {
            title: "Commission",
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

<AdminStack.Screen
        name="CommissionCreate"
        component={CommissionCreateScreen}
        options={({ navigation }) => ({
          title: "Set New Commission",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="Bank"
        component={BankScreen}
        options={({ navigation }) => ({
          title: "Bank List",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="BankCreate"
        component={BankCreateScreen}
        options={({ navigation }) => ({
          title: "Add New Bank",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="BankUpdate"
        component={BankUpdateScreen}
        options={({ navigation }) => ({
          title: "Update Bank",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />


<AdminStack.Screen
        name="Currency"
        component={CurrencyScreen}
        options={({ navigation }) => ({
          title: "Currency List",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="MyStore"
        component={MyStoreScreen}
        options={({ navigation }) => ({
          title: "My Store",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="MyStoreUpdate"
        component={StoreUpdateScreen}
        options={({ navigation }) => ({
          title: "My Store Update",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="OutstandingOverview"
        component={OutstandingOverviewScreen}
        options={({ navigation }) => ({
          title: "Outstanding Payment",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
<AdminStack.Screen
        name="UserOutstandingPayment"
        component={OutstandingUserPaymentScreen}
        options={({ navigation }) => ({
          title: "User Outstanding Payment",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="OutstandingAddPayment"
        component={OutstandingAddPaymentScreen}
        options={({ navigation }) => ({
          title: "Make Outstanding Payment",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<AdminStack.Screen
        name="SettingCurrencySelect"
        component={SettingCurrencySelectScreen}
        options={({ navigation, route }) => {
         
          return {
            title: "Rate",
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

<AdminStack.Screen
        name="SettingUserSelect"
        component={SettingUserSelectScreen}
        options={({ navigation, route }) => {
         
          return {
            title: "Member List",
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => navigation.goBack()}
              />
            ),
          };
        }}
      />

      

  

      

    </AdminStack.Navigator>
  );
};
