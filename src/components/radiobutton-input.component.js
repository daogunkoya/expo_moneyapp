import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RadioButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const RadioButton = ({ label, value, selectedValue, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(value)} style={styles.radioContainer}>
      <MaterialCommunityIcons
        name={selectedValue === value ? 'radiobox-marked' : 'radiobox-blank'}
        size={24}
        color={props => props.theme.colors.ui.primary}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    marginLeft: 8,
  },
});

export default RadioButton;
