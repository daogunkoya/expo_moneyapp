import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { ScrollView } from "react-native";;
//import { useForm, Controller } from "react-hook-form";
import {
  AccountBackground,
  AccountCover,
  CommissionContainer,
  CommissionButton,
  CommissionInput,
  ErrorContainer,
  Title,
} from "../components/commissions.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CommissionContext } from "../../../services/commissions/commissions.context";
import { UtilitiesContext } from "../../../services/utilities/utilities.context";




export const CommissionUpdateScreen = (props) => {

  const { navigation,route } = props;
  const params = route.params? route.params:{}
  const commission = params.commission

// const  { currency_id = null,
//   user_id = null, 
//   start_from = 0 ,
//   end_at = 0,
//   updatedValue = 0,
//   agent_quota = 0} = commission

  const {isLoading,users,currencies, error, showErrorBorder, CommissionUpdate} = useContext(CommissionContext);
  const { selectedCurrency, selectedUser } = useContext(UtilitiesContext);

   let errorMessage = null
  if(error) errorMessage = error.errorMessage
  
  

  const {key:activeCurrencyKey, value:activeCurrencyValue} = selectedCurrency
  const {key:activeUserKey, value:activeUserValue} = selectedUser
   const [startFrom, setStartFrom] = useState(commission.startFrom)
   const [endAt, setEndAt] = useState(commission.endAt)
   const [value, setValue] = useState(commission.value)
   const [agentQuota, setAgentQuota] = useState(commission.agentQuota)
  
  
  


//console.log( errors)
  const onSubmit = () => { 
       // console.log('logs=', isFieldInError, getErrorsInField, getErrorMessages)
    CommissionUpdate({ currency_id:activeCurrencyKey,
                    user_id:activeUserKey, 
                    start_from:startFrom ,
                    end_at:endAt,
                    value:value,
                    agent_quota:agentQuota}, commission.commissionId)
  };
  


  return (
    <AccountBackground>
      <ScrollView>
        <AccountCover />
        <Title>Update Commission</Title>
        <CommissionContainer>
            <CommissionInput
              label="Currency"
              style={showErrorBorder(error,'currencyId')}
              value={activeCurrencyValue}
              textContentType="name"
              autoCapitalize="none"
             onPressIn={(p) =>  navigation.navigate("Menu",{title:"Currency", redirectTo:'CommissionCreate', type:'CommissionSelectCurrency',list:currencies})}
            
            />
                    
          <Spacer size="small">
            <CommissionInput
              label="Users"
              style={showErrorBorder(error,'userId')}
              value={activeUserValue}
              textContentType="name"
              autoCapitalize="none"
             onPressIn={(p) =>  navigation.navigate("Menu",{title:"Users", redirectTo:'CommissionCreate', type:'CommissionSelectUser',list:users})}
            />
          </Spacer>

    
          <Spacer size="small">
            <CommissionInput
              label="Amount from £ "
              style={showErrorBorder(error,'startFrom')}
              value={startFrom}
              textContentType="name"
              autoCapitalize="none"
             onChangeText={(p) => {setStartFrom(p); } }
            />
          </Spacer>

          <Spacer size="small">
            <CommissionInput
              label=" Amount to £ "
              style={showErrorBorder(error,'endAt')}
              value={endAt}
              textContentType="name"
              autoCapitalize="none"
             onChangeText={(p) => {setEndAt(p); } }
            />
          </Spacer>

          <Spacer size="small">
            <CommissionInput
              label=" Value  £ "
              style={showErrorBorder(error,'value')}
              value={value}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(p) => {setValue(p); } }
            />
          </Spacer>


          <Spacer size="small">
            <CommissionInput
              label=" Agent Quota % "
              style={showErrorBorder(error,'agentQuota')}
              value={agentQuota}
              textContentType="name"
              autoCapitalize="none"
             onChangeText={(p) => {setAgentQuota(p); } }
            />
          </Spacer>

      
        
          {errorMessage && (
            <ErrorContainer size="large">
              <Text variant="error">{errorMessage}</Text>
            </ErrorContainer>
          )}
          <Spacer size="small">
            {!isLoading ? (
              <CommissionButton
                icon="email"
                mode="contained"
                onPress={ onSubmit}
              >
                Update Commission
              </CommissionButton>
            ) : (
              <ActivityIndicator animating={true} color={MD2Colors.red800} />
            )}
          </Spacer>
        </CommissionContainer>
        <Spacer size="small">
          <CommissionButton mode="contained" onPress={() => navigation.goBack()}>
            Back
          </CommissionButton>
        </Spacer>
        </ScrollView>
    </AccountBackground>
  );
};
