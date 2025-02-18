import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';

export const DateTime = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateOfBirth, setDateOfBirth] = useState('20/05/2021');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const stringDateOfBirth = currentDate.toLocaleDateString('en-GB')
    setDateOfBirth(stringDateOfBirth )

    console.log(stringDateOfBirth)
    setShow(false)

  };

  const showMode = (currentMode ='date') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      <View>
  <TextInput
    value = {dateOfBirth}
    onPressIn={ ()=>showMode('date')}
  />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};