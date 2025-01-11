import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {  TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import {  Platform } from "react-native";

export const DatePickerComponent = ({ updateParentDate, errorStyle, defaultValue, label }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateValue, setDateValue] = useState( defaultValue || "20/05/2021");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    const stringDateOfBirth = currentDate.toLocaleDateString("en-GB");
    setDateValue(stringDateOfBirth);

    updateParentDate(stringDateOfBirth);

    setShow(false);
  };

  const showMode = (currentMode = "date") => {
    setShow(true);
    setMode(currentMode);
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
      <Spacer size="large">
        <DatePickerInput
          label= {label}
          style={errorStyle('senderDob')}
          value={dateValue}
    
          textContentType="name"
          autoCapitalize="none"
          onChangeText={(p) => setDob(p)}
        />
      </Spacer>

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
    </>
  );
};
