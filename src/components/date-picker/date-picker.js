import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';

export const DatePicker = ({onChange, mode, show}) => {
       console.log(onChange)
        return(
            <DateTimePicker
              testID="dateTimePicker"
              value={()=>new Date(1598051730000)}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />)
        
  }
    
     
 