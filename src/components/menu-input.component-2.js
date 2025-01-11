import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Button, PaperProvider, Divider } from 'react-native-paper';

export const MenuInput = ({ value, onChange, visibleStatus }) => {
  const [visible, setVisible] = useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  const currencies = ['NGN', 'GBP', 'USD'];

  return (
    <PaperProvider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {setVisible(!visible)}} title="Item 1" />
          <Menu.Item onPress={() => {etVisible(!visible)}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default MenuInput;
