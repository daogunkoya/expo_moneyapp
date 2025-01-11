import react, { useContext, useState, useEffect } from "react";
import { View, Text , FlatList, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { Divider } from "react-native-paper";
import { CommonContext } from "../../../services/utilities/common.context";
import { CurrencyListComponent } from "../../../components/Currency/currency-list.component";


const MemberContainer = styled.View`
    flex: 1;
    flex-direction: column;
    `
    const MemberInfoCard = styled.View`
      flex-direction: row;
        margin-top: ${(props) => props.theme.space[2]};
        margin-left: ${(props) => props.theme.space[2]};
        `
        const ListItem = styled.Text`
        padding: ${(props) => props.theme.space[2]};
            font-size: 12px;
            `

            const DividerStyled = styled(Divider)`
                margin-vertical: ${(props) => props.theme.space[2]};
                `;
                
export const SendMoneyCurrencyListScreen= ({ navigation, route }) => {

  const { currencyType } = route.params;

  const {currencies:fetchedCurrencies} = useContext(CommonContext);
  const [currecies, setCurrecies] = useState([]);

  console.log('fetchedCurrencies=',fetchedCurrencies)
 




  useEffect(() => {
    if(fetchedCurrencies){
      console.log('currency type',currencyType)
      const filteredCurrencies = fetchedCurrencies.data.filter(currency => currency.currencyType === currencyType)
      setCurrecies(filteredCurrencies)
    }
  }, [fetchedCurrencies])

  
  return (
    <>
    <CurrencyListComponent 
    currencyList={currecies} 
    currencyType={currencyType}
     routeTo = 'SendMoneyAmountCalculator'
     navigateTo = {(currency)=>
       navigation.navigate('SendMoneyAmountCalculator', {
      selectedOriginCurrency: currencyType === "Origin" ? currency : null,
      selectedDestinationCurrency:
        currencyType === "Destination" ? currency : null,
    })}

      />
    </>
  );
};
