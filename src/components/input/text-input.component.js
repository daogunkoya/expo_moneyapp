import React, { useState } from 'react';
import styled from "styled-components/native";
import { TextInput as NativeTextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';


export const TextInput = styled(NativeTextInput).attrs({
})`
  width: 100%;
  border-style:solid;
  background-color:transparent;
  border-color:#D3D3D3;
  border-bottom-width:1px;
  margin:auto;
  
`;

export const TextInputComponent = ({
  label,
  value,
  onChange,
  mode = "outlined",
  error,
  onPressIn,
  onChangeText,
  onBlur,
  onError,
  textType = "none",
  textInputMode = "outlined",
  disabled = false,
  autoCapitalize='none'
}) => {

  return (
        <TextInput
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={onError}
          onPressIn={onPressIn}
          onChangeText={onChangeText}
          mode={textInputMode}
          disabled={disabled}
          textContentType={textType}
          secureTextEntry = {textType === "password"? true : false}
          autoCapitalize={autoCapitalize}
        />
  );
};


