// SearchComponent.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CurrencyIconComponent } from './currency-icon.component';

export const CurrencySelectMenuComponent = ({ currencyCode, countryTitle, navigateTo }) => {
 
  return (
    <TouchableOpacity style={styles.container} onPress={navigateTo}>
      {currencyCode ? (
        <View style = {{flexDirection: 'row', alignItems: 'center'}}> 
          <CurrencyIconComponent countryCode={currencyCode} />
          <Text style = {{marginLeft: 10}}>{countryTitle}</Text>
        </View>
      ) : (
        <Text>Select Currency</Text>
      )}
      <AntDesign name="down" size={20} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
});
