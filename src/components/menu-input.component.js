import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Button, Divider } from 'react-native-paper';

export const MenuInput = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const currencies = ['NGN', 'GBP', 'USD'];

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{value || 'Select Currency'}</Button>}
      >
        {currencies.map((currency) => (
          <Menu.Item
            key={currency}
            onPress={() => {
              onChange(currency);
              closeMenu();
            }}
            title={currency}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default MenuInput;
