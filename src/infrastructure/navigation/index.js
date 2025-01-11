import React, { useContext, useState,  useEffect, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

import { setNavigator } from '../../utils/navigationRef';

export const Navigation = () => {
  const { isAuthenticated,facade, bootstrapAsync, authState, isLogin } = useContext(AuthenticationContext);
  const [isSignedIn, setIsSignedIn] = useState(false);




  useEffect(() => {
    async function fetchData() {
      const user_data = await bootstrapAsync();
      // You can use user_data here
    }
  
    fetchData();
  }, []);
  

  
  return (
    <NavigationContainer ref={(navigator) => {
      setNavigator(navigator);
    }}>
     
     {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
     {/* { <AccountNavigator />} */}
     
      {/* { <AppNavigator /> } */}
    </NavigationContainer>
  );
};
