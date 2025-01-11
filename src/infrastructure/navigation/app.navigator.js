import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { SendersNavigator } from "./senders.navigator";
import { ReceiversNavigator } from "./receivers.navigator";
import { TransactionsNavigator } from "./transactions.navigator";
import { AdminNavigator } from "./admin.navigator";
import { HomeNavigator } from "./home.navigator";
import { PaymentsNavigator } from "./payments.navigator";
import { SendMoneyNavigator } from "./send-money.navigator";
import { MembersNavigator } from "./members.navigator";

import { CommonContextProvider } from "../../services/utilities/common.context";
import { CustomersContextProvider } from "../../services/senders/senders.context";
import { ReceiversContextProvider } from "../../services/receivers/receivers.context";
import { TodaysRateContextProvider } from "../../services/todays-rate/todays-rate.context";
import { CommissionContextProvider } from "../../services/commissions/commissions.context";
import { RateContextProvider } from "../../services/rates/rates.context";
import { BankContextProvider } from "../../services/banks/banks.context";
import { CurrencyContextProvider } from "../../services/currency/currencies.context";
import { UtilitiesContextProvider } from "../../services/utilities/utilities.context";
import { PaymentsContextProvider } from "../../services/payments/payments.context";
import { TransactionsContextProvider } from "../../services/transactions/transactions.context";
import { SendMoneyContextProvider } from "../../services/sendmoney.context";
import { UsersContextProvider } from "../../services/user/user.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { MembersContextProvider } from "../../services/members/members.context";
import { OutstandingContextProvider } from "../../services/outstanding/outstanding.context";
import { StripeProvider } from '@stripe/stripe-react-native';
import { stripePublicKey } from "../../utils/env";

import { colors } from "../../infrastructure/theme/colors";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Send: "play",
  Transaction: "calculator",
  Customers: "people",
  Beneficiaries: "people",
  Admin: "settings",
  Members: "people-circle"
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarActiveTintColor: colors.brand.primary,
    tabBarInactiveTintColor: colors.brand.muted,
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

const tabOptions = { headerShown: false };

export const AppNavigator = () => {
  const { user } = useContext(AuthenticationContext);
  const screens = [
    <Tab.Screen key="Home" name="Home" options={tabOptions} component={HomeNavigator} />,
    <Tab.Screen key="Transaction" name="Transaction" options={tabOptions} component={TransactionsNavigator} />,
  ];

  if (user?.userRoleType === "Agent" || user?.userRoleType === "Customer") {
    screens.push(<Tab.Screen key="Send" name="Send" options={tabOptions} component={SendMoneyNavigator} />);
  }

  if (user?.userRoleType === "Agent") {
    screens.push(<Tab.Screen key="Customers" name="Customers" options={tabOptions} component={SendersNavigator} />);
  }

  if (user?.userRoleType === "Customer") {
    screens.push(<Tab.Screen key="Beneficiaries" name="Beneficiaries" options={tabOptions} component={ReceiversNavigator} />);
  }

  if (user?.userRoleType === "Admin") {
    screens.push(<Tab.Screen key="Members" name="Members" options={tabOptions} component={MembersNavigator} />);
    screens.push(<Tab.Screen key="Admin" name="Admin" options={tabOptions} component={AdminNavigator} />);
  }

  return (
    <CommonContextProvider>
    <MembersContextProvider>
      <ReceiversContextProvider>
        <UtilitiesContextProvider>
          <PaymentsContextProvider>
            <TransactionsContextProvider>
              <CustomersContextProvider>
                <TodaysRateContextProvider>
                  <CommissionContextProvider>
                  <BankContextProvider>
                  <RateContextProvider>
                  <CurrencyContextProvider>
                  <OutstandingContextProvider>
                    <SendMoneyContextProvider>
                      <UsersContextProvider>
                      <StripeProvider publishableKey={stripePublicKey}>
                            <Tab.Navigator screenOptions={createScreenOptions}>
                              {screens}
                            </Tab.Navigator>
                        </StripeProvider>
                      </UsersContextProvider>
                    </SendMoneyContextProvider>
                  </OutstandingContextProvider>
                  </CurrencyContextProvider>
                  </RateContextProvider>
                  </BankContextProvider>
                  </CommissionContextProvider>
                </TodaysRateContextProvider>
              </CustomersContextProvider>
            </TransactionsContextProvider>
          </PaymentsContextProvider>
        </UtilitiesContextProvider>
      </ReceiversContextProvider>
    </MembersContextProvider>
    </CommonContextProvider>
  );
};
