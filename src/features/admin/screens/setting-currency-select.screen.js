import react, { useContext, useState, useEffect } from "react";
import { View, Text , FlatList, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { Divider } from "react-native-paper";
import { CommonContext } from "../../../services/utilities/common.context";
import { CurrencyListComponent } from "../../../components/Currency/currency-list.component";


                
export const SettingCurrencySelectScreen = ({ navigation, route }) => {


  const {currencies:fetchedCurrencies} = useContext(CommonContext);
  const [currecies, setCurrecies] = useState([]);

  console.log('fetchedCurrencies=',fetchedCurrencies)


  useEffect(() => {
    if(fetchedCurrencies){
     // console.log('currency type',currencyType)
      const filteredCurrencies = fetchedCurrencies.data.filter(currency => currency.currencyType === 'Destination')
      setCurrecies(filteredCurrencies)
    }
  }, [fetchedCurrencies])

  
  return (
    <>
    <CurrencyListComponent
     currencyList={currecies} 
     currencyType="Destination"
     navigateTo = {(currency)=>
      navigation.navigate(route.params?.routeTo, {
          currency: currency ,
          selectedDestinationCurrency:null,
   })}
       />
    </>
  );
};
