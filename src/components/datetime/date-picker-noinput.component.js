import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {  TextInput, Text } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import {  Platform, TouchableOpacity } from "react-native";
import { colors } from "../../infrastructure/theme/colors";

export const DatePickerNoInputComponent = ({ updateParentDate, defaultDate, setShowPicker }) => {

  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Note: month is 0-indexed
  };


  const [date, setDate] = useState(new Date(parseDateString(defaultDate)));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    const stringDateOfBirth = currentDate.toLocaleDateString("en-GB");

    updateParentDate(stringDateOfBirth);

    setShow(false);
  };


  const DatePickerInput = styled(TextInput).attrs({
    placeholderTextColor: "red",
  })`
    width: 100%;
    border-style: solid;
    background-color: transparent;
    border-color: #D3D3D3;
    border-bottom-width: 1px;
    margin:auto;
  `;

  return (
    <>
       <TouchableOpacity onPress={() => setShowPicker(false)}>
          <Text style = {{color: 'red', fontWeight: 'bold', backgroundColor:colors.brand.muted, textAlign: 'center'}}>Done</Text>
        </TouchableOpacity>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
     
    </>
  );
};
