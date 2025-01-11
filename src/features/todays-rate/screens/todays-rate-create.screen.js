import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { ScrollView } from "react-native";;
//import { useForm, Controller } from "react-hook-form";
import {
  AccountBackground,
  AccountCover,
  TodaysRateContainer,
  TodaysRateButton,
  TodaysRateInput,
  ErrorContainer,
  Title,
} from "../components/todays-rate-create.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TodaysRateContext } from "../../../services/todays-rate/todays-rate.context";
import { UtilitiesContext } from "../../../services/utilities/utilities.context";




export const TodaysRateCreateScreen = (props) => {

  const {isLoading,users,currencies, error, showErrorBorder, todaysRateAdd} = useContext(TodaysRateContext);
  const { selectedCurrency, selectedUser } = useContext(UtilitiesContext);

   let errorMessage = null
  if(error) errorMessage = error.errorMessage
  
  const {key:activeCurrencyKey, value:activeCurrencyValue} = selectedCurrency
  const {key:activeUserKey, value:activeUserValue} = selectedUser
  const [mainRate, setMainRate ] = useState(null)
  
  const { navigation,route } = props;
  const params = route.params? route.params:{}



//console.log( errors)
  const onSubmit = () => { 
       // console.log('logs=', isFieldInError, getErrorsInField, getErrorMessages)
    todaysRateAdd({currency_id:activeCurrencyKey, user_id:activeUserKey, main_rate:mainRate })
  };
  


  return (
    <AccountBackground>
      <ScrollView>
        <AccountCover />
        <Title>Create Todays Rate</Title>
        <TodaysRateContainer>
     
        
            <TodaysRateInput
              label="Currency"
              style={showErrorBorder(error,'currencyId')}
              value={activeCurrencyValue}
              textContentType="name"
              autoCapitalize="none"
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Currency", redirectTo:'TodaysRateCreate', type:'TodaysRateSelectCurrency',list:currencies})}
            
            />
                    
          <Spacer size="large">
            <TodaysRateInput
              label="Users"
              style={showErrorBorder(error,'userId')}
              value={activeUserValue}
              textContentType="name"
              autoCapitalize="none"
              onPressIn={(p) =>  navigation.navigate("Menu",{title:"Users", redirectTo:'TodaysRateCreate', type:'TodaysRateSelectUser',list:users})}
            />
          </Spacer>

    
              <Spacer size="large">
                <TodaysRateInput
                  label="£ 1 = "
                  style={showErrorBorder(error,'mainRate')}
                  value={mainRate}
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={(p) => {setMainRate(p); } }
                />
              </Spacer>
      
        
          {errorMessage && (
            <ErrorContainer size="large">
              <Text variant="error">{errorMessage}</Text>
            </ErrorContainer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <TodaysRateButton
                icon="email"
                mode="contained"
                onPress={ onSubmit}
              >
                Create new Rate
              </TodaysRateButton>
            ) : (
              <ActivityIndicator animating={true} color={MD2Colors.red800} />
            )}
          </Spacer>
        </TodaysRateContainer>
        <Spacer size="large">
          <TodaysRateButton mode="contained" onPress={() => navigation.goBack()}>
            Back
          </TodaysRateButton>
        </Spacer>
        </ScrollView>
    </AccountBackground>
  );
};
