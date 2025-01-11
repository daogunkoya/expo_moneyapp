// SearchScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View,  Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CurrencyListComponent } from '../../../components/Currency/currency-list.component';
import { CommonContext } from '../../../services/utilities/common.context';

export const AccountStatementCurrencyListScreen = () => {
  const navigation = useNavigation();
  const { userCurrencies } = useContext(CommonContext);
  const [currencyList, setCurrencyList] = useState([]);
  
 

  useEffect(() => {
    setCurrencyList(userCurrencies);
  }, [userCurrencies]);

  return (
    <View style={styles.container}>
      <CurrencyListComponent
        currencyList={currencyList}
        routeTo={'AccountStatement'}
        currencyType={"Destination"}
        onPressAction={(item) => navigation.navigate('AccountStatement', { currency: item })}
        navigateTo = {(currency) => navigation.navigate('AccountStatement', {
          currency: currency ,
          selectedDestinationCurrency:currency,
         } )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
  
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

// export default AccountStatementSearchScreen;
