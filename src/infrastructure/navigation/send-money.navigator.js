import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SendMoneyAmountCalculatorScreen } from "../../features/send-money.js/screens/sendmoney-amount-calculator.screen";
import { IconButton } from "react-native-paper";
import { SendMoneySendersScreen } from "../../features/send-money.js/screens/sendmoney-senders.screen";
import { SendMoneyReceiversScreen } from "../../features/send-money.js/screens/sendmoney-receivers.screen";
import { SendMoneyReviewScreen } from "../../features/send-money.js/screens/sendmoney-review.screen";
import { SendMoneyCurrencyListScreen } from "../../features/send-money.js/screens/sendmoney-currency-list.screen";
import { SendMoneyCompleteSetupScreen } from "../../features/send-money.js/screens/sendmoney-complete-setup.screen";
import { SendMoneyVerifyIdentityScreen } from "../../features/send-money.js/screens/sendmoney-verify-identity.screen";
import { SendMoneyCaptureImagesScreen } from "../../features/send-money.js/screens/sendmoney-capture-image.screen";

const SendMoneyStack = createStackNavigator();

export const SendMoneyNavigator = ({ route, navigation }) => {
  return (
    <SendMoneyStack.Navigator
      screenOptions={{
        headerMode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SendMoneyStack.Screen
        options={({ navigation }) => ({
          title: "Send Money",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
        name="SendMoneyAmountCalculator"
        component={SendMoneyAmountCalculatorScreen}
      />
      <SendMoneyStack.Screen
        name="SendMoneySenders"
        component={SendMoneySendersScreen}
        options={({ navigation }) => ({
          title: "Select Sender",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <SendMoneyStack.Screen
        name="SendMoneyCurrencyList"
        component={SendMoneyCurrencyListScreen}
        options={({ navigation }) => ({
          title: "Select Currency",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <SendMoneyStack.Screen
        name="SendMoneyReceivers"
        component={SendMoneyReceiversScreen}
        options={({ navigation }) => ({
          title: "Select Receiver",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />


<SendMoneyStack.Screen
        name="SendMoneyReview"
        component={SendMoneyReviewScreen}
        options={({ navigation }) => ({
          title: "Review Your Transfer",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

<SendMoneyStack.Screen
        name="CompleteSetup"
        component={SendMoneyCompleteSetupScreen}
        options={({ navigation }) => ({
          title: "Complete Setup",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <SendMoneyStack.Screen
        name="VerifyIdentity"
        component={SendMoneyVerifyIdentityScreen}
        options={({ navigation }) => ({
          title: "Verify Your Identity",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <SendMoneyStack.Screen
        name="CaptureImages"
        component={SendMoneyCaptureImagesScreen}
        options={({ navigation }) => ({
          title: "Capture Images",
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          ),
        })}
      />        
    
    </SendMoneyStack.Navigator>
    
  );
};
