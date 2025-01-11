import React from "react";
import LottieView from "lottie-react-native";
import { NavigationButtonComponent } from "../../../components/button/navigation-button.component";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/watermelon.json")}
        />
      </AnimationWrapper>
      <Title>MoneyApp</Title>
      <>
        <NavigationButtonComponent
          firstTitle="Login"
          secondTitle="Register"
          firstAction={() => navigation.navigate("Login")}
          secondAction={() => navigation.navigate("Register")}
          firstIcon={"lock-open-outline"}
          secondIcon={"email"}
        />
      </>
    </AccountBackground>
  );
};
