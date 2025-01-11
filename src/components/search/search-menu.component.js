// SearchComponent.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';

export const SearchMenuComponent = ({ children, onSearchClick, searchPlaceholder, iconName = '' }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onSearchClick}>
        {children}
        {iconName ? <IconButton
                    icon={iconName}
                    iconColor={MD3Colors.error50}
                    size={20}
                    // mode='outlined'
                    onPress={() => console.log('Pressed')}
                    /> 
                    : null}

          <Text>{searchPlaceholder}</Text>
      <AntDesign name="down" size={20} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    padding: 13,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
});
