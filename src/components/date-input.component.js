import React, { useState } from 'react';
import styled from "styled-components/native";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput as NativeTextInput } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInputComponent } from './input/text-input.component';

export const TextInput = styled(NativeTextInput).attrs({
  // placeholderTextColor: 'red',
})`
  width: 100%;
  border-style:solid;
  background-color:transparent;
  border-color:#D3D3D3;
  border-bottom-width:1px;
  margin:auto;
  
`;

export const DateInput = ({
  label,
  value,
  onChange,
  error,
  touched,
  textInputMode = "outlined",
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setShowPicker(false);
    onChange(currentDate.toLocaleDateString("en-GB"));
  };

  
  const currentDate = new Date().toLocaleDateString("en-GB");
  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Note: month is 0-indexed
  };

  const [date, setDate] = useState(new Date(parseDateString(currentDate)));

  return (
    <View>
      
        <TextInput
          label={label}
          value={value}
          onChange={onChange}
          editable={false}
          error={touched && error}
          mode={textInputMode}
          style={styles.input}
          onPressIn={() => setShowPicker(true)}
          
        />
   
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          is24Hour={true}
          onChange={handleDateChange}
        />
      )}
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});

export default DateInput;
